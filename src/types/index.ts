export interface User {
    uid: string;
    email: string | null;
    displayName: string | null;
}

export interface AuthState {
    authLoading: boolean;
    isAuthenticated: boolean;
    user: UserData | null;
}

export interface MenuItem {
    id: number | string;
    href: string;
    name: string;
    divided?: boolean;
    icon?: string;
    allowedPermission?: string[];
}

export interface Notification {
    id: number;
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'error';
    read: boolean;
}

export interface UserPreferences {
    darkMode: boolean;
    notifications: boolean;
    language: string;
}

export interface UserData extends User {
    role: string;
    permissions: string[];
    preferences: UserPreferences;
}
