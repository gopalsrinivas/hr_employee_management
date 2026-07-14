"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function EmployeesPage() {
  return <ModulePage config={moduleConfigs.employees} />;
}
