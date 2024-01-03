import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const achievementStatusSchema = z.object({
  coding: z.array(codingSchema),
});

const prioritySchema = z.object({
  coding: z.array(codingSchema),
});

const descriptionSchema = z.object({
  text: z.string(),
});

const referenceSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const noteSchema = z.object({
  id: z.string().optional(),
  authorReference: referenceSchema.optional(),
  time: z.string().optional(),
  text: z.string().optional(),
});

export const goalResourceSchema = z.object({
  resourceType: z.literal("Goal"),
  id: z.string(),
  lifecycleStatus: z.string(),
  achievementStatus: achievementStatusSchema,
  priority: prioritySchema.optional(),
  description: descriptionSchema,
  subject: referenceSchema,
  startDate: z.string(),
  expressedBy: referenceSchema.optional(),
  note: z.array(noteSchema).optional(),
});

const entrySchema = z.object({
  resource: goalResourceSchema,
});

export const goalBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readGoalResponseSchema = goalResourceSchema;

export const searchGoalResponseSchema = goalBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
