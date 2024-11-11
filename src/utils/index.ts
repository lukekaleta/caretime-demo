export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getFirstLetter = (str: string): string => {
    return str.charAt(0).toUpperCase();
};

export const formatBirthNumber = (input: string): string => {
    const part1 = input.slice(0, 6);
    const part2 = input.slice(6);

    return `${part1}/${part2}`;
};

/**
 * Converts Czech birth number (Rodné číslo) to a date of birth in ISO format.
 *
 * @param birthNumber - The Czech birth number (Rodné číslo)
 * @returns The birth date in ISO format 'YYYY-MM-DD' or null if invalid.
 */
export const parseBirthNumber = (birthNumber: string): string | null => {
    if (!/^\d{9,10}$/.test(birthNumber)) {
        return null; // Invalid format
    }

    let year = parseInt(birthNumber.slice(0, 2), 10);
    let month = parseInt(birthNumber.slice(2, 4), 10);
    const day = parseInt(birthNumber.slice(4, 6), 10);

    // Adjust year based on the length of the birth number
    const currentYear = new Date().getFullYear() % 100;
    year += year > currentYear ? 1900 : 2000;

    // Adjust for female birth number (if month > 50)
    if (month > 50) {
        month -= 50;
    }

    // Validate the date by checking the components
    const isValidDate = (y: number, m: number, d: number): boolean => {
        const testDate = new Date(y, m - 1, d);
        return (
            testDate.getFullYear() === y &&
            testDate.getMonth() + 1 === m &&
            testDate.getDate() === d
        );
    };

    if (!isValidDate(year, month, day)) {
        return null; // Invalid date
    }

    // Format and return date as 'YYYY-MM-DD'
    const formattedDate = `${year.toString().padStart(4, '0')}-${month
        .toString()
        .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    return formattedDate;
};

export const generateGoogleMapsLink = (address: string) => {
    const baseUrl = 'https://www.google.com/maps?q=';
    const encodedAddress = encodeURIComponent(address);
    return `${baseUrl}${encodedAddress}`;
};

export const formatCurrency = (amount: number): string => {
    if (isNaN(amount)) {
        return '';
    }

    return amount.toLocaleString('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    });
};
