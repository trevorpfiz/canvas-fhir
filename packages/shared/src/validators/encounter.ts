import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const identifierSchema = z.object({
  id: z.string().optional(),
  system: z.string().optional(),
  value: z.string().optional(),
});

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const typeSchema = z.object({
  coding: z.array(codingSchema),
});

const referenceSchema = z.object({
  reference: z.string(),
  type: z.string(),
  display: z.string().optional(),
});

const periodSchema = z.object({
  start: z.string(),
  end: z.string().optional(),
});

const participantSchema = z.object({
  type: z.array(typeSchema).optional(),
  period: periodSchema.optional(),
  individual: referenceSchema.optional(),
});

const dischargeDispositionSchema = z.object({
  coding: z.array(codingSchema),
});

const hospitalizationSchema = z.object({
  dischargeDisposition: dischargeDispositionSchema.optional(),
});

const locationSchema = z.object({
  location: referenceSchema.optional(),
});

export const encounterResourceSchema = z.object({
  resourceType: z.literal("Encounter"),
  id: z.string(),
  identifier: z.array(identifierSchema).optional(),
  status: z.string(),
  class: z
    .object({
      system: z.string().optional(),
    })
    .optional(),
  type: z.array(typeSchema).optional(),
  subject: referenceSchema,
  participant: z.array(participantSchema).optional(),
  period: periodSchema,
  reasonCode: z.array(typeSchema).optional(),
  reasonReference: z.array(referenceSchema).optional(),
  hospitalization: hospitalizationSchema.optional(),
  location: z.array(locationSchema).optional(),
});

const entrySchema = z.object({
  resource: encounterResourceSchema,
});

export const encounterBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readEncounterResponseSchema = encounterResourceSchema;

export const searchEncounterResponseSchema = encounterBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
