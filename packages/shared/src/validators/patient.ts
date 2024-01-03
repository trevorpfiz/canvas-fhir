import { z } from "zod";

const linkSchema = z.object({
  relation: z.string().optional(),
  url: z.string().optional(),
});

const codingSchema = z.object({
  system: z.string().optional(),
  code: z.string().optional(),
  display: z.string().optional(),
});

const textSchema = z.object({
  status: z.string().optional(),
  div: z.string().optional(),
});

const extensionSchema = z
  .object({
    extension: z
      .array(
        z.object({
          url: z.string().optional(),
          valueString: z.string().optional(),
        }),
      )
      .optional(),
    url: z.string(),
    valueCode: z.string().optional(),
    valueCodeableConcept: z
      .object({
        coding: z.array(codingSchema).optional(),
        text: z.string().optional(),
      })
      .optional(),
    valueString: z.string().optional(),
    valueBoolean: z.boolean().optional(),
    valueIdentifier: z
      .object({
        system: z.string().optional(),
        value: z.string().optional(),
      })
      .optional(),
  })
  .optional();

const identifierSchema = z.object({
  id: z.string().optional(),
  use: z.string().optional(),
  type: z
    .object({
      coding: z.array(codingSchema).optional(),
    })
    .optional(),
  system: z.string().optional(),
  value: z.string().optional(),
  assigner: z
    .object({
      display: z.string().optional(),
    })
    .optional(),
  period: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
});

const nameSchema = z.object({
  use: z.string().optional(),
  family: z.string().optional(),
  given: z.array(z.string()).optional(),
  period: z
    .object({
      start: z.string().optional(),
      end: z.string().optional(),
    })
    .optional(),
});

const telecomSchema = z.object({
  system: z.string().optional(),
  value: z.string().optional(),
  use: z.string().optional(),
  rank: z.number().optional(),
});

const addressSchema = z.object({
  id: z.string().optional(),
  use: z.string().optional(),
  type: z.string().optional(),
  line: z.array(z.string()).optional(),
  period: z
    .object({
      start: z.string().optional(),
    })
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
});

const contactSchema = z.object({
  extension: z
    .array(
      z.object({
        url: z.string().optional(),
        valueBoolean: z.boolean().optional(),
      }),
    )
    .optional(),
  id: z.string().optional(),
  relationship: z.array(
    z.object({
      coding: z.array(codingSchema),
      text: z.string().optional(),
    }),
  ),
  name: z
    .object({
      text: z.string(),
    })
    .optional(),
  telecom: z.array(telecomSchema).optional(),
});

const communicationSchema = z.object({
  language: z.object({
    coding: z.array(codingSchema),
    text: z.string().optional(),
  }),
});

const patientResourceSchema = z.object({
  resourceType: z.literal("Patient"),
  id: z.string().optional(),
  text: textSchema,
  extension: z.array(extensionSchema).optional(),
  identifier: z.array(identifierSchema).optional(),
  active: z.boolean().optional(),
  name: z.array(nameSchema).optional(),
  telecom: z.array(telecomSchema).optional(),
  gender: z.string().optional(),
  birthDate: z.string().optional(),
  deceasedBoolean: z.boolean().optional(),
  address: z.array(addressSchema).optional(),
  contact: z.array(contactSchema).optional(),
  communication: z.array(communicationSchema).optional(),
});

const entrySchema = z.object({
  resource: patientResourceSchema,
});

export const patientBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readPatientResponseSchema = patientResourceSchema;

export const searchPatientResponseSchema = patientBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
