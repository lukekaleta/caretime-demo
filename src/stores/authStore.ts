import { auth, firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import AuthState from '@/interfaces/AuthState';
import { IChangePassword } from '@/interfaces/ChangePassword';
import { IDeleteAccount } from '@/interfaces/DeleteAccount';
import { ILogin } from '@/interfaces/Login';
import { IRegister } from '@/interfaces/Register';
import { IResetPassword } from '@/interfaces/ResetPassword';
import { IRoleData } from '@/interfaces/Role';
import { IUserData } from '@/interfaces/UserData';
import { signOut } from '@firebase/auth';
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    onAuthStateChanged,
    reauthenticateWithCredential,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updatePassword,
    User,
} from 'firebase/auth';
import { deleteDoc, doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { create } from 'zustand';

const reauthenticateUser = async (currentPassword: string) => {
    const user = auth.currentUser;
    if (user && user.email) {
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );
        await reauthenticateWithCredential(user, credential);
    } else {
        toast.error('User is not logged in');
    }
};

const useAuthStore = create<AuthState>((set) => ({
    isLoggingIn: false,
    isLoggingOut: false,
    isRegistering: false,
    isRegistered: false,
    isResettingPassword: false,
    isChangingPassword: false,
    isDeletingPassword: false,
    isSendingVerificationEmail: false,
    isListenForAuthChanges: false,

    setUser: (user: User | undefined) => set({ user }),

    login: async (data: ILogin) => {
        set({ isLoggingIn: true });

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            const userAuth = userCredential.user;
            const userDocRef = doc(
                firestore,
                FirestoreCollections.USERS,
                userAuth.uid
            );
            const userDoc = await getDoc(userDocRef);
            if (!userDoc.exists()) {
                set({ isLoggingIn: false });
                toast.error('User account is not exist.');
                return;
            }

            const userData = userDoc.data() as IUserData;
            if (userData?.isActive === false) {
                toast.error(
                    'Your account has been deactivated, contact your doctor.'
                );
                set({ isLoggingIn: false, user: undefined });
                await signOut(auth);
                return;
            }

            set({ user: userAuth });
        } catch (error) {
            toast.error('Login error, please check your credentials.');
            console.error(error);
        } finally {
            set({ isLoggingIn: false });
        }
    },
    logout: async () => {
        set({ isLoggingOut: true });
        try {
            await signOut(auth);
            set({ user: undefined });
            toast.success('Successfully logged out!');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('User was not logging out. Please try it again!');
        } finally {
            set({ isLoggingOut: false });
        }
    },
    register: async (data: IRegister) => {
        set({ isRegistering: true });
        try {
            if (data.password) {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    data.email,
                    data.password
                );
                const userAuth = userCredential.user;

                const roleRef = doc(
                    firestore,
                    FirestoreCollections.ROLES,
                    'user'
                );
                const roleDoc = await getDoc(roleRef);
                const roleData = roleDoc.data() as IRoleData;

                const userDoc: IRegister = {
                    id: userAuth.uid,
                    isActive: true,
                    titleBefore: data.titleBefore,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    titleAfter: data.titleAfter,
                    birthNumber: data.birthNumber,
                    email: data.email,
                    gender: data.gender,
                    phoneNumber: data.phoneNumber,
                    roleReference: roleRef,
                    roleId: roleData.id,
                };

                await setDoc(
                    doc(firestore, FirestoreCollections.USERS, userAuth.uid),
                    userDoc
                );

                await signOut(auth);

                toast.success('Hooray! Registration was successfully.');
            } else {
                set({ isRegistering: false });
                toast.error('Problem with creating account, try it again.');
            }
        } catch (error) {
            toast.error('Register error, please check your credentials.');
            console.error(error);
        } finally {
            set({ isRegistering: false });
        }
    },

    resetPassword: async (data: IResetPassword) => {
        set({ isResettingPassword: true });

        try {
            await sendPasswordResetEmail(auth, data.email);
            toast.success('E-mail with link for resetting password was sent!');
        } catch (error) {
            toast.error('Reset password error, please try is again.');
            console.error(error);
        } finally {
            set({ isResettingPassword: false });
        }
    },
    changePassword: async (data: IChangePassword) => {
        set({ isChangingPassword: true });

        try {
            await reauthenticateUser(data.currentPassword);

            const authUser = auth.currentUser;
            if (authUser) {
                await updatePassword(authUser, data.newPassword);
                toast.success('Password changed successfully.');
            }
        } catch (error) {
            toast.error(
                'Change password error, please check your credentials.'
            );
            console.error(error);
        } finally {
            set({ isChangingPassword: false });
        }
    },
    deleteAccount: async (data: IDeleteAccount) => {
        set({ isDeletingPassword: true });

        try {
            await reauthenticateUser(data.currentPassword);
            const authUser = auth.currentUser;

            if (authUser) {
                await deleteDoc(
                    doc(firestore, FirestoreCollections.USERS, authUser.uid)
                );
                await authUser.delete();
                set({ user: undefined });
                toast.success('User was successfully deleted.');
            }
        } catch (error) {
            console.error(error);
            toast.error(
                'Delete password error, please check your credentials.'
            );
            console.error(error);
        } finally {
            set({ isDeletingPassword: false });
        }
    },

    sendVerificationEmail: async () => {
        set({ isSendingVerificationEmail: true });

        try {
            const authUser = auth.currentUser;
            if (authUser) {
                await sendEmailVerification(authUser);
                toast.success('Verification email sent.');
            }
        } catch (error) {
            toast.error(
                'Verification email sent, please check your credentials.'
            );
            console.error(error);
        } finally {
            set({ isSendingVerificationEmail: false });
        }
    },

    listenForAuthChanges: () => {
        set({ isListenForAuthChanges: true });

        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDocRef = doc(
                    firestore,
                    FirestoreCollections.USERS,
                    user.uid
                );

                try {
                    const unsubscribe = onSnapshot(
                        userDocRef,
                        (docSnapshot) => {
                            if (docSnapshot.exists()) {
                                const userData = docSnapshot.data();
                                set({
                                    user: { ...user, ...userData },
                                    isListenForAuthChanges: false,
                                });

                                if (user.emailVerified) {
                                    setDoc(
                                        userDocRef,
                                        { isEmailVerified: true },
                                        { merge: true }
                                    );
                                }
                            } else {
                                console.error(
                                    'Uživatel nenalezen ve Firestore.'
                                );
                                set({
                                    user: undefined,
                                    isListenForAuthChanges: false,
                                });
                            }
                        }
                    );

                    return unsubscribe;
                } catch (error) {
                    console.error('Chyba při načítání uživatele:', error);
                    set({ user: undefined, isListenForAuthChanges: false });
                }
            } else {
                set({ user: undefined, isListenForAuthChanges: false });
            }
        });
    },
}));

export default useAuthStore;
