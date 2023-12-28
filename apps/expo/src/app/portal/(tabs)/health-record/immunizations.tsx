import { Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react-native";

import { patientIdAtom } from "~/components/forms/welcome-form";
import ImmunizationItem from "~/components/ui/health-record/immunization-item";
import { api } from "~/utils/api";

export default function Immunizations() {
  const [patientId] = useAtom(patientIdAtom);

  const { isLoading, isError, data, error } =
    api.patientMedicalHistory.getPatientImmunizations.useQuery({ patientId });

  if (isLoading) {
    return (
      <View className="mb-36 flex-1 items-center justify-center bg-white">
        <Loader2
          size={48}
          color="black"
          strokeWidth={2}
          className="animate-spin"
        />
      </View>
    );
  }

  if (isError) {
    return <Text>Error: {error.message}</Text>;
  }

  const immunizations = data?.entry;

  return (
    <View className="flex-1 bg-gray-100">
      {data.total > 0 ? (
        <FlashList
          data={immunizations}
          renderItem={({ item, index }) => (
            <ImmunizationItem
              immunization={item.resource.vaccineCode.coding[0]?.display ?? ""}
              status={item.resource.status}
              first={index === 0}
              last={index === data.total - 1}
            />
          )}
          estimatedItemSize={100}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: 16,
            // paddingTop: 16,
            // paddingHorizontal: 16,
          }}
        />
      ) : (
        <Text className="p-8">{`No immunizations found.`}</Text>
      )}
    </View>
  );
}
