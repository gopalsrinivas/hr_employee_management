"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function RolesPage() {
  return <ModulePage config={moduleConfigs.roles} />;
}
