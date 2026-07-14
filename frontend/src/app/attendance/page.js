"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function AttendancePage() {
  return <ModulePage config={moduleConfigs.attendance} />;
}
