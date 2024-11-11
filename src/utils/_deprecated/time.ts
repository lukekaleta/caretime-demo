import { IAppointment } from '@/interfaces/Appointment';
import dayjs, { Dayjs } from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Timestamp } from 'firebase/firestore';

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

export const convertTimestamp = (timestamp: Timestamp) => {
    return timestamp ? dayjs(timestamp.toDate()) : undefined;
};

export const convertToTimestamp = (time: Dayjs | null): Timestamp | null => {
    return time ? Timestamp.fromDate(time.toDate()) : null;
};

export const convertDayjsToTimestamp = (time: any): Timestamp | null => {
    return time ? Timestamp.fromDate(time.toDate()) : null;
};

export const convertTimestampToDayjs = (
    timestamp: Timestamp | null
): dayjs.Dayjs | undefined => {
    return timestamp ? dayjs(timestamp.toDate()) : undefined;
};

export const getTimestampRelativeTime = (timestamp: Timestamp) => {
    return dayjs(timestamp.toDate()).fromNow();
};

export const convertToFirestoreTimestamp = (date: Date): Timestamp => {
    return Timestamp.fromMillis(date.getTime());
};

export const generateTimeSlots = (
    duration: number,
    startTime: dayjs.Dayjs,
    endTime: dayjs.Dayjs,
    appointments: IAppointment[]
): string[] => {
    const timeSlots: string[] = [];
    let currentTime = startTime;

    const isTimeSlotAvailable = (
        slotStart: dayjs.Dayjs,
        slotEnd: dayjs.Dayjs
    ): boolean => {
        return !appointments.some((appointment) => {
            const appointmentStart = dayjs(appointment.start?.toDate());
            const appointmentEnd = dayjs(appointment.end?.toDate());

            return (
                slotStart.isBetween(
                    appointmentStart,
                    appointmentEnd,
                    null,
                    '[)'
                ) ||
                slotEnd.isBetween(
                    appointmentStart,
                    appointmentEnd,
                    null,
                    '(]'
                ) ||
                slotStart.isSame(appointmentStart) ||
                slotEnd.isSame(appointmentEnd)
            );
        });
    };

    while (currentTime.isBefore(endTime)) {
        const slotEnd = currentTime.add(duration, 'minute');
        const formattedTime = currentTime.format('HH:mm');

        if (isTimeSlotAvailable(currentTime, slotEnd)) {
            timeSlots.push(formattedTime);
        }

        currentTime = currentTime.add(duration, 'minute');
    }

    return timeSlots;
};
