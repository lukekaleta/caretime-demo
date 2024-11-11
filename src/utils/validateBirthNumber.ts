/**
 * Validuje české rodné číslo.
 * @param {string} birthNumber - Rodné číslo, které má být validováno.
 * @returns {boolean} - Vrací true, pokud je rodné číslo validní.
 */
const validateBirthNumber = (birthNumber: string): boolean => {
    const rc = birthNumber.replace(/\D/g, '');

    if (rc.length !== 9 && rc.length !== 10) {
        return false;
    }

    const year = parseInt(rc.substr(0, 2), 10);
    const month = parseInt(rc.substr(2, 2), 10);
    const day = parseInt(rc.substr(4, 2), 10);

    // Ověříme měsíc: ženy mají měsíce +50, takže max. hodnota měsíce je 62
    if (month < 1 || (month > 12 && month < 51) || month > 62) {
        return false;
    }

    // Ověříme den, že je v rozsahu 1-31
    if (day < 1 || day > 31) {
        return false;
    }

    // Pokud je rodné číslo 10místné, musí být dělitelné 11
    if (rc.length === 10) {
        const kontrolniCislo = parseInt(rc, 10);
        if (kontrolniCislo % 11 !== 0) {
            return false;
        }
    }

    // Ověření data narození
    let fullYear = year;
    if (fullYear < 54) {
        fullYear += 2000; // Rok narození po roce 1954
    } else {
        fullYear += 1900; // Rok narození před rokem 1954
    }

    // Ověření správného data
    const realMonth = month > 50 ? month - 50 : month;
    const dateOfBirth = new Date(`${fullYear}-${realMonth}-${day}`);
    if (isNaN(dateOfBirth.getTime())) {
        return false;
    }

    return true;
};

export default validateBirthNumber;
