// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { For } from "solid-js";
import RunIcon from "@/assets/icons/run.svg?component-solid";
import GitHubIcon from "@/assets/icons/mark-github-24.svg?component-solid";
import printerPreview from "@/assets/printer-prev.png";
import { Button, type ButtonProps } from "../ui/buttons/simple-button";
import { useI18n } from "@/services/i18n";
import type { TranslationKey } from "@/services/i18n/types";

type LandingIntroProps = {
  onLogin?: ButtonProps["onClick"];
};

const featureKeys: TranslationKey[] = [
  "intro.feature_printer_specific",
  "intro.feature_realtime_control",
  "intro.feature_monitoring",
  "intro.feature_remote_management",
  "intro.feature_cloud_integration",
  "intro.feature_user_verification",
];

export default function LandingIntro(props: LandingIntroProps) {
  const [t] = useI18n();

  return (
    <section class="relative overflow-hidden rounded-xl border border-border landing-intro-bg p-6 md:p-10 lg:min-h-105">
      <div class="relative max-w-155">
        <div class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-transparent bg-bg-green px-2.5 py-1 text-xs leading-[1.4] font-semibold tracking-[0.01em] text-accent-green">
          <span class="h-1.5 w-1.5 rounded-full bg-accent-green" />
          Bambu Lab A1 Mini
        </div>

        <h1 class="mt-4 mb-5 text-[28px] leading-[1.2] font-bold tracking-snug text-text-primary md:text-[40px] md:leading-[1.15]">
          {t("intro.heading")}
        </h1>

        <ul class="m-0 flex list-none flex-col gap-2.5 p-0">
          <For each={featureKeys}>
            {(featureKey) => (
              <li class="flex items-start gap-2.5 font-mono text-[15px] tracking-[0.01em] text-text-dimmed">
                <span class="shrink-0 text-accent-green">›</span>
                <span>{t(featureKey)}</span>
              </li>
            )}
          </For>
        </ul>

        <div class="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button
            variant="action"
            size="md"
            class="w-full sm:w-auto"
            onClick={props.onLogin}
            leadingIcon={<RunIcon aria-hidden="true" />}
          >
            {t("intro.open_dashboard_button")}
          </Button>

          <Button
            variant="outline"
            size="md"
            class="w-full sm:w-auto"
            leadingIcon={<GitHubIcon aria-hidden="true"/>}
            onClick={() => window.open("https://github.com/Energy-Project-Team/extruo-web", "_blank")}
          >
            {t("intro.source_code_button")}
          </Button>

        </div>
      </div>

    <div class="pointer-events-none absolute top-1/2 right-6 h-100 w-100 -translate-y-1/2">
      <div class="absolute -inset-48 landing-intro-glow" />
      <img
        src={printerPreview}
        alt={t("intro.printer_alt")}
        class="invisible relative h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] lg:visible"
      />
    </div>

    </section>
  );
}
