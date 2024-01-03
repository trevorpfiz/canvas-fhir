import {
  get_SearchAllergen,
  post_CreateAllergyintolerance,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const allergyIntoleranceRouter = createTRPCRouter({
  submitAllergyIntolerance: protectedCanvasProcedure
    .input(post_CreateAllergyintolerance.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /AllergyIntolerance
      const allergyIntoleranceData = await api.post("/AllergyIntolerance", {
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        allergyIntoleranceData,
        post_CreateAllergyintolerance.response,
      );

      return validatedData;
    }),
  searchAllergens: protectedCanvasProcedure
    .input(get_SearchAllergen.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Allergen
      const allergenData = await api.get("/Allergen", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        allergenData,
        get_SearchAllergen.response,
      );

      return validatedData;
    }),
});
