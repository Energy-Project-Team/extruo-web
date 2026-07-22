// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { createSignal, onCleanup, onMount, For, Show } from "solid-js";
import { useI18n, AVAILABLE_LOCALES } from "@/services/i18n";
import LanguageIcon from "@/assets/icons/language.svg?component-solid";
import CheckIcon from "@/assets/icons/check.svg?component-solid";

const OPTIONS: readonly string[] = ["system", ...AVAILABLE_LOCALES];

export function LanguageSwitcher() {
  const [t, selectLocale, locale] = useI18n();

  /** Renders a locale code as its native language name (e.g. "ru-RU" -> "русский"). */
  const localeLabel = (code: string): string => {
    if (code === "system") return t("language_switcher.system_label");

    const name = new Intl.DisplayNames([code], { type: "language" }).of(code) ?? code;
    return name.charAt(0).toUpperCase() + name.slice(1);
  };
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

  const handleSelect = (value: string) => {
    selectLocale(value);
    close();
  };

  return (
    <div class="relative" ref={containerRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open()}
        aria-label={t("language_switcher.toggle_aria_label")}
        onClick={() => setOpen(!open())}
        class={[
          "button-motion inline-flex h-10 w-10 items-center justify-center rounded-md",
          "border border-transparent text-text-muted hover:bg-bg-card hover:text-text-primary",
          "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo",
        ].join(" ")}
      >
        <LanguageIcon class="h-6 w-6" aria-hidden="true" />
      </button>

      <Show when={open()}>
        <ul
          role="listbox"
          aria-label={t("language_switcher.listbox_aria_label")}
          class="absolute top-[calc(100%+8px)] right-0 z-50 max-h-64 w-56 overflow-y-auto overscroll-contain rounded-md border border-border bg-bg-card py-1 shadow-lg"
        >
          <For each={OPTIONS}>
            {(value) => {
              const active = () => locale() === value;
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
                    {localeLabel(value)}
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
