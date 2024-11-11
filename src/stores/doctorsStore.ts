import { create } from 'zustand';
import { IDoctorsState } from '@/interfaces/DoctorsState';
import { toast } from 'react-toastify';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IDoctor } from '@/interfaces/Doctor';

const useDoctorsStore = create<IDoctorsState>((set) => ({
    isFetchingDoctors: false,
    doctors: [],

    fetchDoctors: async () => {
        set({ isFetchingDoctors: true });

        try {
            const doctorsCollectionRef = collection(
                firestore,
                FirestoreCollections.USERS // Doctors are in same collection as users
            );
            const doctorsQuery = query(
                doctorsCollectionRef,
                where('roleId', '==', 'doctor')
            );

            const querySnapshot = await getDocs(doctorsQuery);
            const doctors: IDoctor[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data() as IDoctor;
                doctors.push({ ...data, id: doc.id });
            });

            set({ doctors });
        } catch (error) {
            console.error(error);
            toast.error('Error fetching doctors');
        } finally {
            set({ isFetchingDoctors: false });
        }
    },
}));

export default useDoctorsStore;
