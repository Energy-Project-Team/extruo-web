// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

export default function Footer() {
  return (
    <footer class="flex flex-col items-center justify-between gap-3 border-t border-border-subtle bg-bg-surface px-10 py-6 md:flex-row md:gap-10">
      <div class="flex min-w-0 flex-1 flex-col gap-1">
        <span class="text-[13px] text-text-muted">
          © 2026 Extruo Web · разработано Energy Project Team по заказу НИИ «ТехноПрон»
        </span>
        <span class="text-[13px] uppercase tracking-wide text-text-muted/70">
          Не является официальным сервисом Bambu Lab. Не одобрено и не связано с компанией Bambulab Limited или Bambu Lab.
        </span>
      </div>

      <span class="shrink-0 font-mono text-[13px] text-text-muted">v1.0.0</span>
    </footer>
  );
}
