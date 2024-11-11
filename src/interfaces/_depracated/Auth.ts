export interface RegisterData {
    firstName: string;
    lastName: string;
    birthNumber: string;
    gender: 'M' | 'F' | 'O';
    email?: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    email: string;
    password: string;
    recaptchaToken?: string;
}

export interface ResetPasswordData {
    email: string;
}
