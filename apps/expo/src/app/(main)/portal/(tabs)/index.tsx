import { ScrollView, Text, View } from "react-native";
import { useAtom } from "jotai";

import { patientIdAtom, patientNameAtom } from "~/app/(main)";
import NextAppointment from "~/components/next-appointment";
import Tasks from "~/components/tasks";
import { LoaderComponent } from "~/components/ui/loader";
import SubmenuButtons from "~/components/ui/rn-ui/components/ui/submenu-buttons";
import { api } from "~/utils/api";

export default function Home() {
  const [patientId] = useAtom(patientIdAtom);
  const [patientName, setPatientName] = useAtom(patientNameAtom);

  const patientQuery = api.patient.getPatient.useQuery({
    path: {
      patient_id: patientId,
    },
  });

  if (patientQuery.isLoading) {
    return <LoaderComponent />;
  }

  // Update patient name if not already set and if data is available
  if (
    patientQuery.data?.name?.[0] &&
    (!patientName.firstName || !patientName.lastName)
  ) {
    const firstName = patientQuery.data.name[0].given?.[0] ?? "";
    const lastName = patientQuery.data.name[0].family ?? "";
    setPatientName({ firstName, lastName });
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="flex-1 flex-col gap-4 bg-gray-100">
        {/* Welcome message */}
        <View className="bg-white px-6 py-6">
          <Text className="text-3xl font-semibold text-black">
            Good to see you, {patientName.firstName || "User"}
          </Text>
        </View>

        {/* Next appointment */}
        <View className="flex-col gap-2 px-6">
          <Text className="text-xl font-semibold text-black">
            Your next appointment
          </Text>
          <NextAppointment />
        </View>
        {/* Submenu buttons */}
        <View>
          <SubmenuButtons />
        </View>
        {/* Tasks */}
        <View className="flex-1 pb-6">
          <Tasks />
        </View>
      </View>
    </ScrollView>
  );
}
