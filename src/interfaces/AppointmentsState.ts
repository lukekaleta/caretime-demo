import { IAppointment } from '@/interfaces/Appointment';

export interface IAppointmentsState {
    isFetchingAppointments: boolean;
    isFetchingClientAppointments: boolean;
    isCreatingAppointment: boolean;

    appointments: IAppointment[];

    fetchAppointments: (
        doctorId: string,
        idType: 'doctorId' | 'clientId',
        selectedDate?: Date
    ) => Promise<void>;
    fetchClientAppointments: (clientId: string) => Promise<void>;
    createAppointment: (appointmentData: IAppointment) => Promise<void>;
}
