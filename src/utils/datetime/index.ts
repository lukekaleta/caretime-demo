import dayjs from 'dayjs';
import dateFormats from './date-formats';
import { Timestamp } from 'firebase/firestore';

// return date in format 'DD. MM. YYYY'
export const formatIsoDate = (date: Date | string) => {
    return dayjs(date).format(dateFormats.formatDateLocal);
};

// return date in format 'DD. MM. YYYY HH:mm'
export const formatIsoDateTime = (date: Date | string) => {
    return dayjs(date).format(dateFormats.formatDateTimeFull);
};

export const _formatTimestampFullDate = (timestamp: any) => {
    const date = new Date(timestamp.seconds * 1000);
    return dayjs(date).format(dateFormats.formatDateTimeFull);
};

// return date in format 'DD. MM. YYYY HH:mm'
export const formatTimestampFullDate = (timestamp: Timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return dayjs(date).format(dateFormats.formatDateTimeFull);
};
