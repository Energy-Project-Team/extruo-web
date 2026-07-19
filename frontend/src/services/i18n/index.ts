// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

import { createSignal } from 'solid-js';
import type { Translation, DeepPartial, TranslationKey } from './types';


// ---------- Locale Module Loader ----------

type LocaleModule = { default: Translation | DeepPartial<Translation> };

const modules = import.meta.glob<LocaleModule>('./locales/*.ts', { eager: true });

const locales: Record<string, DeepPartial<Translation>> = {}; // dict of locales
for (const path in modules) {
    const lang = path.split('/').pop()!.replace('.ts', '');
    locales[lang] = modules[path].default as DeepPartial<Translation>; // type casting
}


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

/**
 * Determines the initial locale by checking localStorage for a saved value,
 * then falling back to the browser's language normalized via `normalizeLocale`.
 */
function getInitialLocale(): string {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved !== null && saved in locales) return saved;

    return normalizeLocale(navigator.language);
}

const [locale, setLocale] = createSignal<string>(getInitialLocale());

/** Sets the active locale and persists the choice in localStorage. */
function selectLocale(lang: string): void {
    setLocale(lang);
    localStorage.setItem(STORAGE_KEY, lang);
}

/** Removes the saved locale from localStorage and reverts to the system locale. */
function resetToSystemLocale(): void {
    localStorage.removeItem(STORAGE_KEY);
    setLocale(normalizeLocale(navigator.language));
}




/**
 * Returns a tuple containing:
 * - `t`: a translation function bound to the current reactive locale.
 * - `selectLocale`: function to change the locale.
 * - `locale`: a signal holding the current locale.
 * - `resetToSystemLocale`: function to reset to system locale.
 */
export function useI18n() {
    const t = (key: TranslationKey, params?: Record<string, string | number>) => translate(locale(), key, params);
    return [t, selectLocale, locale, resetToSystemLocale] as const;
}