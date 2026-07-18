// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { For } from "solid-js";
import BoltIcon from "@/assets/icons/bolt.svg?component-solid";

interface InfoBlock {
  title: string;
  description: string;
}

const infoBlocks: InfoBlock[] = [
  {
    title: "Реальное время",
    description: "Живой поток камеры, температуры и G-code без задержек.",
  },
  {
    title: "Облачные проекты",
    description:
      "Загружайте .3mf и .gcode, ставьте в очередь и печатайте из любой точки.",
  },
  {
    title: "Безопасность",
    description: "Верификация пользователей и журнал всех операций принтера.",
  },
];

export default function Features() {
  return (
    <section class="grid grid-cols-1 gap-4 rounded-xl border border-border bg-bg-card p-6 md:gap-5 md:p-10 md:grid-cols-3">
      <For each={infoBlocks}>
        {(block) => (
          <div class="flex flex-col gap-2">
            <div class="flex h-10 w-10 items-center justify-center rounded-md bg-bg-green">
              <BoltIcon class="text-accent-green h-5 w-5" aria-hidden="true" />
            </div>
            <h2 class="mt-1.5 text-lg font-semibold text-text-primary">
              {block.title}
            </h2>
            <p class="text-sm leading-relaxed text-text-muted">
              {block.description}
            </p>
          </div>
        )}
      </For>
    </section>
  );
}