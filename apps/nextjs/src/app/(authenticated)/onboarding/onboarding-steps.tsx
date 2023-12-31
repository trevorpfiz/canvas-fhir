"use client";

import { useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import Coverage from "./_components/coverage";
import { Done } from "./_components/done";
import MedicalHistory from "./_components/medical-history";
import { NextSteps } from "./_components/next-steps";
import { Overview } from "./_components/overview";
import Questionnaire from "./_components/questionnaire";
import { ScheduleAppointment } from "./_components/schedule-appointment";
import Welcome from "./_components/welcome";

export function OnboardingSteps(props: { templateId: string }) {
  const { templateId } = props;

  const search = useSearchParams();
  const step = search.get("step");

  return (
    <div className="mx-auto flex h-[calc(100vh-8rem)] w-full max-w-4xl flex-col items-center">
      <AnimatePresence mode="wait">
        {!step && <Welcome key="welcome" />}
        {step === "overview" && <Overview key="overview" />}
        {step === "medical-history" && <MedicalHistory key="medical-history" />}
        {step === "coverage" && <Coverage key="coverage" />}
        {step === "questionnaire" && ( // can increment query param for each section
          <div key="questionnaire">
            <Questionnaire />
          </div>
        )}
        {step === "review" && <div key="review">review</div>}
        {step === "schedule" && <ScheduleAppointment key="schedule" />}
        {step === "next-steps" && <NextSteps key="next-steps" />}
        {step === "done" && <Done key="done" />}
      </AnimatePresence>
    </div>
  );
}
