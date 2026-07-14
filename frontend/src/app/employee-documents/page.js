"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function EmployeeDocumentsPage() {
  return <ModulePage config={moduleConfigs["employee-documents"]} />;
}
