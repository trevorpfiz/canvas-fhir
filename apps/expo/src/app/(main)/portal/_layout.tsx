import { Redirect, Stack } from "expo-router";
import { useAtom } from "jotai";

import { patientIdAtom, userJourneyAtom } from "~/app/(main)";
import { UserJourney } from "~/lib/constants";

export default function PortalLayout() {
  const [patientId] = useAtom(patientIdAtom);
  const [userJourney] = useAtom(userJourneyAtom);

  if (!patientId) {
    return <Redirect href="/" />;
  }

  if (patientId) {
    if (userJourney === UserJourney.Onboarding) {
      return <Redirect href="/onboarding/overview" />;
    } else if (userJourney === UserJourney.Confirmation) {
      return <Redirect href="/onboarding/confirmation" />;
    }
  }

  return (
    <Stack>
      <Stack.Screen
        name="(modals)/pdf"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(modals)/tasks"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(messages)"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="(alerts)"
        options={{
          headerShown: false,
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
