import {
  get_SearchCondition,
  post_CreateCondition,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const conditionRouter = createTRPCRouter({
  submitCondition: protectedCanvasProcedure
    .input(post_CreateCondition.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /Condition
      const conditionData = await api.post("/Condition", {
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        conditionData,
        post_CreateCondition.response,
      );

      return validatedData;
    }),
  searchConditions: protectedCanvasProcedure
    .input(get_SearchCondition.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Condition
      const medicationData = await api.get("/Condition", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        medicationData,
        get_SearchCondition.response,
      );

      return validatedData;
    }),
});
