import { z } from "zod";

const textSchema = z.object({
  status: z.string(),
  div: z.string(),
});

const actorSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const scheduleResourceSchema = z.object({
  resourceType: z.literal("Schedule"),
  id: z.string(),
  text: textSchema,
  actor: z.array(actorSchema),
  comment: z.string(),
});

const entrySchema = z.object({
  resource: scheduleResourceSchema,
});

export const scheduleBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  entry: z.array(entrySchema).optional(),
});

export const readScheduleResponseSchema = scheduleResourceSchema;

export const searchScheduleResponseSchema = scheduleBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
