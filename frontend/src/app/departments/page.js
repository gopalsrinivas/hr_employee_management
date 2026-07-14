"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function DepartmentsPage() {
  return <ModulePage config={moduleConfigs.departments} />;
}
