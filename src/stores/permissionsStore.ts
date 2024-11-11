import { create } from 'zustand';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    setDoc,
} from 'firebase/firestore';
import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { PermissionData } from '@/interfaces/_depracated/Permissions';
import { toast } from 'react-toastify';

interface PermissionsState {
    permissions: PermissionData[];
    permissionDrawer: boolean;
    selectedPermission: PermissionData | null;
    loading: boolean;
    error: string | null;
    fetchPermissions: () => Promise<void>;
    addPermission: (newPermission: PermissionData) => Promise<void>;
    updatePermission: (
        permissionId: string,
        updatedPermission: Partial<PermissionData>
    ) => Promise<void>;
    deletePermission: (permissionId: string) => Promise<void>;
    setPermissionDrawer: (state: boolean) => void;
    setSelectedPermission: (permission: PermissionData | null) => void;
}

const usePermissionsStore = create<PermissionsState>((set) => ({
    permissions: [],
    permissionDrawer: false,
    selectedPermission: null,
    loading: false,
    error: null,

    setPermissionDrawer: (state: boolean) => {
        set({ permissionDrawer: state });
    },

    setSelectedPermission: (permission: PermissionData | null) => {
        set({ selectedPermission: permission });
    },

    fetchPermissions: async () => {
        set({ loading: true, error: null });
        try {
            const permissionsCollectionRef = collection(
                firestore,
                FirestoreCollections.PERMISSIONS
            );
            const querySnapshot = await getDocs(permissionsCollectionRef);
            const permissionsData: PermissionData[] = querySnapshot.docs.map(
                (doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })
            ) as PermissionData[];

            set({ permissions: permissionsData, loading: false });
        } catch (error) {
            set({ error: 'Chyba při načítání oprávnění', loading: false });
            toast.error('Chyba při načítání oprávnění');
        }
    },

    addPermission: async (newPermission: PermissionData) => {
        set({ loading: true, error: null });
        try {
            const permissionsCollectionRef = collection(
                firestore,
                FirestoreCollections.PERMISSIONS
            );
            await addDoc(permissionsCollectionRef, newPermission);
            toast.success('Nové oprávnění bylo úspěšně přidáno');
            await usePermissionsStore.getState().fetchPermissions();
        } catch (error) {
            console.error('Chyba při přidávání nového oprávnění:', error);
            toast.error('Chyba při přidávání nového oprávnění');
        }
    },

    updatePermission: async (
        permissionId: string,
        updatedPermission: Partial<PermissionData>
    ) => {
        set({ loading: true, error: null });
        try {
            const permissionDocRef = doc(
                firestore,
                FirestoreCollections.PERMISSIONS,
                permissionId
            );
            await setDoc(permissionDocRef, updatedPermission, { merge: true });

            set((state) => ({
                permissions: state.permissions.map((permission) =>
                    permission.id === permissionId
                        ? { ...permission, ...updatedPermission }
                        : permission
                ),
                loading: false,
            }));
            toast.success('Oprávnění bylo úspěšně upraveno');
        } catch (error) {
            set({
                error: 'Chyba při aktualizaci oprávnění',
                loading: false,
            });
            toast.error('Chyba při aktualizaci oprávnění');
        }
    },

    deletePermission: async (permissionId: string) => {
        set({ loading: true, error: null });
        try {
            const permissionDocRef = doc(
                firestore,
                FirestoreCollections.PERMISSIONS,
                permissionId
            );
            await deleteDoc(permissionDocRef);

            set((state) => ({
                permissions: state.permissions.filter(
                    (permission) => permission.id !== permissionId
                ),
                loading: false,
            }));
            toast.success('Oprávnění bylo úspěšně odstraněno');
        } catch (error) {
            set({
                error: 'Chyba při odstraňování oprávnění',
                loading: false,
            });
            toast.error('Chyba při odstraňování oprávnění');
        }
    },
}));

export default usePermissionsStore;
