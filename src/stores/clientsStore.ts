import { firestore as db } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IClient } from '@/interfaces/Client';
import { IClientState } from '@/interfaces/ClientState';
import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    updateDoc,
    where,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useClientStore = create<IClientState>((set) => ({
    clients: [],
    clientDetail: null,
    selectedClient: null,
    isFetchingClients: false,
    isFetchingClientDetails: false,
    isAddingClient: false,
    isAddingClientByUser: false,
    isUpdatingClient: false,

    fetchClients: async () => {
        set({ isFetchingClients: true });
        try {
            const clientsCollectionRef = collection(
                db,
                FirestoreCollections.CLIENTS
            );
            const clientsQuery = query(clientsCollectionRef);
            const querySnapshot = await getDocs(clientsQuery);

            const clients: IClient[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as IClient;
                clients.push({ ...data, id: doc.id });
            });

            set({ clients });
        } catch (error) {
            console.error('Chyba při načítání klientů:', error);
            toast.error('Chyba při načítání klientů!');
        } finally {
            set({ isFetchingClients: false });
        }
    },

    fetchClientDetail: async (id: string) => {
        set({ isFetchingClientDetails: true });
        try {
            const clientDocRef = doc(db, FirestoreCollections.CLIENTS, id);
            const clientDoc = await getDoc(clientDocRef);

            if (clientDoc.exists()) {
                const client = {
                    ...clientDoc.data(),
                    id: clientDoc.id,
                } as IClient;

                set({ clientDetail: client });
            } else {
                set({ clientDetail: null });
                toast.error('Klient nenalezen.');
            }
        } catch (error) {
            console.error('Chyba při načítání detailu klienta:', error);
            toast.error('Chyba při načítání detailu klienta!');
        } finally {
            set({ isFetchingClientDetails: false });
        }
    },

    selectClient: (client: IClient) => {
        set({ selectedClient: client });
    },

    addClient: async (client: Partial<IClient>) => {
        set({ isAddingClient: true });

        try {
            const clientsCollectionRef = collection(
                db,
                FirestoreCollections.CLIENTS
            );
            const clientsQuery = query(
                clientsCollectionRef,
                where('birthNumber', '==', client.birthNumber)
            );
            const querySnapshot = await getDocs(clientsQuery);

            if (!querySnapshot.empty) {
                toast.warning('Klient s tímto rodným číslem již existuje.');
                return;
            }

            await addDoc(clientsCollectionRef, client);
            toast.success('Klient úspěšně přidán!');
        } catch (error) {
            console.error(error);
            toast.error('Chyba při přidávání klienta!');
        } finally {
            set({ isAddingClient: false });
        }
    },

    addClientByUser: async (client: Partial<IClient>) => {
        set({ isAddingClientByUser: true });

        try {
            const clientsCollectionRef = collection(
                db,
                FirestoreCollections.CLIENTS
            );

            if (client.id && client.birthNumber) {
                const userDocRef = doc(
                    db,
                    FirestoreCollections.USERS,
                    client.id
                );
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const clientData = userDoc.data() as IClient;
                    client = {
                        id: userDoc.id,
                        ...clientData,
                    };
                }

                const clientsQuery = query(
                    clientsCollectionRef,
                    where('birthNumber', '==', client.birthNumber)
                );
                const querySnapshot = await getDocs(clientsQuery);

                if (!querySnapshot.empty) {
                    toast.warning('Klient s tímto rodným číslem již existuje.');
                    return;
                }
            }

            const clientDocRef = doc(clientsCollectionRef, client.id);
            await setDoc(clientDocRef, client);
            toast.success('Klient úspěšně přidán!');
            await useClientStore.getState().fetchClients();
        } catch (error) {
            console.error('Chyba při přidávání klienta:', error);
            toast.error('Chyba při přidávání klienta!');
        } finally {
            set({ isAddingClientByUser: false });
        }
    },

    updateClient: async (clientId: string, updatedData: Partial<IClient>) => {
        set({ isUpdatingClient: true });
        try {
            if (!clientId) {
                toast.error('ID klienta je povinné pro aktualizaci.');
                return;
            }

            const clientDocRef = doc(
                db,
                FirestoreCollections.CLIENTS,
                clientId
            );
            const clientDoc = await getDoc(clientDocRef);

            if (!clientDoc.exists()) {
                toast.error('Klient nenalezen.');
                return;
            }

            await updateDoc(clientDocRef, updatedData);
            toast.success('Klient úspěšně aktualizován!');

            await useClientStore.getState().fetchClientDetail(clientId);
        } catch (error) {
            console.error('Chyba při aktualizaci klienta:', error);
            toast.error('Chyba při aktualizaci klienta!');
        } finally {
            set({ isUpdatingClient: false });
        }
    },
}));

export default useClientStore;
