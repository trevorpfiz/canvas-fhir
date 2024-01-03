import { post_CreateCoverage } from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const coverageRouter = createTRPCRouter({
  submitCoverage: protectedCanvasProcedure
    .input(post_CreateCoverage.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query, body } = input;

      // create /Coverage
      const coverageData = await api.post("/Coverage", {
        query,
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        coverageData,
        post_CreateCoverage.response,
      );

      return validatedData;
    }),
});
