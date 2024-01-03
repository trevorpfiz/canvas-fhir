import { z } from "zod";

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const textSchema = z.object({
  status: z.string(),
  div: z.string(),
});

const codeSchema = z.object({
  coding: z.array(codingSchema),
  text: z.string(),
});

const medicationResourceSchema = z.object({
  resourceType: z.literal("Medication"),
  id: z.string(),
  text: textSchema,
  code: codeSchema,
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const medicationBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: medicationResourceSchema,
      }),
    )
    .optional(),
});

export const readMedicationResponseSchema = medicationResourceSchema;

export const searchMedicationResponseSchema = medicationBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
