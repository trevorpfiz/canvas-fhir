import { z } from "zod";

import {
  get_ReadQuestionnaire,
  get_ReadQuestionnaireresponse,
  get_SearchQuestionnaire,
  post_CreateQuestionnaireresponse,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const questionnaireRouter = createTRPCRouter({
  // Questionnaire
  getQuestionnaire: protectedCanvasProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { id } = input;

      // get /Questionnaire{id}
      const questionnaireData = await api.get(
        "/Questionnaire/{questionnaire_id}",
        {
          path: { questionnaire_id: id },
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        questionnaireData,
        get_ReadQuestionnaire.response,
      );

      return validatedData;
    }),
  searchQuestionnaires: protectedCanvasProcedure
    .input(get_SearchQuestionnaire.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Questionnaire
      const questionnaireData = await api.get("/Questionnaire", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        questionnaireData,
        get_SearchQuestionnaire.response,
      );

      return validatedData;
    }),

  // QuestionnaireResponse
  getQuestionnaireResponse: protectedCanvasProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { id } = input;

      // get /QuestionnaireResponse{id}
      const questionnaireResponseData = await api.get(
        "/QuestionnaireResponse/{questionnaire_response_id}",
        {
          path: { questionnaire_response_id: id },
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        questionnaireResponseData,
        get_ReadQuestionnaireresponse.response,
      );

      return validatedData;
    }),
  submitQuestionnaireResponse: protectedCanvasProcedure
    .input(post_CreateQuestionnaireresponse.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /QuestionnaireResponse
      const questionnaireResponseData = await api.post(
        "/QuestionnaireResponse",
        {
          body,
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        questionnaireResponseData,
        post_CreateQuestionnaireresponse.response,
      );

      return validatedData;
    }),
});
