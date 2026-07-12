// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { Logo } from "../logo";
import { Button, type ButtonProps } from "../ui/buttons/simple-button";

type HeaderProps = {
  onLogin?: ButtonProps["onClick"];
};

export default function landingHeader(props: HeaderProps) {
  return (
    <header class="sticky top-0 z-50 flex h-18 items-center justify-between border-b border-border-subtle bg-bg-surface px-10">
      <Logo />
      <Button variant="primary" size="md" onClick={props.onLogin}>
        Войти
      </Button>
    </header>
  );
}
