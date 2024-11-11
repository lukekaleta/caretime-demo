import { useMemo } from 'react';
import ReservationStatus from '@/enums/ReservationStatus';
import {
    mdiAccountCancel,
    mdiCheck,
    mdiCheckAll,
    mdiClose,
    mdiSendClock,
} from '@mdi/js';
import { theme } from '@/theme/index';

interface StatusConfig {
    color: string;
    icon: string;
    label: string;
}

const useReservationStatus = (status: ReservationStatus): StatusConfig => {
    return useMemo(() => {
        switch (status) {
            case ReservationStatus.pending:
                return {
                    color: theme.palette.grey[600],
                    icon: mdiSendClock,
                    label: 'Pending',
                };
            case ReservationStatus.cancelled:
                return {
                    color: 'warning',
                    icon: mdiClose,
                    label: 'Canceled',
                };
            case ReservationStatus.attempted:
                return {
                    color: 'success',
                    icon: mdiCheckAll,
                    label: 'Attempt',
                };
            case ReservationStatus.missed:
                return {
                    color: 'error',
                    icon: mdiAccountCancel,
                    label: 'Missed',
                };
            default:
                return {
                    color: 'success',
                    icon: mdiCheck,
                    label: 'Confirmed',
                };
        }
    }, [status]);
};

export default useReservationStatus;
