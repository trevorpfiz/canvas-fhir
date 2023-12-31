import { TRPCError } from "@trpc/server";
import { compareDesc } from "date-fns";

import {
  get_ReadCommunication,
  get_ReadPractitioner,
  get_SearchCommunicationSender,
  post_CreateCommunication,
} from "../canvas/canvas-client";
import { createTRPCRouter, protectedCanvasProcedure } from "../trpc";

export const communicationRouter = createTRPCRouter({
  createCommunication: protectedCanvasProcedure
    .input(post_CreateCommunication.parameters)
    .mutation(async ({ ctx, input }) => {
      const { api } = ctx;
      const { body } = input;

      // create /Communication
      const communicationData = await api.post("/Communication", {
        body,
      });

      // Validate response
      const validatedData =
        post_CreateCommunication.response.parse(communicationData);

      // Check if response is OperationOutcome
      if (validatedData?.resourceType === "OperationOutcome") {
        const issues = validatedData.issue
          .map(
            (issue) =>
              `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
          )
          .join("; ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${issues}`,
        });
      }

      return validatedData;
    }),
  searchCommunications: protectedCanvasProcedure
    .input(get_SearchCommunicationSender.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // search /Communication
      const communicationData = await api.get("/Communication", {
        query,
      });

      // Validate resposne
      const validatedData =
        get_SearchCommunicationSender.response.parse(communicationData);

      // Check if response is OperationOutcome
      if (validatedData?.resourceType === "OperationOutcome") {
        const issues = validatedData.issue
          .map(
            (issue) =>
              `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
          )
          .join("; ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${issues}`,
        });
      }

      return validatedData;
    }),
  readCommunication: protectedCanvasProcedure
    .input(get_ReadCommunication.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { path } = input;

      // get /Communication/{communication_id}
      const communicationData = await api.get(
        "/Communication/{communication_id}",
        {
          path: {
            communication_id: path.communication_id,
          },
        },
      );

      // Validate response
      const validatedData =
        get_ReadCommunication.response.parse(communicationData);

      // Check if response is OperationOutcome
      if (validatedData?.resourceType === "OperationOutcome") {
        const issues = validatedData.issue
          .map(
            (issue) =>
              `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
          )
          .join("; ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${issues}`,
        });
      }

      return validatedData;
    }),
  patientChats: protectedCanvasProcedure
    .input(get_SearchCommunicationSender.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // Reuse the searchCommunications logic
      const communicationData = await api.get("/Communication", { query });

      // Validate response
      const validatedData =
        get_SearchCommunicationSender.response.parse(communicationData);

      // Check if response is OperationOutcome
      if (validatedData?.resourceType === "OperationOutcome") {
        const issues = validatedData.issue
          .map(
            (issue) =>
              `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
          )
          .join("; ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${issues}`,
        });
      }

      // Define a structure to store chat previews
      interface ChatPreview {
        recipient: {
          name: string;
          id: string;
        };
        latestMessage: string;
        latestMessageDate: Date;
      }

      const chatPreviews: Record<string, ChatPreview> = {};

      // Aggregate messages by provider and select the latest message
      // Using for...of loop to handle async operations
      for (const entry of validatedData.entry ?? []) {
        const msg = entry.resource;
        const recipientId = msg?.recipient?.[0]?.reference?.split("/")[1] ?? "";
        const messageDate = new Date(msg?.sent ?? "");

        // Check if the recipientId is valid
        if (!recipientId) continue;

        if (
          !chatPreviews[recipientId] ||
          (chatPreviews[recipientId]?.latestMessageDate ?? new Date(0)) <
            messageDate
        ) {
          // Fetch provider details
          const providerDetails = await api.get(
            "/Practitioner/{practitioner_a_id}",
            {
              path: {
                practitioner_a_id: recipientId,
              },
            },
          );
          // validate providerDetails
          const validatedProviderDetails =
            get_ReadPractitioner.response.parse(providerDetails);

          // Check if response is OperationOutcome
          if (validatedProviderDetails?.resourceType === "OperationOutcome") {
            const issues = validatedProviderDetails.issue
              .map(
                (issue) =>
                  `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
              )
              .join("; ");
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: `FHIR OperationOutcome Error: ${issues}`,
            });
          }

          chatPreviews[recipientId] = {
            recipient: {
              name:
                validatedProviderDetails?.name?.[0]?.text ?? "Unknown provider",
              id: recipientId,
            },
            latestMessage:
              msg?.payload?.[0]?.contentString ?? "Oops! Something went wrong.",
            latestMessageDate: messageDate,
          };
        }
      }

      return Object.values(chatPreviews).sort((a, b) =>
        compareDesc(a.latestMessageDate, b.latestMessageDate),
      );
    }),
  chatMsgs: protectedCanvasProcedure
    .input(get_SearchCommunicationSender.parameters)
    .query(async ({ ctx, input }) => {
      const { api } = ctx;
      const { query } = input;

      // Get messages sent by sender and recipient
      const senderMsgsResponse = await api.get("/Communication", {
        query: { sender: query.sender, recipient: query.recipient },
      });
      const recipientMsgsResponse = await api.get("/Communication", {
        query: { sender: query.recipient, recipient: query.sender },
      });

      // Validate responses
      const validatedSenderMsgs =
        get_SearchCommunicationSender.response.parse(senderMsgsResponse);
      const validatedRecipientMsgs =
        get_SearchCommunicationSender.response.parse(recipientMsgsResponse);

      // Check if responses are OperationOutcome
      if (
        validatedSenderMsgs?.resourceType === "OperationOutcome" ||
        validatedRecipientMsgs?.resourceType === "OperationOutcome"
      ) {
        const issues = [
          ...(validatedSenderMsgs?.issue || []),
          ...(validatedRecipientMsgs?.issue || []),
        ]
          .map(
            (issue) =>
              `${issue.severity}: ${issue.code}, ${issue.details?.text}`,
          )
          .join("; ");
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `FHIR OperationOutcome Error: ${issues}`,
        });
      }

      // Process a single message
      async function fetchPersonDetails(api, reference) {
        if (!reference) return null;
        const [type, id] = reference.split("/");
        const response = await api.get(`/${type}/{id}`, { path: { id } });
        return response; // Assuming response has the structure { id, name }
      }

      const getAvatarUrl = () => {
        return `https://api.dicebear.com/7.x/shapes/svg`; // Placeholder
      };

      // Function to remove HTML tags and format text
      const sanitizeAndFormatText = (text) => {
        if (!text) return "";

        // Simple regex to remove <p> tags or similar HTML tags
        // Note: This is a basic example and might need to be expanded based on your needs
        return text.replace(/<\/?[^>]+(>|$)/g, "");
      };

      const processSingleMessage = async (msg) => {
        const isPatientSender = msg.sender.reference.startsWith("Patient/");
        const personData = await fetchPersonDetails(
          api,
          isPatientSender ? msg.sender.reference : msg.recipient[0].reference,
        );

        const avatarUrl = getAvatarUrl();

        // Sanitize and format message text
        const rawText = msg.payload[0]?.contentString;
        const formattedText = sanitizeAndFormatText(rawText);

        return {
          _id: msg.id,
          text: formattedText,
          createdAt: new Date(msg.sent),
          user: {
            _id: isPatientSender ? 1 : 2, // Set _id to 1 if patient, 2 if practitioner
            name:
              personData?.name[0]?.use ??
              (isPatientSender ? "Patient" : "Practitioner"),
            // avatar: avatarUrl, // TODO: add avatar
          },
        };
      };

      // Combine and process messages from sender and recipient
      const allMessages = [
        ...(validatedSenderMsgs.entry ?? []),
        ...(validatedRecipientMsgs.entry ?? []),
      ];
      const processedMessages = await Promise.all(
        allMessages.map((entry) => processSingleMessage(entry.resource)),
      );

      // Sort messages by sent date
      return processedMessages.sort((a, b) =>
        compareDesc(new Date(a.createdAt), new Date(b.createdAt)),
      );
    }),
});
