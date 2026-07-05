# Adding a New Locale / Добавление новой локализации

## English

1. Create a file at `src/i18n/locales/<code>.ts`, where `<code>` is a standard language-region code (e.g. `de-DE`, `fr-FR`). The hyphen is required for region-specific codes.
2. Export the translation using **`export default` ONLY**. The auto-loader (`import.meta.glob`) reads exclusively `.default`; the variable name inside the file is irrelevant.
3. Use the `DeepPartial<Translation>` type if you're not translating every string. Missing keys automatically fall back to `en-US` (the reference dictionary, which must always stay complete).
4. Nothing else needs to be registered. The file is picked up automatically on the next `npm run dev` / build.

```typescript
// src/i18n/locales/de-DE.ts
import type { DeepPartial, Translation } from '../types';

const translation: DeepPartial<Translation> = {
    meta: {
        title: 'Extruo Web — 3D-Drucker-Steuerungspanel'
    },
    header: {
        login_button: 'Anmelden'
    },
};

export default translation;
```

**Adding a new translation key:** first add the field to `Translation` (`src/i18n/types.ts`) — this is the reference structure, and `TranslationKey` will update automatically. Then fill in the value in `en-US.ts` (mandatory) and, where possible, in the other locales.

---

## Русский

1. Создайте файл `src/i18n/locales/<код>.ts`, где `<код>` — стандартный код языка-региона (например, `de-DE`, `fr-FR`). Дефис обязателен для языков с регионом.
2. Экспортируйте перевод **ТОЛЬКО ЧЕРЕЗ `export default`**. Автозагрузчик (`import.meta.glob`) обращается исключительно к `.default`, имя переменной внутри файла роли не играет.
3. Используйте тип `DeepPartial<Translation>`, если переводите не все строки. Отсутствующие ключи автоматически подставятся из `en-US` (эталонного словаря, который обязан быть полным всегда).
4. Ничего больше регистрировать не нужно. Файл подхватится автоматически при следующем запуске `npm run dev` / сборке.

```typescript
// src/i18n/locales/de-DE.ts
import type { DeepPartial, Translation } from '../types';

const translation: DeepPartial<Translation> = {
    meta: {
        title: 'Extruo Web — 3D-Drucker-Steuerungspanel'
    },
    header: {
        login_button: 'Anmelden'
    },
};

export default translation;
```

**Добавление нового ключа перевода:** сначала добавьте поле в `Translation` (`src/i18n/types.ts`) — это эталонная структура, `TranslationKey` пересчитается автоматически. Затем заполните значение в `en-US.ts` (обязательно) и, по возможности, в остальных локалях.
