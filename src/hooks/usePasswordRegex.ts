import { useMemo } from 'react';

interface PasswordSettings {
    requireNumbers: boolean;
    requireSpecialCharacters: boolean;
    requiredUpperLetter: boolean;
    minLength: number;
}

interface PasswordValidation {
    regex: RegExp;
    passwordRequires: string[];
    rulesMessage: string;
}

const usePasswordRegex = (settings: PasswordSettings): PasswordValidation => {
    const { regex, passwordRequires, rulesMessage } = useMemo(() => {
        let regexPattern = '^';
        let passwordRequires: string[] = [];

        if (settings.requiredUpperLetter) {
            regexPattern += '(?=.*[A-Z])';
            passwordRequires.push('Upper letter');
        }

        if (settings.requireSpecialCharacters) {
            regexPattern += '(?=.*[!@#$%^&*(),.?":{}|<>])';
            passwordRequires.push('Special character');
        }

        if (settings.requireNumbers) {
            regexPattern += '(?=.*\\d)';
            passwordRequires.push('Number');
        }

        if (settings.minLength) {
            regexPattern += `.{${settings.minLength},}`;
            passwordRequires.push(`Minimum length of ${settings.minLength}`);
        } else {
            regexPattern += '.*';
        }

        regexPattern += '$';

        // Generování věty s pravidly
        const rulesMessage =
            passwordRequires.length > 0
                ? `Heslo musí mít tyto pravidla: ${passwordRequires.join(', ')}`
                : 'Heslo nemá žádná specifická pravidla.';

        return {
            regex: new RegExp(regexPattern),
            passwordRequires,
            rulesMessage,
        };
    }, [settings]);

    return { regex, passwordRequires, rulesMessage };
};

export default usePasswordRegex;
