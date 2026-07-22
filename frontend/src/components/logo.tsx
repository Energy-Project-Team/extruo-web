// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { Show } from "solid-js";
import DarkLogo from "@/assets/dark-logo.svg?component-solid";
import LightLogo from "@/assets/light-logo.svg?component-solid";
import { useTheme } from "@/services/theme";

export function Logo() {
  const [resolvedTheme] = useTheme();
  const isDarkTheme = () => resolvedTheme().startsWith("dark");

  return (
    <div class="inline-flex items-center gap-2">
      <Show when={isDarkTheme()} fallback={<LightLogo class="h-9.5 w-9.5 rounded-sm" aria-hidden="true" />}>
        <DarkLogo class="h-9.5 w-9.5 rounded-sm" aria-hidden="true" />
      </Show>
      <span class="text-[22px] font-semibold tracking-snug text-text-primary">
        Extruo Web
      </span>
    </div>
  );
}
