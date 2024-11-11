import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { IRoleData } from '@/interfaces/Role';
import { IUserData } from '@/interfaces/UserData';
import IUserState from '@/interfaces/UserState';
import { DocumentReference } from '@firebase/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const useUserStore = create<IUserState>((set, get) => ({
    isFetchingUserData: false,
    isUpdatingUserData: false,
    isUpdatingUserRole: false,
    isDeactivatingUser: false,
    isActivatingUser: false,

    fetchUserData: async (uid: string) => {
        set({ isFetchingUserData: true });

        try {
            const userDocRef = doc(firestore, FirestoreCollections.USERS, uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                throw new Error('User not found');
            }

            const userData = userDoc.data() as IUserData;

            if (userData.roleReference) {
                const roleDoc = await getDoc(
                    userData.roleReference as DocumentReference
                );

                if (!roleDoc.exists()) {
                    throw new Error('Role not found');
                }

                const roleData = roleDoc.data() as IUserData;
                set({
                    userData: {
                        ...userData,
                        permissions: roleData.permissions,
                    },
                });
            } else {
                set({ userData: { ...userData, permissions: [] } });
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            toast.error('User data could not be retrieved.');
        } finally {
            set({ isFetchingUserData: false });
        }
    },

    hasPermission: (permission: string) => {
        const { userData } = get();
        if (userData?.permissions) {
            return userData.permissions.includes(permission) || false;
        }
    },

    updateUserData: async (uid: string, updatedData: Partial<IUserData>) => {
        set({ isUpdatingUserData: true });

        try {
            const userDocRef = doc(firestore, FirestoreCollections.USERS, uid);
            await setDoc(userDocRef, updatedData, { merge: true });
            const state = get();

            if (state.userData) {
                set({
                    userData: {
                        ...state.userData,
                        ...updatedData,
                    },
                });
            }

            toast.success('User updated successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Error updating user data');
        } finally {
            set({ isUpdatingUserData: false });
        }
    },
    updateUserRole: async (uid: string, roleId: string) => {
        set({ isUpdatingUserRole: true });

        try {
            const roleRef = doc(firestore, FirestoreCollections.ROLES, roleId);
            const roleDoc = await getDoc(roleRef);
            const roleData = roleDoc.data() as IRoleData;

            const userDocRef = doc(firestore, FirestoreCollections.USERS, uid);
            await setDoc(
                userDocRef,
                {
                    roleId: roleData.id,
                    roleReference: roleRef,
                },
                { merge: true }
            );
            toast.success('User role updated successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Error updating user role');
        } finally {
            set({ isUpdatingUserRole: false });
        }
    },
    deactivateUser: async (uid: string) => {
        set({ isDeactivatingUser: true });

        try {
            const userDocRef = doc(firestore, FirestoreCollections.USERS, uid);
            await setDoc(userDocRef, { isActive: false }, { merge: true });
            const state = get();

            if (state.userData) {
                set({
                    userData: {
                        ...state.userData,
                        isActive: false,
                    },
                });
            }

            toast.success('User deactivated successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Error deactivate user');
        } finally {
            set({ isDeactivatingUser: false });
        }
    },

    activateUser: async (uid: string) => {
        set({ isActivatingUser: true });

        try {
            const userDocRef = doc(firestore, FirestoreCollections.USERS, uid);
            await setDoc(userDocRef, { isActive: true }, { merge: true });
            const state = get();

            if (state.userData) {
                set({
                    userData: {
                        ...state.userData,
                        isActive: true,
                    },
                });
            }

            toast.success('User deactivated successfully.');
        } catch (error) {
            console.error(error);
            toast.error('Error deactivate user');
        } finally {
            set({ isActivatingUser: false });
        }
    },
}));

export default useUserStore;
