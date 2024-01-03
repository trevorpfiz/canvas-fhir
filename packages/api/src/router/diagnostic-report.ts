import { z } from "zod";

import { get_ReadDiagnosticreport } from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const diagnosticReportRouter = createTRPCRouter({
  getDiagnosticReport: protectedCanvasProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { id } = input;

      // get /DiagnosticReport/{id}
      const diagnosticreportData = await api.get(
        "/DiagnosticReport/{diagnostic_report_id}",
        {
          path: { diagnostic_report_id: id },
        },
      );

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        diagnosticreportData,
        get_ReadDiagnosticreport.response,
      );

      return validatedData;
    }),
});
