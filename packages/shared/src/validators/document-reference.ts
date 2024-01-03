import { z } from "zod";

const codingSchema = z.object({
  system: z.string().optional(),
  code: z.string().optional(),
  display: z.string().optional(),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const subjectSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const periodSchema = z.object({
  start: z.string(),
});

const encounterSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const attachmentSchema = z.object({
  contentType: z.string(),
  url: z.string(),
});

const formatSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const contentSchema = z.object({
  attachment: attachmentSchema,
  format: formatSchema,
});

export const documentReferenceResourceSchema = z.object({
  resourceType: z.literal("DocumentReference"),
  id: z.string().optional(),
  status: z.string().optional(),
  type: z
    .object({
      coding: z.array(codingSchema).optional(),
    })
    .optional(),
  category: z
    .array(
      z.object({
        coding: z.array(codingSchema),
      }),
    )
    .optional(),
  subject: subjectSchema,
  date: z.string().optional(),
  author: z.array(subjectSchema).optional(),
  custodian: subjectSchema,
  content: z.array(contentSchema).optional(),
  context: z
    .object({
      encounter: z.array(encounterSchema),
      period: periodSchema,
    })
    .optional(),
});

const entrySchema = z.object({
  resource: documentReferenceResourceSchema,
});

export const documentReferenceBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readDocumentReferenceResponseSchema =
  documentReferenceResourceSchema;

export const searchDocumentReferenceResponseSchema =
  documentReferenceBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
