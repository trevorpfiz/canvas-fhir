import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Stack, useRouter } from "expo-router";
import { useAtom } from "jotai";

import SvgComponent from "~/components/ui/home-svg";
import { Button } from "~/components/ui/rn-ui/components/ui/button";
import { UserJourney } from "~/lib/constants";
import { atomWithMMKV } from "~/utils/atom-with-mmkv";

export const patientIdAtom = atomWithMMKV("patient_id", "");
export const patientNameAtom = atomWithMMKV("patient_name", {
  firstName: "",
  lastName: "",
});
export const userJourneyAtom = atomWithMMKV<UserJourney | "">(
  "user_journey",
  "",
);

const Index = () => {
  const [patientId, setPatientId] = useAtom(patientIdAtom);
  const [, setPatientName] = useAtom(patientNameAtom);
  const [userJourney, setUserJourney] = useAtom(userJourneyAtom);
  const router = useRouter();

  if (patientId) {
    if (userJourney === UserJourney.Onboarding) {
      return <Redirect href="/onboarding/overview" />;
    } else if (userJourney === UserJourney.Confirmation) {
      return <Redirect href="/onboarding/confirmation" />;
    } else if (userJourney === UserJourney.Portal) {
      return <Redirect href="/(main)/portal/(tabs)" />;
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Changes page title visible on the header */}
      <Stack.Screen
        options={{
          title: "Home Page",
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <View className="h-full w-full flex-1 flex-col justify-between">
        <View className="px-6 py-32">
          <Text className="pb-4 text-center text-5xl font-semibold text-black">
            Hello there!
          </Text>
          <Text className="pb-4 text-center text-2xl text-black">
            Ready to get your life back?
          </Text>

          <View className="pt-8">
            <View className="px-6 pb-6">
              <Button
                onPress={() => {
                  // use the demo patient Donna Lewis as the existing patient
                  setPatientId("e7836251cbed4bd5bb2d792bc02893fd");
                  setPatientName({ firstName: "Donna", lastName: "Lewis" });
                  setUserJourney(UserJourney.Portal);
                }}
                textClass="text-center"
              >
                I am an existing patient
              </Button>
            </View>

            <View className="px-6 pb-6">
              <Button
                onPress={() => router.replace("/onboarding/")}
                textClass="text-center"
              >
                I am a new patient
              </Button>
            </View>
          </View>
        </View>

        <View className="flex-1 items-center justify-center">
          <SvgComponent />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
