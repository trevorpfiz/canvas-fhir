import { useState } from "react";
import { Button, Text, Touchable, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { compareAsc, parseISO } from "date-fns";
import { useAtom } from "jotai";

import { patientIdAtom } from "~/app/(main)";
import { cn } from "~/components/ui/rn-ui/lib/utils";
import MeditationSvg from "~/components/ui/tasks-svg";
import { api } from "~/utils/api";
import { formatDateTime } from "~/utils/dates";

export default function Tasks() {
  const [patientId] = useAtom(patientIdAtom);
  const router = useRouter();
  const [taskStatus, setTaskStatus] = useState<
    "requested" | "cancelled" | "completed" | ""
  >("");

  const tasksQuery = api.task.search.useQuery({
    query: {
      patient: `Patient/${patientId}`,
    },
  });

  // Check if there are tasks to display
  const hasTasks = tasksQuery.data?.entry?.length ?? 0 > 0;

  // Sort and filter tasks
  const sortedTasks = tasksQuery.data?.entry
    ?.filter((item) => {
      // Exclude 'cancelled' tasks
      if (item.resource.status === "cancelled") {
        return false;
      }
      // If taskStatus is set, filter by it; otherwise, include all non-cancelled tasks
      return taskStatus === "" || item.resource.status === taskStatus;
    })
    .sort((a, b) =>
      compareAsc(
        parseISO(a.resource?.authoredOn ?? ""),
        parseISO(b.resource?.authoredOn ?? ""),
      ),
    );

  return (
    <View className="flex-1 flex-col gap-8">
      <View className="flex-row items-center justify-between px-6">
        <Text className="text-3xl font-bold">{`Your Tasks`}</Text>
        <Button
          title="See All"
          onPress={() => {
            setTaskStatus("");
            router.push("/portal/tasks");
          }}
          color={"#1d4ed8"}
        />
      </View>
      {hasTasks ? (
        <View className="flex-1 items-start">
          <FlashList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={sortedTasks}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.8} className="flex-1">
                <View
                  className={cn(
                    "ml-4 w-52 flex-1 flex-col justify-between gap-16 rounded-xl p-2",
                    {
                      "border-blue-400 bg-blue-500":
                        item.resource.status === "requested",
                      "border-yellow-400 bg-yellow-500":
                        item.resource.status === "cancelled",
                      "border-green-400 bg-green-500":
                        item.resource.status === "completed",
                    },
                  )}
                >
                  <Text className="line-clamp-4 text-sm font-medium text-white">
                    {item.resource.description}
                  </Text>
                  {item.resource.status !== "completed" && (
                    <Text className="text-sm text-white">
                      {formatDateTime(item.resource.authoredOn!)}
                    </Text>
                  )}
                  {item.resource.status === "completed" && (
                    <Text className="text-sm capitalize text-white">
                      {item.resource.status}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
            estimatedItemSize={300}
            keyExtractor={(item) => item.resource.id}
            contentContainerStyle={{ paddingHorizontal: 0 }}
          />
        </View>
      ) : (
        <View className="flex-1 items-center justify-start gap-2">
          <MeditationSvg />
          <Text className="text-2xl font-normal">{`All tasks done!`}</Text>
        </View>
      )}
    </View>
  );
}
