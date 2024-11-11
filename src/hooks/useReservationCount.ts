import AppointmentStatus from '@/enums/AppointmentStatus';
import { IAppointment } from '@/interfaces/Appointment';
import { useEffect, useState } from 'react';

interface Appointment extends Partial<IAppointment> {
    status: AppointmentStatus;
}

const useReservationCount = (reservations: Appointment[]) => {
    const [reservationCount, setReservationCount] = useState({
        missed: 0,
        cancelled: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
    });

    useEffect(() => {
        const countReservationsByStatus = (reservations: Appointment[]) => {
            return reservations.reduce(
                (acc, reservation) => {
                    acc[reservation.status] =
                        (acc[reservation.status] || 0) + 1;
                    return acc;
                },
                {
                    missed: 0,
                    cancelled: 0,
                    pending: 0,
                    confirmed: 0,
                    completed: 0,
                }
            );
        };

        const count = countReservationsByStatus(reservations);
        setReservationCount(count);
    }, [reservations]);

    return reservationCount;
};

export default useReservationCount;
