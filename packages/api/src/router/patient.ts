import { TRPCError } from "@trpc/server";

import {
  get_ReadPatient,
  get_SearchPatient,
  post_CreatePatient,
} from "../canvas/canvas-client";
import { env } from "../env.mjs";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const patientRouter = createTRPCRouter({
  searchPatients: protectedCanvasProcedure
    .input(get_SearchPatient.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Patient
      const patientsData = await api.get("/Patient", { query });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        patientsData,
        get_SearchPatient.response,
      );

      return validatedData;
    }),
  getPatient: protectedCanvasProcedure
    .input(get_ReadPatient.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path } = input;

      // get /Patient{id}
      const patientData = await api.get("/Patient/{patient_id}", {
        path: { patient_id: path.patient_id },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        patientData,
        get_ReadPatient.response,
      );

      return validatedData;
    }),
  createPatient: protectedCanvasProcedure
    .input(post_CreatePatient.parameters)
    .mutation(async ({ ctx, input }) => {
      const { canvasToken } = ctx;
      const { body } = input;

      // using fetch directly because it is the only procedure that needs to return a Location header. otherwise will refactor canvas-api.ts to return responseBody, headers, status, and ok.

      // Setup headers for the fetch call
      const headers = {
        Authorization: `Bearer ${canvasToken}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      // create /Patient using fetch directly
      const response = await fetch(`${env.FUMAGE_BASE_URL}/Patient`, {
        method: "post",
        headers,
        body: JSON.stringify(body),
      });

      // Check if the response status is 201 (Created)
      if (response.status !== 201) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Unexpected response status: ${response.status}`,
        });
      }

      // Extract the Location header
      const locationHeader = response.headers.get("Location");

      // Check if Location header is present
      if (!locationHeader) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Location header missing in response",
        });
      }

      // Extract the patient ID from the Location header
      let patientId = null;
      const urlParts = locationHeader.split("/Patient/");
      // Check that the second part exists
      if (urlParts.length > 1 && urlParts[1]) {
        const patientIdWithHistory = urlParts[1].split("/_history/");
        // Check that the patient ID part exists
        if (patientIdWithHistory.length > 1 && patientIdWithHistory[0]) {
          patientId = patientIdWithHistory[0];
        }
      }

      // Validate if patientId was extracted
      if (!patientId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Patient ID could not be extracted from the Location header",
        });
      }

      // Validate response body
      const validatedData = post_CreatePatient.response.parse(
        await response.json(),
      );

      // Check if response is OperationOutcome
      if (validatedData?.resourceType === "OperationOutcome") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${validatedData.issue
            .map(
              (issue) =>
                `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
            )
            .join("; ")}`,
        });
      }

      // Return the patient ID
      return patientId;
    }),
});
