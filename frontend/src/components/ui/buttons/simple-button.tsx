// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

type Variant = "primary" | "action" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

export interface ButtonProps
  extends Omit<JSX.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  leadingIcon?: JSX.Element;
  trailingIcon?: JSX.Element;
}

const sizeClasses: Record<Size, string> = {
  sm: "min-h-9 gap-1.5 px-3 py-2 text-sm",
  md: "min-h-11.75 gap-2 px-4 py-3 text-base",
  lg: "min-h-13.5 gap-2.5 px-5.5 py-3.5 text-lg",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "border border-transparent bg-accent-indigo text-on-accent hover:bg-accent-indigo-hover",
  action:
    "border border-transparent bg-accent-green text-accent-green-dark hover:bg-accent-green-hover",
  secondary:
    "border border-border-strong bg-bg-card text-text-primary hover:bg-bg-raised",
  ghost:
    "border border-transparent bg-transparent text-text-muted hover:bg-bg-card",
  danger:
    "border border-transparent bg-danger text-on-accent hover:bg-danger-hover",
  outline:
    "border border-border-strong bg-transparent text-text-primary hover:bg-bg-card",
};

export function Button(props: ButtonProps) {
  const [local, rest] = splitProps(props, [
    "children",
    "variant",
    "size",
    "full",
    "disabled",
    "leadingIcon",
    "trailingIcon",
    "class",
  ]);

  return (
    <button
      disabled={local.disabled}
      class={[
        "inline-flex items-center justify-center rounded-md font-sans font-medium tracking-snug leading-none",
        "button-motion hover:brightness-[1.08] active:scale-[0.97]",
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-45 disabled:pointer-events-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-indigo",
        sizeClasses[local.size ?? "md"],
        variantClasses[local.variant ?? "primary"],
        local.full ? "w-full" : "w-auto",
        local.class,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {local.leadingIcon}
      {local.children}
      {local.trailingIcon}
    </button>
  );
}
