// Additional translation file

import type { DeepPartial, Translation } from '../types';

// Use DeepPartial to create translations safely
const translation: DeepPartial<Translation> = {
    meta: {
        title: 'Extruo Web — панель управления принтером'
    },
    header: {
        login_button: 'Войти'
    },
    footer: {
        copyright: '© 2026 Extruo Web · разработано Energy Project Team по заказу НИИ «ТехноПрон»',
        disclaimer: 'Не является официальным сервисом Bambu Lab. Не одобрено и не связано с компанией Bambulab Limited или Bambu Lab.'
    },
    features: {
        realtime_title: 'Реальное время',
        realtime_description: 'Живой поток камеры, температуры и G-code без задержек.',
        cloud_title: 'Облачные проекты',
        cloud_description: 'Загружайте .3mf и .gcode, ставьте в очередь и печатайте из любой точки.',
        security_title: 'Безопасность',
        security_description: 'Верификация пользователей и журнал всех операций принтера.'
    },
    intro: {
        heading: 'Веб-панель для управления печатью',
        printer_alt: 'Принтер Bambu Lab A1 mini, вид спереди в три четверти',
        open_dashboard_button: 'Открыть панель',
        source_code_button: 'Исходный код',
        feature_printer_specific: 'Специально разработана для принтеров Bambu Lab',
        feature_realtime_control: 'Полный контроль над процессом печати в реальном времени',
        feature_monitoring: 'Мониторинг температуры, скорости и расхода материала',
        feature_remote_management: 'Удалённое управление и планирование задач печати',
        feature_cloud_integration: 'Интеграция с облачным хранилищем проектов',
        feature_user_verification: 'Система верификации пользователей'
    },
    language_switcher: {
        system_label: 'Системный',
        toggle_aria_label: 'Сменить язык',
        listbox_aria_label: 'Язык'
    },
    theme_switcher: {
        system_label: 'Системная',
        light_label: 'Светлая',
        dark_label: 'Тёмная',
        light_contrast_label: 'Светлая контрастная',
        dark_contrast_label: 'Тёмная контрастная',
        toggle_aria_label: 'Сменить тему оформления',
        listbox_aria_label: 'Тема оформления'
    }
};

export default translation;
