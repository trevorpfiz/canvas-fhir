import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string().optional(),
});

const categorySchema = z.object({
  coding: z.array(codingSchema),
});

const codeSchema = z.object({
  coding: z.array(codingSchema),
});

const referenceSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const presentedFormSchema = z.object({
  url: z.string(),
});

export const diagnosticReportResourceSchema = z.object({
  resourceType: z.literal("DiagnosticReport"),
  id: z.string(),
  status: z.string(),
  category: z.array(categorySchema).optional(),
  code: codeSchema,
  subject: referenceSchema,
  encounter: referenceSchema.optional(),
  effectiveDateTime: z.string(),
  issued: z.string(),
  performer: z.array(referenceSchema).optional(),
  presentedForm: z.array(presentedFormSchema).optional(),
});

const entrySchema = z.object({
  resource: diagnosticReportResourceSchema,
});

export const diagnosticReportBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readDiagnosticReportResponseSchema =
  diagnosticReportResourceSchema;

export const searchDiagnosticReportResponseSchema =
  diagnosticReportBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
