export interface PasswordPolicy {
    minLength: number;
    sessionTimeout: number;
    requireSpecialCharacters: boolean;
    requireNumbers: boolean;
    requiredUpperLetter: boolean;
}

export interface FeatureFlags {
    enableChat: boolean;
    enableFileUpload: boolean;
}

export interface Notifications {
    enableGlobalNotifications: boolean;
    enableEmailNotifications: boolean;
    enableSmsNotifications: boolean;
    enablePushNotifications: boolean;
}

export interface AppSettings {
    allowClientRegistration: string; // Povolí registraci nových klientů
    allowDarkMode: string; // Výchozí nastavení pro tmavý motiv
    defaultLanguage: string; // Např. 'en', 'cz'
    maxUsers: number;
    maxClients: number;
    maxDoctors: number;
    maxManagers: number;
    maxReceptionists: number;
    maxNurses: number;
    maintenanceMode: boolean; // Zapne/vypne režim údržby
    defaultTimezone: string; // Např. 'Europe/Prague'
    passwordPolicy: PasswordPolicy; // Politika hesel
    sessionTimeout: number; // Časový limit sezení v minutách
    notifications: Notifications;
    notificationChannels: string[]; // ['email', 'sms', 'push'] - dostupné kanály notifikací
    featureFlags: FeatureFlags; // Zapnutí/vypnutí specifických funkcí
    defaultCurrency: string; // Např. 'CZK', 'USD'
    dateFormat: string; // Formát datumu, např. 'dd.MM.yyyy'
    timeFormat: string; // Formát času, např. 'HH:mm'
    maxUploadFileSize: number; // Maximální velikost uploadovaných souborů v MB
}
