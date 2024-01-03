import { z } from "zod";

import { get_ReadObservation } from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const observationRouter = createTRPCRouter({
  getObservation: protectedCanvasProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { id } = input;

      // get /Observation/{id}
      const observationData = await api.get("/Observation/{observation_id}", {
        path: { observation_id: id },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        observationData,
        get_ReadObservation.response,
      );

      return validatedData;
    }),
});
