import { z } from "zod";

const linkSchema = z
  .object({
    relation: z.string().optional(),
    url: z.string().optional(),
  })
  .optional();

const codingSchema = z
  .object({
    code: z.string().optional(),
    system: z.string().optional(),
    display: z.string().optional(),
  })
  .optional();

const categorySchema = z
  .object({
    coding: z.array(codingSchema).optional(),
  })
  .optional();

const referenceSchema = z
  .object({
    reference: z.string().optional(),
    type: z.string().optional(),
  })
  .optional();

const periodSchema = z
  .object({
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .optional();

const provisionSchema = z
  .object({
    period: periodSchema.optional(),
  })
  .optional();

const scopeSchema = z
  .object({
    coding: z.array(codingSchema).optional(),
    text: z.string().optional(),
  })
  .optional();

const sourceAttachmentSchema = z
  .object({
    data: z.string().optional(),
    url: z.string().optional(),
  })
  .optional();

const consentResourceSchema = z.object({
  resourceType: z.literal("Consent"),
  id: z.string().optional(),
  status: z.string().optional(),
  scope: scopeSchema,
  category: z.array(categorySchema).optional(),
  meta: z
    .object({
      lastUpdated: z.string().optional(),
      versionId: z.string().optional(),
    })
    .optional(),
  patient: referenceSchema,
  dateTime: z.string().optional(),
  sourceAttachment: sourceAttachmentSchema.optional(),
  provision: provisionSchema.optional(),
});

const entrySchema = z.object({
  resource: consentResourceSchema,
});

export const consentBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readConsentResponseSchema = consentResourceSchema;

export const searchConsentResponseSchema = consentBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
