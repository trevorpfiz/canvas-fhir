import { useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { compareAsc, parseISO } from "date-fns";
import { useAtom } from "jotai";

import { patientIdAtom } from "~/app/(main)";
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

  // Sort tasks by date using date-fns
  const sortedTasks = tasksQuery.data?.entry
    ?.filter((item) => {
      if (taskStatus === "") {
        return true;
      }
      return item.resource.status === taskStatus;
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
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={sortedTasks}
          renderItem={({ item }) => (
            <View
              className={`ml-4 w-52 flex-1 flex-col justify-between gap-4 rounded-xl p-2 ${
                item.resource.status === "requested"
                  ? "border-blue-400 bg-blue-500"
                  : item.resource.status === "cancelled"
                    ? "border-yellow-400 bg-yellow-200"
                    : "border-green-400 bg-green-200"
              }`}
            >
              <Text className="text-base font-medium text-white">
                {item.resource.description}
              </Text>
              <Text className="text-sm text-white">
                {formatDateTime(item.resource.authoredOn!)}
              </Text>
              {item.resource.status === "completed" && (
                <Text>{item.resource.status}</Text>
              )}
            </View>
          )}
          keyExtractor={(item) => item.resource.id}
          contentContainerStyle={{ paddingHorizontal: 0 }}
        />
      ) : (
        <View className="flex-1 items-center justify-start gap-2">
          <MeditationSvg />
          <Text className="text-2xl font-normal">{`All tasks done!`}</Text>
        </View>
      )}
    </View>
  );
}
