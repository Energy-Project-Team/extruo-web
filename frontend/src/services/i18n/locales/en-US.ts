// The main translation file

import type { Translation } from '../types';

const translation: Translation = {
    meta: {
        title: 'Extruo Web — 3D Printer Control Panel'
    },
    header: {
        login_button: 'Log in'
    },
    footer: {
        copyright: '© 2026 Extruo Web · developed by Energy Project Team commissioned by NII «TechnoPron»',
        disclaimer: 'Not an official Bambu Lab service. Not endorsed by or affiliated with Bambulab Limited or Bambu Lab.'
    },
    features: {
        realtime_title: 'Real time',
        realtime_description: 'Live camera feed, temperature, and G-code with no delays.',
        cloud_title: 'Cloud projects',
        cloud_description: 'Upload .3mf and .gcode files, queue them, and print from anywhere.',
        security_title: 'Security',
        security_description: 'User verification and a log of every printer operation.'
    },
    intro: {
        heading: 'Web panel for print management',
        printer_alt: 'Bambu Lab A1 mini 3D printer shown from a front-three-quarter view',
        open_dashboard_button: 'Open dashboard',
        source_code_button: 'Source code',
        feature_printer_specific: 'Purpose-built for Bambu Lab printers',
        feature_realtime_control: 'Full real-time control over the printing process',
        feature_monitoring: 'Monitoring of temperature, speed, and material flow',
        feature_remote_management: 'Remote control and print job scheduling',
        feature_cloud_integration: 'Integration with cloud project storage',
        feature_user_verification: 'User verification system'
    },
    language_switcher: {
        system_label: 'System',
        toggle_aria_label: 'Change language',
        listbox_aria_label: 'Language'
    },
    theme_switcher: {
        system_label: 'System',
        light_label: 'Light',
        dark_label: 'Dark',
        light_contrast_label: 'Light contrast',
        dark_contrast_label: 'Dark contrast',
        toggle_aria_label: 'Change theme',
        listbox_aria_label: 'Theme'
    }
};

export default translation;
