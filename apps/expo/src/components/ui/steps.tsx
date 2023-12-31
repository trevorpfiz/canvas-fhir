import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { useAtom } from "jotai";
import { Check, Lock } from "lucide-react-native";

import { cn } from "~/components/ui/rn-ui/lib/utils";
import { atomWithMMKV } from "~/utils/atom-with-mmkv";

export type StepId =
  | "welcome"
  | "medical-history"
  | "coverage"
  | "questionnaires"
  | "schedule";
export type StepStatus = "complete" | "current" | "upcoming";

export const initialSteps = [
  {
    id: "welcome",
    name: "Welcome",
    description: "Basic info",
    href: "/onboarding",
    status: "complete",
  },
  {
    id: "medical-history",
    name: "Basic Medical History",
    description: "A few questions about your medical history",
    href: "/onboarding/medical-history",
    status: "current",
  },
  {
    id: "coverage",
    name: "Coverage",
    description: "Quickly share your health insurance information",
    href: "/onboarding/coverage",
    status: "upcoming",
  },
  {
    id: "questionnaires",
    name: "Questionnaires",
    description: "Fill out necessary questionnaires",
    href: "/onboarding/questionnaires",
    status: "upcoming",
  },
  {
    id: "schedule",
    name: "Schedule",
    description: "Scheudle an appointment with our care team",
    href: "/onboarding/schedule",
    status: "upcoming",
  },
];

export const stepsAtom = atomWithMMKV("onboarding_steps", initialSteps);

export default function Steps() {
  const [steps] = useAtom(stepsAtom);
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlashList
        data={steps}
        estimatedItemSize={200}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              disabled={item.status !== "current"}
              onPress={() => router.push(item.href as `http${string}`)}
            >
              <View
                className={cn(
                  "m-4 mb-2 ml-8 flex-row items-center rounded-2xl border-2 bg-white",
                  {
                    "border-green-500 bg-green-50": item.status === "complete",
                    "border-blue-500 bg-white": item.status === "current",
                    "border-gray-300 bg-gray-50": item.status === "upcoming",
                  },
                )}
              >
                <View
                  className={cn(
                    "absolute -left-[18px] z-10 flex h-10 w-10 items-center justify-center rounded-full",
                    {
                      "bg-green-500": item.status === "complete",
                      "border-2 border-blue-500 bg-white":
                        item.status === "current",
                      "border-2 border-gray-300 bg-gray-50":
                        item.status === "upcoming",
                    },
                  )}
                >
                  {item.status === "complete" && (
                    <Check size={20} color="white" />
                  )}
                  {item.status === "current" && (
                    <Text className="font-bold text-blue-600">{index + 1}</Text>
                  )}
                  {item.status === "upcoming" && (
                    <Text className="font-bold text-gray-300">{index + 1}</Text>
                  )}
                </View>
                <View className="flex-1 flex-col justify-between gap-2 py-8 pl-12 pr-8">
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={cn("text-xl font-semibold", {
                        "text-green-600": item.status === "complete",
                        "text-black":
                          item.status === "current" ||
                          item.status === "upcoming",
                      })}
                    >
                      {item.name}
                    </Text>
                    <View>
                      {item.status === "complete" && (
                        <Text className="font-bold text-green-600">
                          Complete
                        </Text>
                      )}
                      {item.status === "current" && (
                        <Text className="font-bold text-blue-500">Start</Text>
                      )}
                      {item.status === "upcoming" && (
                        <Lock size={20} color="gray" />
                      )}
                    </View>
                  </View>
                  <Text
                    className={cn("w-3/4 text-lg ", {
                      "text-green-600": item.status === "complete",
                      "text-gray-500":
                        item.status === "current" || item.status === "upcoming",
                    })}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}
