import { z } from "zod";

const linkSchema = z.object({
  relation: z.string(),
  url: z.string(),
});

const referenceSchema = z
  .object({
    reference: z.string().optional(),
    type: z.string().optional(),
  })
  .optional();

const payloadSchema = z.object({
  contentString: z.string(),
});

export const communicationResourceSchema = z.object({
  resourceType: z.literal("Communication"),
  id: z.string(),
  status: z.string().optional(),
  sent: z.string().optional(),
  received: z.string().optional(),
  recipient: z.array(referenceSchema).optional(),
  sender: referenceSchema,
  payload: z.array(payloadSchema).optional(),
});

const entrySchema = z.object({
  resource: communicationResourceSchema,
});

export const communicationBundleSchema = z.object({
  resourceType: z.literal("Bundle"),
  type: z.literal("searchset"),
  total: z.number(),
  link: z.array(linkSchema).optional(),
  entry: z.array(entrySchema).optional(),
});

export const readCommunicationResponseSchema = communicationResourceSchema;

export const searchCommunicationResponseSchema = communicationBundleSchema;

// Usage: Validate data with responseSchema.parse(yourDataObject)
