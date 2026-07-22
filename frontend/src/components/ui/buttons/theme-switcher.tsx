// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { createSignal, onCleanup, onMount, For, Show } from "solid-js";
import { useTheme } from "@/services/theme";
import type { Theme } from "@/services/theme/types";
import { THEMES } from "@/services/theme/types";
import ThemeIcon from "@/assets/icons/theme.svg?component-solid";
import CheckIcon from "@/assets/icons/check.svg?component-solid";
import { useI18n } from "@/services/i18n";
import type { TranslationKey } from "@/services/i18n/types";

const THEME_LABEL_KEYS: Record<Theme, TranslationKey> = {
  system: "theme_switcher.system_label",
  light: "theme_switcher.light_label",
  dark: "theme_switcher.dark_label",
  "light-contrast": "theme_switcher.light_contrast_label",
  "dark-contrast": "theme_switcher.dark_contrast_label",
};

export function ThemeSwitcher() {
  const [t] = useI18n();
  const [, selectTheme, theme] = useTheme();
  const [open, setOpen] = createSignal(false);

  let containerRef: HTMLDivElement | undefined;

  const close = () => setOpen(false);

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef && !containerRef.contains(event.target as Node)) close();
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  };

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeydown);
  });

  onCleanup(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener("keydown", handleKeydown);
  });

  const handleSelect = (value: Theme) => {
    selectTheme(value);
    close();
  };

  return (
    <div class="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open()}
        aria-label={t("theme_switcher.toggle_aria_label")}
        onClick={() => setOpen(!open())}
        class={[
          "button-motion inline-flex h-10 w-10 items-center justify-center rounded-md",
          "border border-transparent text-text-muted hover:bg-bg-card hover:text-text-primary",
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo",
        ].join(" ")}
      >
        <ThemeIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <Show when={open()}>
        <ul
          role="listbox"
          aria-label={t("theme_switcher.listbox_aria_label")}
          class="absolute top-[calc(100%+8px)] right-0 z-50 w-56 overflow-hidden rounded-md border border-border bg-bg-card py-1 shadow-lg"
        >
          <For each={THEMES}>
            {(value) => {
              const active = () => theme() === value;
              return (
                <li>
                  <button
                    type="button"
                    role="option"
                    aria-selected={active()}
                    onClick={() => handleSelect(value)}
                    class={[
                      "flex w-full cursor-pointer items-center justify-between gap-2 px-3 py-2 text-left text-sm outline-none",
                      "hover:bg-accent-indigo/10 focus-visible:bg-accent-indigo/10",
                      active() ? "text-text-primary" : "text-text-secondary",
                    ].join(" ")}
                  >
                    {t(THEME_LABEL_KEYS[value])}
                    <Show when={active()}>
                      <CheckIcon class="h-4 w-4 shrink-0 text-accent-indigo" aria-hidden="true" />
                    </Show>
                  </button>
                </li>
              );
            }}
          </For>
        </ul>
      </Show>
    </div>
  );
}
