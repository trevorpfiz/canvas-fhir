import { z } from "zod";

const referenceSchema = z.object({
  reference: z.string(),
  display: z.string().optional(),
});

const effectivePeriodSchema = z
  .object({
    start: z.string(),
    end: z.string(),
  })
  .optional();

const dosageSchema = z
  .object({
    text: z.string(),
  })
  .optional();

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const medicationCodeableConceptSchema = z.object({
  coding: z.array(codingSchema),
});

const medicationStatementResourceSchema = z.object({
  resourceType: z.literal("MedicationStatement"),
  status: z.string(),
  medicationCodeableConcept: medicationCodeableConceptSchema.optional(),
  medicationReference: referenceSchema.optional(),
  subject: referenceSchema,
  context: referenceSchema.optional(),
  effectivePeriod: effectivePeriodSchema.optional(),
  dosage: z.array(dosageSchema).optional(),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const medicationStatementBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: medicationStatementResourceSchema,
      }),
    )
    .optional(),
});

export const readMedicationStatementResponseSchema =
  medicationStatementResourceSchema;

export const searchMedicationStatementResponseSchema =
  medicationStatementBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
