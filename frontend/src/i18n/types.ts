// SPDX-License-Identifier: AGPL-3.0-only

/** Root translation object containing all application strings. */
export interface Translation {
    meta: {
        title: string;
    };
    header: {
        login_button: string;
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
