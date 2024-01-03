import {
  get_ReadCareteam,
  get_SearchCareteam,
  put_UpdateCareteam,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const careTeamRouter = createTRPCRouter({
  getCareTeam: protectedCanvasProcedure
    .input(get_ReadCareteam.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path } = input;

      // get /CareTeam/{id}
      const careTeamData = await api.get("/CareTeam/{care_team_id}", {
        path: { care_team_id: path.care_team_id },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        careTeamData,
        get_ReadCareteam.response,
      );

      return validatedData;
    }),
  searchCareTeam: protectedCanvasProcedure
    .input(get_SearchCareteam.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // get /CareTeam
      const careTeamData = await api.get("/CareTeam", {
        query: query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        careTeamData,
        get_SearchCareteam.response,
      );

      return validatedData;
    }),
  updateCareTeam: protectedCanvasProcedure
    .input(put_UpdateCareteam.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path, body } = input;

      // get /CareTeam
      const careTeamData = await api.put("/CareTeam/{care_team_id}", {
        path: { care_team_id: path.care_team_id },
        body: body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        careTeamData,
        put_UpdateCareteam.response,
      );

      return validatedData;
    }),
});
