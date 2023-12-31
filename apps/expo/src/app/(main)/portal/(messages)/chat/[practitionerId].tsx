import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import type { IMessage } from "react-native-gifted-chat";
import { GiftedChat } from "react-native-gifted-chat";
import { Stack, useLocalSearchParams } from "expo-router";
import { useAtom } from "jotai";

import { patientIdAtom } from "~/app/(main)";
import {
  ChatRightHeaderClose,
  MessagesLeftHeaderBack,
} from "~/components/ui/headers/messages-header";
import { LoaderComponent } from "~/components/ui/loader";
import { api } from "~/utils/api";

export default function ChatPage() {
  const { practitionerId } = useLocalSearchParams<{ practitionerId: string }>();
  const [patientId] = useAtom(patientIdAtom);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const utils = api.useUtils();

  const practitionerQuery = api.practitioner.getPractitioner.useQuery({
    path: {
      practitioner_a_id: practitionerId,
    },
  });

  const chatMsgsQuery = api.communication.chatMsgs.useQuery({
    query: {
      sender: `Patient/${patientId}`,
      recipient: `Practitioner/${practitionerId}`,
    },
  });

  const isLoading = practitionerQuery.isLoading || chatMsgsQuery.isLoading;
  const isError = practitionerQuery.isError || chatMsgsQuery.isError;
  const error = practitionerQuery.error ?? chatMsgsQuery.error;

  const createMsg = api.communication.createCommunication.useMutation({
    onSuccess: (data) => {
      // Invalidate the patientChats query so that it will be refetched
      void utils.communication.patientChats.invalidate();
    },
  });

  // Synchronize local state with API data
  useEffect(() => {
    if (chatMsgsQuery.data) {
      setMessages(chatMsgsQuery.data);
    }
  }, [chatMsgsQuery.data]);

  // This function will be called when a new message is sent
  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      if (newMessages.length > 0) {
        await createMsg.mutateAsync({
          body: {
            status: "unknown",
            payload: [
              {
                contentString: newMessages?.[0]?.text ?? "",
              },
            ],
            recipient: [
              {
                reference: `Practitioner/${practitionerId}`,
              },
            ],
            sender: {
              reference: `Patient/${patientId}`,
            },
          },
        });

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessages),
        );
      }
    },
    [createMsg, practitionerId, patientId],
  );

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return <Text>{error?.message}</Text>;
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Stack.Screen
        options={{
          title: practitionerQuery.data.name[0]?.text,
          headerTitleAlign: "center",
          headerLeft: () => <MessagesLeftHeaderBack />,
          headerRight: () => <ChatRightHeaderClose />,
        }}
      />
      <View className="h-full w-full flex-1 bg-white">
        {practitionerQuery.data && messages && (
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 1 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
