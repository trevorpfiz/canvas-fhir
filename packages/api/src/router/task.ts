import {
  get_SearchTask,
  post_CreateTask,
  put_UpdateTask,
} from "../canvas/canvas-client";
import { handleFhirApiResponse } from "../lib/utils";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const taskRouter = createTRPCRouter({
  create: protectedCanvasProcedure
    .input(post_CreateTask.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /Task
      const taskData = await api.post("/Task", {
        body: {
          status: body.status,
          description: body.description,
          requester: body.requester,
          intent: body.intent,
          for: body.for,
          authoredOn: body.authoredOn,
          owner: { reference: "Practitioner/e766816672f34a5b866771c773e38f3c" },
          restriction: body.restriction,
          note: [
            {
              text: "Coverage 1999 National Health Interview Survey (NHIS)",
              time: "2023-12-29T14:00:00.000Z",
              authorReference: {
                reference: "Practitioner/e766816672f34a5b866771c773e38f3c",
              },
            },
          ],
          input: [
            {
              type: { text: "label" },
              valueString: "Urgent",
            },
          ],
        },
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        taskData,
        post_CreateTask.response,
      );

      return validatedData;
    }),
  search: protectedCanvasProcedure
    .input(get_SearchTask.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Task
      const taskData = await api.get("/Task", {
        query,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        taskData,
        get_SearchTask.response,
      );

      return validatedData;
    }),
  update: protectedCanvasProcedure
    .input(put_UpdateTask.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body, path } = input;

      // update /Task
      const taskData = await api.put("/Task/{task_id}", {
        path,
        body,
      });

      // Validate response and check for OperationOutcome
      const validatedData = handleFhirApiResponse(
        taskData,
        put_UpdateTask.response,
      );

      return validatedData;
    }),
});
