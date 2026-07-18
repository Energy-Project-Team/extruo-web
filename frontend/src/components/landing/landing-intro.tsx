// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { For } from "solid-js";
import RunIcon from "@/assets/icons/run.svg?component-solid";
import GitHubIcon from "@/assets/icons/mark-github-24.svg?component-solid";
import printerPreview from "@/assets/printer-prev.png";
import { Button, type ButtonProps } from "../ui/buttons/simple-button";

type LandingIntroProps = {
  onLogin?: ButtonProps["onClick"];
};

const features = [
  "Специально разработана для принтеров Bambu Lab",
  "Полный контроль над процессом печати в реальном времени",
  "Мониторинг температуры, скорости и расхода материала",
  "Удалённое управление и планирование задач печати",
  "Интеграция с облачным хранилищем проектов",
  "Система верификации пользователей",
];

export default function LandingIntro(props: LandingIntroProps) {
  return (
    <section class="relative min-h-105 overflow-hidden rounded-xl border border-border landing-intro-bg p-10">
      <div class="relative max-w-155">
        <div class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-transparent bg-bg-green px-2.5 py-1 text-xs leading-[1.4] font-semibold tracking-[0.01em] text-accent-green">
          <span class="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Bambu Lab A1 Mini
        </div>

        <h1 class="mt-4 mb-5 text-[40px] leading-[1.15] font-bold tracking-snug text-text-primary">
          Веб-панель для управления печатью
        </h1>

        <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
          <For each={features}>
            {(feature) => (
              <li class="flex items-start gap-2.5 font-mono text-[15px] tracking-[0.01em] text-text-dimmed">
                <span class="shrink-0 text-accent-green">›</span>
                <span>{feature}</span>
              </li>
            )}
          </For>
        </ul>

        <div class="mt-7 flex gap-3">
          <Button
            variant="action"
            size="md"
            onClick={props.onLogin}
            leadingIcon={<RunIcon aria-hidden="true" />}
          >
            Открыть панель
          </Button>

          <Button
            variant="outline"
            size="md"
            leadingIcon={<GitHubIcon class="text-white" aria-hidden="true"/>}
            onClick={() => window.open("https://github.com/Energy-Project-Team/extruo-web", "_blank")}
          >
            Исходный код
          </Button>

        </div>
      </div>

    <div class="pointer-events-none absolute top-1/2 right-6 h-100 w-100 -translate-y-1/2">
      <div class="absolute -inset-48 landing-intro-glow" />
      <img
        src={printerPreview}
        alt="Bambu Lab A1 mini 3D printer shown from a front-three-quarter view"
        class="relative h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
      />
    </div>

    </section>
  );
}
