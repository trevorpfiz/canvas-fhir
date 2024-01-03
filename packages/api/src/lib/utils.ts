import { TRPCError } from "@trpc/server";
import type { z } from "zod";

import { operationOutcomeSchema } from "@acme/shared/src/validators/operation-outcome";

/**
 * Checks if the response data is an OperationOutcome and throws an error if it is.
 * @param data - The data to check.
 * @param schema - The zod schema to validate the data against.
 * @returns - The validated data if not an OperationOutcome, with the correct TypeScript type.
 * @throws {TRPCError} - Throws an error if the data is an OperationOutcome or validation fails.
 */
function handleFhirApiResponse<Z extends z.ZodTypeAny>(
  data: unknown,
  schema: Z,
): z.infer<Z> {
  // Check if the response data is an OperationOutcome
  const operationOutcomeResult = operationOutcomeSchema.safeParse(data);
  if (operationOutcomeResult.success) {
    const issues = operationOutcomeResult.data.issue
      .map(
        (issue) => `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
      )
      .join("; ");
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: `FHIR OperationOutcome Error: ${issues}`,
    });
  }

  // If not an OperationOutcome, validate the data against the provided schema
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occurred while processing the request",
    });
  }

  // Return the validated data with the correct type
  return result.data as z.infer<Z>;
}

export { handleFhirApiResponse };
