import { Timestamp } from 'firebase/firestore';

export interface ICalendarEvent {
    createdAt: Timestamp | null;
    start: Timestamp | null;
    end: Timestamp | null;
}
