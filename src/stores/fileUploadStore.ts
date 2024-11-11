import { create } from 'zustand';
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { auth, firestore, storage } from '@/api/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FirebaseStoragePaths } from '@/enums/FirebaseStoragePaths';
import { FirestoreCollections } from '@/enums/FirestoreCollections';

interface FileUploadState {
    selectedFile: File | null;
    profilePicture: string | null;
    loading: boolean;
    uploadProgress: number;
    setSelectedFile: (file: File | null) => void;
    setAvatarUrl: (url: string | null) => void;
    uploadAvatar: (file: File) => Promise<void>;
    removeAvatar: () => Promise<void>;
}

const useFileUploadStore = create<FileUploadState>((set) => ({
    selectedFile: null,
    profilePicture: null,
    loading: false,
    uploadProgress: 0,

    setSelectedFile: (file: File | null) => set({ selectedFile: file }),

    setAvatarUrl: (url: string | null) => set({ profilePicture: url }),

    uploadAvatar: async (file: File) => {
        const maxFileSize = 1024 * 1024; // 1 MB v bytech

        if (file.size > maxFileSize) {
            toast.error('Maximální velikost souboru je 1 MB.');
            return;
        }

        set({ loading: true });
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Uživatel není přihlášen.');
            }

            const storageRef = ref(
                storage,
                `${FirebaseStoragePaths.AVATARS}/${user.uid}/${file.name}`
            );
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    set({ uploadProgress: progress });
                },
                (error) => {
                    toast.error('Chyba při nahrávání souboru.');
                    set({ loading: false });
                },
                async () => {
                    const downloadUrl = await getDownloadURL(
                        uploadTask.snapshot.ref
                    );

                    const userDocRef = doc(
                        firestore,
                        FirestoreCollections.USERS,
                        user.uid
                    );
                    await updateDoc(userDocRef, {
                        profilePicture: downloadUrl,
                    });

                    set({ profilePicture: downloadUrl });
                    toast.success('Avatar byl úspěšně nahrán.');
                    set({ loading: false, selectedFile: null });
                }
            );
        } catch (error) {
            toast.error('Nahrávání avatara se nezdařilo.');
            set({ loading: false });
        }
    },

    removeAvatar: async () => {
        set({ loading: true });
        try {
            const user = auth.currentUser;
            if (!user) {
                throw new Error('Uživatel není přihlášen.');
            }

            const avatarRef = ref(
                storage,
                `${FirebaseStoragePaths.AVATARS}/${user.uid}/avatar.jpg`
            );

            await deleteObject(avatarRef);

            const userDocRef = doc(
                firestore,
                FirestoreCollections.USERS,
                user.uid
            );

            await updateDoc(userDocRef, {
                profilePicture: null,
            });

            set({ profilePicture: null });
            toast.success('Profile picture was removed');
        } catch (error) {
            toast.error('Error with removing profile picture');
        } finally {
            set({ loading: false });
        }
    },
}));

export default useFileUploadStore;
