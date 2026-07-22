// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { For } from "solid-js";
import BoltIcon from "@/assets/icons/bolt.svg?component-solid";
import { useI18n } from "@/services/i18n";
import type { TranslationKey } from "@/services/i18n/types";

interface InfoBlock {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
}

const infoBlocks: InfoBlock[] = [
  {
    titleKey: "features.realtime_title",
    descriptionKey: "features.realtime_description",
  },
  {
    titleKey: "features.cloud_title",
    descriptionKey: "features.cloud_description",
  },
  {
    titleKey: "features.security_title",
    descriptionKey: "features.security_description",
  },
];

export default function Features() {
  const [t] = useI18n();

  return (
    <section class="grid grid-cols-1 gap-4 rounded-xl border border-border bg-bg-card p-6 md:gap-5 md:p-10 md:grid-cols-3">
      <For each={infoBlocks}>
        {(block) => (
          <div class="flex flex-col gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-md bg-bg-green">
              <BoltIcon class="text-accent-green h-5 w-5" aria-hidden="true" />
            </div>
            <h2 class="mt-1.5 text-lg font-semibold text-text-primary">
              {t(block.titleKey)}
            </h2>
            <p class="text-sm leading-relaxed text-text-muted">
              {t(block.descriptionKey)}
            </p>
          </div>
        )}
      </For>
    </section>
  );
}