/**
 * comparing incoming date is smaller than 30 days to today
 * @param date
 * @returns
 */
const expiringDate = (date: string): boolean => {
    // 30 days in milliseconds
    const monthInMilliseconds = 2592000000;

    const today = new Date().valueOf();
    const incomingDate = new Date(date).valueOf();

    const r = incomingDate - today;
    return r <= monthInMilliseconds;
};

export default expiringDate;
