import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IService } from '@/interfaces/Service';
import { IServicesState } from '@/interfaces/ServicesState';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    Timestamp,
    where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useServicesStore = create<IServicesState>((set) => ({
    selectedService: null,
    services: [],
    isFetchingServices: false,
    isAddingService: false,
    isUpdatedService: false,
    isDeletingService: false,

    setSelectedService: (service) => set({ selectedService: service }),

    fetchServices: async (userId: string) => {
        set({ isFetchingServices: true, services: [] });
        try {
            const servicesCollectionRef = collection(
                firestore,
                FirestoreCollections.SERVICES
            );
            const servicesQuery = query(
                servicesCollectionRef,
                where('userId', '==', userId)
            );
            const querySnapshot = await getDocs(servicesQuery);

            const services: IService[] = [];

            querySnapshot.forEach((doc) => {
                const data = doc.data();
                services.push({
                    id: doc.id,
                    ...data,
                } as IService);
            });

            if (services.length > 0) {
                set({ services });
            } else {
                toast.info('Žádné služby nenalezeny pro tohoto lékaře.');
            }
        } catch (error) {
            console.error('Chyba při načítání služby:', error);
            toast.error('Chyba při načítání služby!');
        } finally {
            set({ isFetchingServices: false });
        }
    },

    addService: async (newService: IService, doctorId: string) => {
        set({ isAddingService: true });

        try {
            const servicesCollectionRef = collection(
                firestore,
                FirestoreCollections.SERVICES
            );

            // Konverze časových údajů na Firestore Timestamp
            const startTime = newService.startTime
                ? Timestamp.fromDate(newService.startTime.toDate())
                : null;
            const endTime = newService.endTime
                ? Timestamp.fromDate(newService.endTime.toDate())
                : null;

            // Vytvoření služby s převedenými hodnotami
            const serviceData = {
                ...newService,
                userId: doctorId,
                startTime,
                endTime,
            };

            const serviceDocRef = await addDoc(
                servicesCollectionRef,
                serviceData
            );

            toast.success('Služba byla úspěšně přidána!');

            set((state) => ({
                services: [
                    ...state.services,
                    { ...newService, id: serviceDocRef.id, startTime, endTime },
                ],
            }));
        } catch (error) {
            console.error('Chyba při přidávání služby:', error);
            toast.error('Chyba při přidávání služby!');
        } finally {
            set({ isAddingService: false });
        }
    },

    updateService: async (
        id: string,
        updatedService: Partial<IService>,
        doctorId: string
    ) => {
        set({ isUpdatedService: true });

        console.log(updatedService);

        try {
            const serviceDocRef = doc(
                firestore,
                FirestoreCollections.SERVICES,
                id
            );
            const serviceDoc = await getDoc(serviceDocRef);

            if (serviceDoc.exists()) {
                const serviceData = serviceDoc.data() as IService;

                if (serviceData.userId === doctorId) {
                    const filteredServiceData = Object.fromEntries(
                        Object.entries(updatedService).filter(
                            ([_, value]) => value !== undefined
                        )
                    );

                    await setDoc(serviceDocRef, filteredServiceData, {
                        merge: true,
                    });

                    toast.success('Služba byla úspěšně aktualizována!');

                    set((state) => ({
                        services: state.services.map((service) =>
                            service.id === id
                                ? { ...service, ...filteredServiceData }
                                : service
                        ),
                    }));
                } else {
                    toast.error('Nemáte oprávnění upravit tuto službu.');
                }
            } else {
                toast.error('Služba nenalezena.');
            }
        } catch (error) {
            console.error('Chyba při aktualizaci služby:', error);
            toast.error('Chyba při aktualizaci služby!');
        } finally {
            set({ isUpdatedService: false });
        }
    },

    deleteService: async (id: string, doctorId: string) => {
        set({ isDeletingService: true });

        try {
            const serviceDocRef = doc(
                firestore,
                FirestoreCollections.SERVICES,
                id
            );
            const serviceDoc = await getDoc(serviceDocRef);

            if (serviceDoc.exists()) {
                const serviceData = serviceDoc.data() as IService;

                if (serviceData.userId === doctorId) {
                    await deleteDoc(serviceDocRef);
                    toast.success('Služba byla úspěšně odstraněna!');

                    set((state) => ({
                        services: state.services.filter(
                            (service) => service.id !== id
                        ),
                    }));
                } else {
                    toast.error('Nemáte oprávnění odstranit tuto službu.');
                }
            } else {
                toast.error('Služba nenalezena.');
            }
        } catch (error) {
            console.error('Chyba při mazání služby:', error);
            toast.error('Chyba při mazání služby!');
        } finally {
            set({ isDeletingService: false });
        }
    },
}));

export default useServicesStore;
