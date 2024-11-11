import { IAppointment } from './Appointment';

// src/interfaces/CalendarState.ts
export interface ICalendarState {
    events: IAppointment[];
    loading: boolean;
    selectedUserId: string | null;
    selectedDay: Date; // Typ Date pro vybraný den
    selectedMonth: number; // Měsíc (0-11)
    selectedYear: number; // Rok
    currentView: string; // Aktuální pohled (např. 'dayGridMonth', 'timeGridWeek', 'timeGridDay')

    // Metody pro aktualizaci stavu
    setSelectedUserId: (userId: string | null) => void;
    setSelectedDay: (day: Date) => void;
    setSelectedMonth: (month: number) => void;
    setSelectedYear: (year: number) => void;
    setCurrentView: (view: string) => void; // Metoda pro nastavení aktuálního pohledu

    fetchEvents: (userId: string) => Promise<void>;
}
