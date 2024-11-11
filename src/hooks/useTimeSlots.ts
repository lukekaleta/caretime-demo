import { useMemo } from 'react';
import dayjs from 'dayjs';

const useTimeSlots = (
    slotLengthMinutes: string | number,
    startTime: string,
    endTime: string
) => {
    const slotLength = Number(slotLengthMinutes);
    const slots = useMemo(() => {
        const start = dayjs(startTime, 'HH:mm');
        const end = dayjs(endTime, 'HH:mm');
        let times = [];
        let current = start;

        while (current <= end) {
            times.push(current.format('HH:mm'));
            current = current.add(slotLength, 'minute');
        }

        return times;
    }, [slotLengthMinutes, startTime, endTime]);

    return slots;
};

export default useTimeSlots;
