import AppointmentStatus from '@/enums/AppointmentStatus';
import { ICalendarEvent } from '@/interfaces/CalendarEvent';

export interface IAppointment extends ICalendarEvent {
    id?: string;
    clientId: string;
    clientFirstName: string;
    clientLastName: string;
    doctorId: string;
    serviceId: string;
    serviceName: string;
    status: AppointmentStatus;
    notes?: string;
}
