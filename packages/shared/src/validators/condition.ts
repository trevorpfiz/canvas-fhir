import { z } from "zod";

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});
export type ConditionCoding = z.infer<typeof codingSchema>;

const statusSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const categorySchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const codeSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const referenceSchema = z.object({
  reference: z.string(),
});

const noteSchema = z.object({
  text: z.string(),
});

const conditionResourceSchema = z.object({
  resourceType: z.literal("Condition"),
  id: z.string(),
  clinicalStatus: statusSchema.optional(),
  verificationStatus: statusSchema.optional(),
  category: z.array(categorySchema).optional(),
  code: codeSchema.optional(),
  subject: referenceSchema.optional(),
  encounter: referenceSchema.optional(),
  onsetDateTime: z.string().optional(),
  abatementDateTime: z.string().optional(),
  recordedDate: z.string().optional(),
  recorder: referenceSchema.optional(),
  note: z.array(noteSchema).optional(),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const conditionBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: conditionResourceSchema,
      }),
    )
    .optional(),
});

export const readConditionResponseSchema = conditionResourceSchema;

export const searchConditionResponseSchema = conditionBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
