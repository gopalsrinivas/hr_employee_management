"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function PayrollPage() {
  return <ModulePage config={moduleConfigs.payroll} />;
}
