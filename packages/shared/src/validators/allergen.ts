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

const textSchema = z.object({
  status: z.string(),
  div: z.string(),
});

export const allergenResourceSchema = z.object({
  resourceType: z.literal("Allergen"),
  id: z.string(),
  text: textSchema,
  code: z.object({
    coding: z.array(codingSchema),
  }),
});

const entrySchema = z.object({
  resource: allergenResourceSchema,
});

export const allergenBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readAllergenResponseSchema = allergenResourceSchema;

export const searchAllergenResponseSchema = allergenBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
