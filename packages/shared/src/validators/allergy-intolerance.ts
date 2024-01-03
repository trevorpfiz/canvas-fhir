import { z } from "zod";

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const clinicalStatusSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const verificationStatusSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const codeSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const reactionManifestationSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string().optional(),
});

const reactionSchema = z.object({
  manifestation: z.array(reactionManifestationSchema),
  severity: z.string(),
});

const allergyIntoleranceResourceSchema = z.object({
  resourceType: z.literal("AllergyIntolerance"),
  id: z.string(),
  clinicalStatus: clinicalStatusSchema,
  verificationStatus: verificationStatusSchema,
  type: z.string(),
  code: codeSchema,
  patient: z.object({
    reference: z.string(),
  }),
  encounter: z
    .object({
      reference: z.string(),
    })
    .optional(),
  onsetDateTime: z.string().optional(),
  recorder: z
    .object({
      reference: z.string(),
    })
    .optional(),
  lastOccurrence: z.string().optional(),
  note: z
    .array(
      z.object({
        text: z.string(),
      }),
    )
    .optional(),
  reaction: z.array(reactionSchema).optional(),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const allergyIntoleranceBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: allergyIntoleranceResourceSchema,
      }),
    )
    .optional(),
});

export const readAllergyIntoleranceResponseSchema =
  allergyIntoleranceResourceSchema;

export const searchAllergyIntoleranceResponseSchema =
  allergyIntoleranceBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
