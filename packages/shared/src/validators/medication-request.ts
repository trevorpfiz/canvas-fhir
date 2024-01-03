import { z } from "zod";

const codingSchema = z.object({
  system: z.string(),
  code: z.string(),
  display: z.string(),
});

const medicationCodeableConceptSchema = z.object({
  coding: z.array(codingSchema),
});

const referenceSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const reasonCodeSchema = z.object({
  coding: z.array(codingSchema),
});

const dosageQuantitySchema = z.object({
  unit: z.string().optional(),
});

const doseAndRateSchema = z
  .object({
    doseQuantity: dosageQuantitySchema,
  })
  .optional();

const dosageInstructionSchema = z.object({
  text: z.string(),
  doseAndRate: z.array(doseAndRateSchema).optional(),
});

const quantitySchema = z
  .object({
    value: z.number(),
  })
  .optional();

const durationSchema = z.object({
  value: z.number(),
  unit: z.string(),
});

const performerSchema = z
  .object({
    display: z.string(),
  })
  .optional();

const dispenseRequestSchema = z
  .object({
    numberOfRepeatsAllowed: z.number().optional(),
    quantity: quantitySchema,
    expectedSupplyDuration: durationSchema.optional(),
    performer: performerSchema,
  })
  .optional();

const substitutionSchema = z
  .object({
    allowedBoolean: z.boolean(),
  })
  .optional();

const medicationRequestResourceSchema = z.object({
  resourceType: z.literal("MedicationRequest"),
  id: z.string(),
  status: z.string(),
  intent: z.string(),
  reportedBoolean: z.boolean(),
  medicationCodeableConcept: medicationCodeableConceptSchema,
  subject: referenceSchema,
  encounter: referenceSchema,
  authoredOn: z.string(),
  requester: referenceSchema,
  reasonCode: z.array(reasonCodeSchema),
  dosageInstruction: z.array(dosageInstructionSchema),
  dispenseRequest: dispenseRequestSchema,
  substitution: substitutionSchema,
});

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

export const medicationRequestBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z
    .array(
      z.object({
        resource: medicationRequestResourceSchema,
      }),
    )
    .optional(),
});

export const readMedicationRequestResponseSchema =
  medicationRequestResourceSchema;

export const searchMedicationRequestResponseSchema =
  medicationRequestBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
