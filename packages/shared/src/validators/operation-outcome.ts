import { z } from "zod";

const operationOutcomeIssueSchema = z.object({
  severity: z.string(),
  code: z.string(),
  details: z.object({
    text: z.string(),
  }),
});
export type OperationOutcomeIssue = z.infer<typeof operationOutcomeIssueSchema>;

export const operationOutcomeSchema = z.object({
  resourceType: z.literal("OperationOutcome"),
  issue: z.array(operationOutcomeIssueSchema),
});
export type OperationOutcome = z.infer<typeof operationOutcomeSchema>;

export const postOrPutResponseSchema = z.union([
  z.null(),
  operationOutcomeSchema,
]);
// Usage: postOrPutResponseSchema.parse(response)

export function createUnionSchemaWithOperationOutcome<T extends z.ZodTypeAny>(
  schema: T,
) {
  return z.union([schema, operationOutcomeSchema]);
}
// Usage: createUnionSchemaWithOperationOutcome(schema)
