"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function LeaveRequestsPage() {
  return <ModulePage config={moduleConfigs["leave-requests"]} />;
}
