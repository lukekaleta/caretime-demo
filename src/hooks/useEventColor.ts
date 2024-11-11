import AppointmentStatus from '@/enums/AppointmentStatus';
import { theme } from '@/theme/index';
import { useCallback } from 'react';

export const useEventColor = () => {
    const getEventColor = useCallback((status: AppointmentStatus) => {
        switch (status) {
            case AppointmentStatus.pending:
                return {
                    backgroundColor: theme.palette.warning.main,
                    textColor: '#ffffff',
                }; // orange
            case AppointmentStatus.confirmed:
                return {
                    backgroundColor: theme.palette.success.main,
                    textColor: '#ffffff',
                }; // green
            case AppointmentStatus.cancelled:
                return {
                    backgroundColor: theme.palette.error.main,
                    textColor: '#ffffff',
                }; // red
            case AppointmentStatus.completed:
                return {
                    backgroundColor: theme.palette.info.main,
                    textColor: '#ffffff',
                }; // blue
            case AppointmentStatus.missed:
                return {
                    backgroundColor: theme.palette.grey[500],
                    textColor: '#ffffff',
                }; // grey
            default:
                return {
                    backgroundColor: theme.palette.grey[700],
                    textColor: '#ffffff',
                }; // dark grey
        }
    }, []);

    return { getEventColor };
};
