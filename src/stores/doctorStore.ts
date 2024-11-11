import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IDoctor } from '@/interfaces/Doctor';
import { IDoctorState } from '@/interfaces/DoctorState';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useDoctorStore = create<IDoctorState>((set) => ({
    isFetchingDoctorDetail: false,
    isUpdatingDoctorDetail: false,
    doctorDetail: null,

    fetchDoctorDetail: async (doctorId: string) => {
        set({ isFetchingDoctorDetail: true });

        try {
            const doctorDocRef = doc(
                firestore,
                FirestoreCollections.USERS,
                doctorId
            );
            const doctorDoc = await getDoc(doctorDocRef);

            if (doctorDoc.exists()) {
                const doctorData = doctorDoc.data() as IDoctor;
                set({ doctorDetail: { id: doctorDoc.id, ...doctorData } });
            } else {
                toast.error('Doktor nenalezen.');
            }
        } catch (error) {
            console.error(error);
            toast.error('Chyba při načítání detailů doktora.');
        } finally {
            set({ isFetchingDoctorDetail: false });
        }
    },

    updateDoctorDetail: async (doctorId: string, updatedFields: Partial<IDoctor>) => {
        try {
            const doctorDocRef = doc(firestore, FirestoreCollections.USERS, doctorId);

            await updateDoc(doctorDocRef, updatedFields);

            set((state) => ({
                doctorDetail: state.doctorDetail
                    ? { ...state.doctorDetail, ...updatedFields }
                    : null,
            }));

            toast.success('Informace o lékaři byly úspěšně aktualizovány.');
        } catch (error) {
            console.error('Chyba při aktualizaci lékaře:', error);
            toast.error('Chyba při aktualizaci informací lékaře.');
        }
    },
}));

export default useDoctorStore;
