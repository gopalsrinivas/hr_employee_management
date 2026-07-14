"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function DesignationsPage() {
  return <ModulePage config={moduleConfigs.designations} />;
}
