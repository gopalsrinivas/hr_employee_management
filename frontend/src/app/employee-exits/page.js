"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function EmployeeExitsPage() {
  return <ModulePage config={moduleConfigs["employee-exits"]} />;
}
