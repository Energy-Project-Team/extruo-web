// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { useI18n } from "@/services/i18n";

export default function Footer() {
  const [t] = useI18n();

  return (
    <footer class="flex flex-col items-center justify-between gap-3 border-t border-border-subtle bg-bg-surface px-10 py-6 md:flex-row md:gap-10">
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <span class="text-[13px] text-text-muted">
          {t("footer.copyright")}
        </span>
        <span class="text-[13px] uppercase tracking-wide text-text-muted/70">
          {t("footer.disclaimer")}
        </span>
      </div>

      <span class="shrink-0 font-mono text-[13px] text-text-muted">v1.0.0</span>
    </footer>
  );
}
