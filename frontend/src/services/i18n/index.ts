// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { createSignal, createMemo } from 'solid-js';
import type { Translation, DeepPartial, TranslationKey } from './types';


// ---------- Locale Module Loader ----------

type LocaleModule = { default: Translation | DeepPartial<Translation> };

const modules = import.meta.glob<LocaleModule>('./locales/*.ts', { eager: true });

const locales: Record<string, DeepPartial<Translation>> = {}; // dict of locales
for (const path in modules) {
    const lang = path.split('/').pop()!.replace('.ts', '');
    locales[lang] = modules[path].default as DeepPartial<Translation>; // type casting
}

/** Locale codes available for selection, auto-derived from files in `./locales/`. */
export const AVAILABLE_LOCALES: readonly string[] = Object.keys(locales).sort();


// ---------- Localization Tools ----------

const STORAGE_KEY = 'locale';
const DEFAULT_LOCALE = 'en-US';
const en = locales[DEFAULT_LOCALE] as Translation;


/**
 * Retrieves a nested value from an object using a dot-separated path.
 * Returns `undefined` if any part of the path does not exist.
 */
function getByDotSepPath(obj: any, path: string): string | undefined {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
}

/**
 * Retrieves a translated string for the given key from the current locale,
 * with fallback to English and then the key itself.
 * Replaces placeholders like {name} with values from `params`.
 */
function translate(loc: string, key: TranslationKey, params?: Record<string, string | number>): string {
    const rawString = getByDotSepPath(locales[loc], key) ?? getByDotSepPath(en, key) ?? key; // string with fallback

    if (params === undefined) return rawString;

    return rawString.replace(/\{(\w+)\}/g, (match, paramName) => {
        const value = params[paramName];
        return value !== undefined ? String(value) : match;
    });
}

/**
 * Normalizes a raw locale string (e.g., 'en-US') to a supported locale key.
 * Falls back to the base language if available, otherwise returns `DEFAULT_LOCALE`.
 */
function normalizeLocale(rawLocale: string): string {
    if (rawLocale in locales) return rawLocale;

    const baseLang = rawLocale.split('-')[0];
    const match = Object.keys(locales).find(lang => lang.split('-')[0] === baseLang);
    if (match !== undefined) return match;

    return DEFAULT_LOCALE;
}

/** Resolves the browser's language to a supported locale key. */
function getSystemLocale(): string {
    return normalizeLocale(navigator.language);
}

/**
 * Determines the initial raw locale choice by checking localStorage for a saved
 * value, falling back to `system` (i.e. track the browser language) if none is
 * saved or it no longer matches an available locale.
 */
function getInitialLocale(): string {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && saved in locales) return saved;

    return 'system';
}

const [userLocale, setUserLocale] = createSignal<string>(getInitialLocale());
const [systemLocale, setSystemLocale] = createSignal<string>(getSystemLocale());

window.addEventListener('languagechange', () => setSystemLocale(getSystemLocale()));

const resolvedLocale = createMemo<string>(() => {
    const current = userLocale();
    return current === 'system' ? systemLocale() : current;
});

/** Sets the active locale and persists the choice in localStorage (`system` clears it). */
function selectLocale(choice: string): void {
    setUserLocale(choice);
    if (choice === 'system') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, choice);
}

/** Removes the saved locale from localStorage and reverts to tracking the system language. */
function resetToSystemLocale(): void {
    selectLocale('system');
}




/**
 * Returns a tuple containing:
 * - `t`: a translation function bound to the current reactive (resolved) locale.
 * - `selectLocale`: function to change the locale.
 * - `locale`: a signal holding the raw user selection (may be `system`).
 * - `resetToSystemLocale`: function to reset to tracking the system language.
 */
export function useI18n() {
    const t = (key: TranslationKey, params?: Record<string, string | number>) => translate(resolvedLocale(), key, params);
    return [t, selectLocale, userLocale, resetToSystemLocale] as const;
}