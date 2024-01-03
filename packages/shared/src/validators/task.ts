import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const extensionSchema = z.object({
  url: z.string(),
  valueReference: z
    .object({
      reference: z.string(),
      type: z.string(),
      display: z.string(),
    })
    .optional(),
  valueString: z.string().optional(),
});

const referenceSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const periodSchema = z.object({
  end: z.string().optional(),
});

const restrictionSchema = z.object({
  period: periodSchema.optional(),
});

const noteSchema = z.object({
  authorReference: referenceSchema.optional(),
  time: z.string().optional(),
  text: z.string().optional(),
});

const inputSchema = z.object({
  type: z.object({
    text: z.string(),
  }),
  valueString: z.string(),
});

export const taskResourceSchema = z.object({
  resourceType: z.literal("Task"),
  id: z.string(),
  extension: z.array(extensionSchema).optional(),
  status: z.string(),
  description: z.string().optional(),
  for: referenceSchema.optional(),
  authoredOn: z.string().optional(),
  requester: referenceSchema.optional(),
  owner: referenceSchema.optional(),
  intent: z.string(),
  restriction: restrictionSchema.optional(),
  note: z.array(noteSchema).optional(),
  input: z.array(inputSchema).optional(),
});

const entrySchema = z.object({
  resource: taskResourceSchema,
});

export const taskBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readTaskResponseSchema = taskResourceSchema;

export const searchTaskResponseSchema = taskBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
