import { z } from "zod";

const identifierSchema = z.object({
  system: z.string(),
  value: z.string(),
});

const nameSchema = z.object({
  use: z.string(),
  text: z.string(),
  family: z.string(),
  given: z.array(z.string()),
});

const addressSchema = z.object({
  use: z.string(),
  line: z.array(z.string()),
  city: z.string(),
  state: z.string(),
  postalCode: z.string(),
  country: z.string(),
});

const periodSchema = z.object({
  start: z.string(),
  end: z.string(),
});

const extensionSchema = z.object({
  url: z.string(),
  valueString: z.string(),
});

const issuerSchema = z.object({
  extension: z.array(extensionSchema).optional(),
  display: z.string(),
});

const qualificationSchema = z.object({
  identifier: z.array(identifierSchema),
  code: z.object({
    text: z.string(),
  }),
  period: periodSchema,
  issuer: issuerSchema,
});

export const practitionerResourceSchema = z.object({
  resourceType: z.string(),
  id: z.string(),
  identifier: z.array(identifierSchema),
  name: z.array(nameSchema),
  address: z.array(addressSchema),
  qualification: z.array(qualificationSchema),
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const practitionerBundleSchema = z.object({
  resourceType: z.enum(["Bundle"]),
  type: z.enum(["searchset"]),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: practitionerResourceSchema,
      }),
    )
    .optional(),
});

// Usage: Validate data with bundleSchema.parse(yourDataObject)
