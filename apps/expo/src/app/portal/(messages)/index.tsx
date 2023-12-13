import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import ChatPreviewCard from "~/components/ui/chat-preview-card";
import { api } from "~/utils/api";

interface Chat {
  title: string;
  preview: string;
  onPress: () => void;
}

export default function MessagesPage() {
  const [chats, setChats] = useState<Chat[]>([]);

  const patientQuery = api.patient.getPatient.useQuery({
    path: {
      patient_id: "e7836251cbed4bd5bb2d792bc02893fd",
    },
  });

  const senderMsgsQuery = api.communication.senderMsgs.useQuery(
    {
      query: {
        sender: `Patient/${patientQuery.data?.id}`,
      },
    },
    { enabled: !!patientQuery?.data?.id },
  );

  useEffect(() => {
    if (senderMsgsQuery.data) {
      setChats(
        senderMsgsQuery.data.map((msg) => ({
          title: msg.recipient.name!,
          preview: msg.message!,
          onPress: () =>
            router.push(`/portal/(messages)/chat/${msg.recipient.id}`),
        })),
      );
    }
  }, [senderMsgsQuery.data]);

  return (
    <View className="flex-1 bg-gray-100">
      <FlashList
        data={chats}
        renderItem={({ item, index }) => (
          <ChatPreviewCard
            title={item.title}
            preview={item.preview}
            onPress={item.onPress}
            first={index === 0}
            last={index === chats.length - 1}
          />
        )}
        estimatedItemSize={100}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{
          paddingBottom: 16,
          paddingTop: 16,
          paddingHorizontal: 16,
        }}
      />
    </View>
  );
}
