import {
  get_ReadDocumentreference,
  get_SearchDocumentreference,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const documentRouter = createTRPCRouter({
  getDocument: protectedCanvasProcedure
    .input(get_ReadDocumentreference.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;

      // get /DocumentReference/{id}
      const documentReferenceData = await api.get(
        "/DocumentReference/{document_reference_id}",
        {
          path: {
            document_reference_id: input.path.document_reference_id,
          },
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        documentReferenceData,
        get_ReadDocumentreference.response,
      );

      return validatedData;
    }),
  searchBillDocument: protectedCanvasProcedure
    .input(get_SearchDocumentreference.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;

      // search /DocumentReference

      // @link: https://postman.com/canvasmedical/workspace/canvas-medical-public-documentation/request/17030070-e85e9dc7-3dd7-4a4f-a648-f21d291c4b59
      const documentsData = await api.get("/DocumentReference", {
        query: {
          status: "current",
          type: "http://loinc.org|94093-2",
          subject: input.query.subject,
          category: "invoicefull",
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        documentsData,
        get_SearchDocumentreference.response,
      );

      return validatedData;
    }),
});
