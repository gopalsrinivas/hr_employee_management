"use client";

import ModulePage from "../../components/modules/ModulePage";
import { moduleConfigs } from "../../config/moduleConfigs";

export default function UsersPage() {
  return <ModulePage config={moduleConfigs.users} />;
}
