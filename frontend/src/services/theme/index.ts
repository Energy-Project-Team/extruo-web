// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { createRoot, createSignal, createMemo, createEffect } from 'solid-js';
import type { Theme, ResolvedTheme } from './types';
import { THEMES } from './types';


const colorSchemeQuery = matchMedia('(prefers-color-scheme: dark)');
const contrastQuery = matchMedia('(prefers-contrast: more)');


// ---------- Theming Tools ----------

const STORAGE_KEY = 'theme';

/** Resolves the OS-level color-scheme + contrast preferences to a concrete theme. */
function getSystemTheme(): ResolvedTheme {
    const isDark = colorSchemeQuery.matches;
    const isHighContrast = contrastQuery.matches;

    if (isDark) return isHighContrast ? 'dark-contrast' : 'dark';
    return isHighContrast ? 'light-contrast' : 'light';
}

/**
 * Determines the initial theme by checking localStorage for a saved value,
 * falling back to `system` (i.e. track OS preferences) if none is saved or valid.
 */
function getInitialTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && THEMES.includes(saved as Theme)) return saved as Theme;

    return 'system';
}

/** Applies the resolved theme to the document so CSS custom properties can react to it. */
function applyThemeAttribute(resolved: ResolvedTheme): void {
    document.documentElement.dataset.theme = resolved; // for my custom themes
    document.documentElement.style.colorScheme = resolved.startsWith('dark') ? 'dark' : 'light'; // for browser
}

// Wrapped in a `createRoot` that is never disposed: this is a singleton store meant
// to live for the whole app lifetime, not a component-scoped computation.
const { theme, resolvedTheme, setTheme } = createRoot(() => {
    const [userTheme, setUserTheme] = createSignal<Theme>(getInitialTheme());
    const [systemTheme, setSystemTheme] = createSignal<ResolvedTheme>(getSystemTheme());

    // theme updater
    const updateSystemTheme = () => setSystemTheme(getSystemTheme());
    colorSchemeQuery.addEventListener('change', updateSystemTheme);
    contrastQuery.addEventListener('change', updateSystemTheme);

    const resolvedTheme = createMemo<ResolvedTheme>(() => {
        const current = userTheme();
        return current === 'system' ? systemTheme() : current;
    });

    createEffect(() => applyThemeAttribute(resolvedTheme()));

    return { theme: userTheme, resolvedTheme, setTheme: setUserTheme };
});

/** Sets the active theme and persists the choice in localStorage (`system` clears it). */
function selectTheme(choice: Theme): void {
    setTheme(choice);
    if (choice === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
}

/** Removes the saved theme from localStorage and reverts to tracking system preferences. */
function resetToSystemTheme(): void {
    selectTheme('system');
}


/**
 * Returns a tuple containing:
 * - `resolvedTheme`: a signal holding the current concrete theme (`system` already resolved).
 * - `selectTheme`: function to change the theme.
 * - `theme`: a signal holding the raw user selection (may be `system`).
 * - `resetToSystemTheme`: function to reset to tracking system preferences.
 */
export function useTheme() {
    return [resolvedTheme, selectTheme, theme, resetToSystemTheme] as const;
}
