import { create } from 'zustand';
import IUsersState from '@/interfaces/UsersState';
import { IUserData } from '@/interfaces/UserData';
import {
    collection,
    doc,
    endAt,
    getDocs,
    orderBy,
    query,
    setDoc,
    startAt,
} from 'firebase/firestore';
import { firestore as db, firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { toast } from 'react-toastify';

const useUsersStore = create<IUsersState>((set) => ({
    users: [],
    filteredUsers: [],
    selectedUser: null,
    isFetchingUsers: false,
    isFetchingFilteredUsers: false,
    isUpdatingUser: false,

    fetchUsers: async () => {
        set({ isFetchingUsers: true });
        try {
            const usersCollectionRef = collection(
                firestore,
                FirestoreCollections.USERS
            );

            const querySnapshot = await getDocs(usersCollectionRef);
            const usersData: IUserData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IUserData[];

            set({ users: usersData });
        } catch (error) {
            console.error(error);
            toast.error('Error fetching data');
        } finally {
            set({ isFetchingUsers: false });
        }
    },

    fetchFilteredUsers: async (filter: { field: string; value: string }) => {
        set({ isFetchingFilteredUsers: true });
        try {
            const clientsCollectionRef = collection(
                db,
                FirestoreCollections.USERS
            );

            const clientsQuery = query(
                clientsCollectionRef,
                orderBy(filter.field),
                startAt(filter.value),
                endAt(filter.value + '\uf8ff')
            );

            const querySnapshot = await getDocs(clientsQuery);

            const filteredUsers: IUserData[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data() as IUserData;
                filteredUsers.push({ ...data, id: doc.id });
            });

            set({ filteredUsers });
            if (filteredUsers.length === 0) {
                toast.info(
                    `Klient s ${filter.field} obsahující '${filter.value}' nebyl nalezen.`
                );
            }
        } catch (error) {
            console.error(
                `Chyba při načítání klientů podle ${filter.field}:`,
                error
            );
            toast.error('Chyba při načítání klientů!');
        } finally {
            set({ isFetchingFilteredUsers: false });
        }
    },

    setSelectedUser: (user: IUserData | null) => {
        set({ selectedUser: user });
    },

    updateSelectedUser: (updatedUserData: Partial<IUserData>) => {
        set((state) => {
            if (state.selectedUser) {
                return {
                    selectedUser: {
                        ...state.selectedUser,
                        ...updatedUserData,
                        id: state.selectedUser.id,
                        address: {
                            street:
                                updatedUserData.address?.street ||
                                state.selectedUser.address?.street,
                            city:
                                updatedUserData.address?.city ||
                                state.selectedUser.address?.city,
                            zip:
                                updatedUserData.address?.zip ||
                                state.selectedUser.address?.zip,
                        },
                    },
                };
            }
            return state;
        });
    },

    updateUser: async (updatedUser: Partial<IUserData>) => {
        set({ isUpdatingUser: true });
        try {
            if (!updatedUser.id) {
                throw new Error('Chybí ID uživatele pro aktualizaci.');
            }

            const userDocRef = doc(
                db,
                FirestoreCollections.USERS,
                updatedUser.id
            );

            await setDoc(userDocRef, updatedUser, { merge: true });
            toast.success('Uživatel úspěšně aktualizován!');

            await useUsersStore.getState().fetchUsers();
        } catch (error) {
            console.error('Chyba při aktualizaci uživatele:', error);
            toast.error('Chyba při aktualizaci uživatele!');
        } finally {
            set({ isUpdatingUser: false });
        }
    },
}));

export default useUsersStore;
