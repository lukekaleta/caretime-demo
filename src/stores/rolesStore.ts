import { create } from 'zustand';
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    serverTimestamp,
    setDoc,
    updateDoc,
} from 'firebase/firestore';
import { auth, firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IRoleData } from '@/interfaces/Role';
import { toast } from 'react-toastify';

interface RolesState {
    roles: IRoleData[];
    activeRoles: IRoleData[];
    selectedRole: IRoleData | null;
    roleDrawer: boolean;
    loading: boolean;
    error: string | null;
    fetchRoles: () => Promise<void>;
    addRole: (newRole: IRoleData) => Promise<void>;
    updateRole: (
        roleId: string,
        updatedRole: Partial<IRoleData>
    ) => Promise<void>;
    deleteRole: (roleId: string) => Promise<void>;
    setRoleDrawer: (state: boolean) => void;
    setSelectedRole: (role: IRoleData | null) => void;
}

const useRolesStore = create<RolesState>((set) => ({
    roles: [],
    activeRoles: [],
    selectedRole: null,
    roleDrawer: false,
    loading: false,
    error: null,

    setRoleDrawer: (state: boolean) => {
        set({ roleDrawer: state });
    },

    setSelectedRole: (role: IRoleData | null) => {
        set({ selectedRole: role });
    },

    fetchRoles: async () => {
        set({ loading: true, error: null });
        try {
            const rolesCollectionRef = collection(
                firestore,
                FirestoreCollections.ROLES
            );
            const querySnapshot = await getDocs(rolesCollectionRef);
            const rolesData: IRoleData[] = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as IRoleData[];

            const activeRoles = rolesData.filter((r) => r.isActive);

            set({ roles: rolesData, activeRoles: activeRoles, loading: false });
        } catch (error) {
            set({ error: 'Chyba při načítání rolí uživatelů', loading: false });
            toast.error('Chyba při načítání rolí uživatelů');
        }
    },

    addRole: async (newRole: IRoleData) => {
        set({ loading: true, error: null });
        try {
            const roleDocRef = doc(
                firestore,
                FirestoreCollections.ROLES,
                newRole.id
            );

            const currentUser = auth.currentUser;
            const roleWithMetadata = {
                ...newRole,
                createdBy: currentUser?.email || 'Unknown User',
                createdAt: serverTimestamp(),
            };

            await setDoc(roleDocRef, roleWithMetadata);
            toast.success('Nová role byla úspěšně přidána');
            await useRolesStore.getState().fetchRoles();
        } catch (error) {
            set({
                error: 'Chyba při přidávání nové role uživatele',
                loading: false,
            });
            toast.error('Chyba při přidávání nové role uživatele');
        }
    },

    updateRole: async (roleId: string, updatedRole: Partial<IRoleData>) => {
        set({ loading: true, error: null });
        try {
            const roleDocRef = doc(
                firestore,
                FirestoreCollections.ROLES,
                roleId
            );

            const currentUser = auth.currentUser;
            const roleWithUpdateMetadata = {
                ...updatedRole,
                updatedBy: `${currentUser?.email}` || 'Unknown User',
                updatedAt: serverTimestamp(),
            };

            await updateDoc(roleDocRef, roleWithUpdateMetadata);
            toast.success('Role byla úspěšně upravena');
            await useRolesStore.getState().fetchRoles();
        } catch (error) {
            set({
                error: 'Chyba při aktualizaci role uživatele',
                loading: false,
            });
            toast.error('Chyba při aktualizaci role uživatele');
        }
    },

    deleteRole: async (roleId: string) => {
        set({ loading: true, error: null });
        try {
            const roleDocRef = doc(
                firestore,
                FirestoreCollections.ROLES,
                roleId
            );
            await deleteDoc(roleDocRef);
            toast.success('Role byla úspěšně odstraněna');
            await useRolesStore.getState().fetchRoles();
        } catch (error) {
            set({
                error: 'Chyba při odstraňování role uživatele',
                loading: false,
            });
            toast.error('Chyba při odstraňování role uživatele');
        }
    },
}));

export default useRolesStore;
