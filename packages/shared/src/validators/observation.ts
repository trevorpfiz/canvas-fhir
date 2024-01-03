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

const categorySchema = z.object({
  coding: z.array(codingSchema),
});

const codeSchema = z.object({
  coding: z.array(codingSchema),
});

const referenceSchema = z.object({
  reference: z.string().optional(),
  type: z.string().optional(),
});

const valueQuantitySchema = z.object({
  value: z.number(),
  unit: z.string().optional(),
});

const componentSchema = z.object({
  code: codeSchema,
  valueQuantity: valueQuantitySchema.optional(),
});

export const observationResourceSchema = z.object({
  resourceType: z.literal("Observation"),
  id: z.string(),
  status: z.string(),
  category: z.array(categorySchema).optional(),
  code: codeSchema,
  subject: referenceSchema,
  effectiveDateTime: z.string().optional(),
  issued: z.string().optional(),
  dataAbsentReason: z
    .object({
      coding: z.array(codingSchema),
    })
    .optional(),
  hasMember: z.array(referenceSchema).optional(),
  component: z.array(componentSchema).optional(),
  derivedFrom: z.array(referenceSchema).optional(),
  valueQuantity: valueQuantitySchema.optional(),
});

const entrySchema = z.object({
  resource: observationResourceSchema,
});

export const observationBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readObservationResponseSchema = observationResourceSchema;

export const searchObservationResponseSchema = observationBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
