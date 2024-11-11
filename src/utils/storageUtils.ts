export const saveToSessionStorage = (key: string, value: any): void => {
    try {
        const serializedValue = JSON.stringify(value);
        sessionStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Chyba při ukládání do sessionStorage', error);
    }
};

export const loadFromSessionStorage = (key: string): any | null => {
    try {
        const serializedValue = sessionStorage.getItem(key);
        if (serializedValue === null) {
            return null;
        }
        return JSON.parse(serializedValue);
    } catch (error) {
        console.error('Chyba při načítání ze sessionStorage', error);
        return null;
    }
};

export const removeFromSessionStorage = (key: string): void => {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error('Chyba při odstraňování ze sessionStorage', error);
    }
};
