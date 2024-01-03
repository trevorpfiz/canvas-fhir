import { z } from "zod";

import { get_ReadConsent, post_CreateConsent } from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const consentRouter = createTRPCRouter({
  getConsent: protectedCanvasProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { id } = input;

      // get /Consent/{id}
      const consentData = await api.get("/Consent/{consent_id}", {
        path: { consent_id: id },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        consentData,
        get_ReadConsent.response,
      );

      return validatedData;
    }),
  submitConsent: protectedCanvasProcedure
    .input(post_CreateConsent.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /Consent
      const consentData = await api.post("/Consent", {
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        consentData,
        post_CreateConsent.response,
      );

      return validatedData;
    }),
});
