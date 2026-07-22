// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (C) 2026 Energy Project Team

/** Root translation object containing all application strings. */
export interface Translation {
    meta: {
        title: string;
    };
    header: {
        login_button: string;
    };
    footer: {
        copyright: string;
        disclaimer: string;
    };
    features: {
        realtime_title: string;
        realtime_description: string;
        cloud_title: string;
        cloud_description: string;
        security_title: string;
        security_description: string;
    };
    intro: {
        heading: string;
        printer_alt: string;
        open_dashboard_button: string;
        source_code_button: string;
        feature_printer_specific: string;
        feature_realtime_control: string;
        feature_monitoring: string;
        feature_remote_management: string;
        feature_cloud_integration: string;
        feature_user_verification: string;
    };
    language_switcher: {
        system_label: string;
        toggle_aria_label: string;
        listbox_aria_label: string;
    };
    theme_switcher: {
        system_label: string;
        light_label: string;
        dark_label: string;
        light_contrast_label: string;
        dark_contrast_label: string;
        toggle_aria_label: string;
        listbox_aria_label: string;
    };
}




// ---------- Translation Utils ----------

/** Represents a partial translation record where any nested key may be omitted. */
export type DeepPartial<T> = {
    [K in keyof T]? :  T[K] extends object ? DeepPartial<T[K]> : T[K];
};


/** Returns a union of all dot‑separated paths to string values in `T` (recursive). */
type PathsToStrings<T> = T extends string
    ? never
    : {
        [K in keyof T & string]:  T[K] extends string
            ? K
            : `${K}.${PathsToStrings<T[K]>}`;
    }[keyof T & string]; // obtain a union of all values that satisfy this condition


/** Union of all valid translation keys as dot‑separated paths. */
export type TranslationKey = PathsToStrings<Translation>;
