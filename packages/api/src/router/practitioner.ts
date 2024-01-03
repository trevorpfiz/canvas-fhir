import {
  get_ReadPractitioner,
  get_SearchPractitioner,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const practitionerRouter = createTRPCRouter({
  searchPractitioners: protectedCanvasProcedure
    .input(get_SearchPractitioner.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Practitioner
      const practitionerData = await api.get("/Practitioner", {
        query: query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        practitionerData,
        get_SearchPractitioner.response,
      );

      return validatedData;
    }),
  getPractitioner: protectedCanvasProcedure
    .input(get_ReadPractitioner.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path } = input;

      // get /Practitioner{id}
      const practitionerData = await api.get(
        "/Practitioner/{practitioner_a_id}",
        {
          path: {
            practitioner_a_id: path.practitioner_a_id,
          },
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        practitionerData,
        get_ReadPractitioner.response,
      );

      return validatedData;
    }),
});
