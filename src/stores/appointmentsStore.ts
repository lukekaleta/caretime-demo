import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IAppointment } from '@/interfaces/Appointment';
import { IAppointmentsState } from '@/interfaces/AppointmentsState';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useAppointmentsStore = create<IAppointmentsState>((set) => ({
    isFetchingAppointments: false,
    isFetchingClientAppointments: false,
    isCreatingAppointment: false,
    appointments: [],

    fetchAppointments: async (
        doctorId: string,
        idType: 'doctorId' | 'clientId',
        selectedDate?: Date
    ) => {
        set({ isFetchingAppointments: true });

        try {
            const appointmentsCollectionRef = collection(
                firestore,
                FirestoreCollections.APPOINTMENTS
            );
            let appointmentsQuery;

            if (selectedDate) {
                const startOfDay = new Date(selectedDate.setHours(0, 0, 0, 0));
                const endOfDay = new Date(
                    selectedDate.setHours(23, 59, 59, 999)
                );

                appointmentsQuery = query(
                    appointmentsCollectionRef,
                    where(idType, '==', doctorId),
                    where('start', '>=', startOfDay),
                    where('end', '<=', endOfDay)
                );
            } else {
                appointmentsQuery = query(
                    appointmentsCollectionRef,
                    where(idType, '==', doctorId)
                );
            }

            const querySnapshot = await getDocs(appointmentsQuery);

            const appointments = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as IAppointment),
            }));

            set({ appointments });
        } catch (error) {
            console.error(error);
            toast.error('Chyba při načítání detailů rezervací.');
        } finally {
            set({ isFetchingAppointments: false });
        }
    },

    fetchClientAppointments: async (clientId: string) => {
        set({ isFetchingClientAppointments: true, appointments: [] });

        try {
            const appointmentsCollectionRef = collection(
                firestore,
                FirestoreCollections.APPOINTMENTS
            );

            const appointmentsQuery = query(
                appointmentsCollectionRef,
                where('clientId', '==', clientId)
            );

            const querySnapshot = await getDocs(appointmentsQuery);

            const clientAppointments = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...(doc.data() as IAppointment),
            }));

            set({ appointments: clientAppointments });
        } catch (error) {
            console.error('Chyba při načítání rezervací klienta:', error);
            toast.error('Chyba při načítání rezervací klienta.');
        } finally {
            set({ isFetchingAppointments: false });
        }
    },

    createAppointment: async (appointmentData: IAppointment) => {
        set({ isFetchingAppointments: true });

        try {
            const appointmentsCollectionRef = collection(
                firestore,
                FirestoreCollections.APPOINTMENTS
            );

            await addDoc(appointmentsCollectionRef, appointmentData);
            toast.success('Rezervace byla úspěšně vytvořena.');
        } catch (error) {
            console.error('Chyba při vytváření rezervace: ', error);
            toast.error('Chyba při vytváření rezervace.');
        } finally {
            set({ isFetchingAppointments: false });
        }
    },
}));

export default useAppointmentsStore;
