// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

export type Theme = 'system' | ResolvedTheme;
export type ResolvedTheme = 'light' | 'dark' | 'light-contrast' | 'dark-contrast';

export const THEMES: readonly Theme[] = ['system', 'light', 'dark', 'light-contrast', 'dark-contrast'];
