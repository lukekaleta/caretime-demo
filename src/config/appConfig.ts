import { AppSettings } from '@/interfaces/_depracated/App';

// Toto nastavení slouží pouze pro defaultní nastavení aplikace,
// nikoliv pro aktuální nastavení, které je v databázi!
export const defaultAppConfig: AppSettings = {
    allowClientRegistration: 'disabled', // registration
    allowDarkMode: 'disabled', // general
    defaultLanguage: 'CZ', // general
    maxUsers: 1000, // registration
    maxClients: 1000, // registration
    maxDoctors: 200, // registration
    maxManagers: 1,
    maxReceptionists: 2,
    maxNurses: 5,
    maintenanceMode: false, // super admin
    defaultTimezone: 'Europe/Prague', // general
    passwordPolicy: {
        minLength: 8,
        sessionTimeout: 30,
        requireSpecialCharacters: false,
        requireNumbers: false,
        requiredUpperLetter: false,
    },
    sessionTimeout: 30, // security
    notifications: {
        enableGlobalNotifications: false,
        enableEmailNotifications: false,
        enablePushNotifications: false,
        enableSmsNotifications: false,
    }, // notifications
    notificationChannels: ['email', 'sms', 'push'], // notifications
    featureFlags: {
        // super admin
        enableChat: false,
        enableFileUpload: false,
    },
    defaultCurrency: 'CZK', // general
    dateFormat: 'dd.MM.yyyy', // general
    timeFormat: 'HH:mm', // general
    maxUploadFileSize: 50, // general
};
