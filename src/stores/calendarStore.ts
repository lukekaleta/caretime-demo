import { firestore as db } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IAppointment } from '@/interfaces/Appointment';
import { ICalendarState } from '@/interfaces/CalendarState';
import { convertToFirestoreTimestamp } from '@/utils/_deprecated/time';
import { calculateDateRange } from '@/utils/calendar';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { create } from 'zustand';

const useCalendarStore = create<ICalendarState>((set, get) => ({
    events: [],
    loading: false,
    selectedUserId: null,
    selectedDay: new Date(),
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    currentView: 'dayGridMonth',

    setSelectedUserId: (userId) => set({ selectedUserId: userId }),
    setSelectedDay: (day) => set({ selectedDay: day }),
    setSelectedMonth: (month) => set({ selectedMonth: month }),
    setSelectedYear: (year) => set({ selectedYear: year }),
    setCurrentView: (view) => set({ currentView: view }),

    fetchEvents: async (userId) => {
        set({ loading: true });

        const { selectedMonth, selectedYear, selectedDay, currentView } = get();

        try {
            const { start, end } = calculateDateRange(
                currentView,
                selectedDay,
                selectedMonth,
                selectedYear
            );

            const startTimestamp = convertToFirestoreTimestamp(start);
            const endTimestamp = convertToFirestoreTimestamp(end);

            const q = query(
                collection(db, FirestoreCollections.APPOINTMENTS),
                where('start', '>=', startTimestamp),
                where('end', '<=', endTimestamp),
                where('clientId', '==', userId)
            );

            const snapshot = await getDocs(q);

            const eventsData = snapshot.docs.map(
                (doc) =>
                    ({
                        ...doc.data(),
                        id: doc.id,
                        start: doc.data().start.toDate(),
                        end: doc.data().end.toDate(),
                    }) as IAppointment
            );

            set({ events: eventsData, loading: false });
        } catch (error) {
            console.error('Error fetching events:', error);
            set({ loading: false });
        }
    },
}));

export default useCalendarStore;
