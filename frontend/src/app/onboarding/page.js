"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function OnboardingPage() {
  return <ModulePage config={moduleConfigs.onboarding} />;
}
