// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import DarkLogo from "@/assets/dark-logo.svg?component-solid";

export function Logo() {
  return (
    <div class="inline-flex items-center gap-2">
      <DarkLogo class="h-9.5 w-9.5 rounded-sm" aria-hidden="true" />
      <span class="text-[22px] font-semibold tracking-snug text-text-primary">
        Extruo Web
      </span>
    </div>
  );
}
