/**
 * From 10000 to 10 000
 * @param number
 * @returns
 */
const numberWithSpace = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
};

export default numberWithSpace;
