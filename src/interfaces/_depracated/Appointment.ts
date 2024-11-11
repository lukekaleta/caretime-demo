export interface Appointment {
    id: string;
    clientId: string;
    clientData: any; // TODO: Typing
    procedureId: string;
    procedureData: any; // TODO: Typing
    start: Date;
    end: Date;
    notes?: string;
    status: 'scheduled' | 'completed' | 'cancelled';
}
