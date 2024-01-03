import { z } from "zod";

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const vaccineCodeSchema = z.object({
  coding: z.array(codingSchema),
});

const patientSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

// TODO - optional fields
const immunizationResourceSchema = z.object({
  resourceType: z.literal("Immunization"),
  id: z.string(),
  status: z.string(),
  vaccineCode: vaccineCodeSchema,
  patient: patientSchema,
  occurrenceDateTime: z.string(),
  primarySource: z.boolean(),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const immunizationsBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: immunizationResourceSchema,
      }),
    )
    .optional(),
});

export const readImmunizationResponseSchema = immunizationResourceSchema;

export const searchImmunizationResponseSchema = immunizationsBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
