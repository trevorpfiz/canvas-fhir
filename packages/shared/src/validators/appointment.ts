import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const codingSchema = z.object({
  system: z.string().optional(),
  code: z.string().optional(),
  display: z.string().optional(),
  userSelected: z.boolean().optional(),
});

const endpointSchema = z.object({
  resourceType: z.literal("Endpoint"),
  id: z.string(),
  status: z.string(),
  connectionType: z.object({
    code: z.string(),
  }),
  payloadType: z.array(
    z.object({
      coding: z.array(codingSchema),
    }),
  ),
  address: z.string(),
});

const appointmentTypeSchema = z.object({
  coding: z.array(codingSchema),
});

const reasonCodeSchema = z.object({
  coding: z.array(codingSchema).optional(),
  text: z.string().optional(),
});

const supportingInformationSchema = z.object({
  reference: z.string(),
  type: z.string(),
});

const participantSchema = z.object({
  actor: z.object({
    reference: z.string(),
    type: z.string(),
  }),
  status: z.string(),
});

export const appointmentResourceSchema = z.object({
  resourceType: z.literal("Appointment"),
  id: z.string(),
  contained: z.array(endpointSchema).optional(),
  status: z.string(),
  appointmentType: appointmentTypeSchema.optional(),
  reasonCode: z.array(reasonCodeSchema).optional(),
  description: z.string().optional(),
  supportingInformation: z.array(supportingInformationSchema).optional(),
  start: z.string(),
  end: z.string(),
  participant: z.array(participantSchema),
});
export type AppointmentResource = z.infer<typeof appointmentResourceSchema>;

const entrySchema = z.object({
  resource: appointmentResourceSchema,
});

export const appointmentBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readAppointmentResponseSchema = appointmentResourceSchema;

export const searchAppointmentResponseSchema = appointmentBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
