import { create } from 'zustand';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { toast } from 'react-toastify';
import { AppSettings } from '@/interfaces/_depracated/App';
import { defaultAppConfig } from '@/config/appConfig';

interface AppSettingsState {
    settings: AppSettings;
    loading: boolean;
    error: string | null;
    fetchSettings: () => Promise<void>;
    updateSettings: (updatedSettings: Partial<AppSettings>) => Promise<void>;
}

const useAppSettingsStore = create<AppSettingsState>((set) => ({
    settings: defaultAppConfig,
    loading: false,
    error: null,

    fetchSettings: async () => {
        set({ loading: true, error: null });
        try {
            const settingsDocRef = doc(
                firestore,
                FirestoreCollections.APP_SETTINGS,
                'appSettings'
            );
            const docSnapshot = await getDoc(settingsDocRef);

            const settingsData = docSnapshot.data() as AppSettings;
            set({ settings: settingsData, loading: false });
        } catch (error) {
            console.error('Chyba při načítání nastavení:', error);
            set({ error: 'Chyba při načítání nastavení', loading: false });
            toast.error('Chyba při načítání nastavení');
        }
    },

    updateSettings: async (updatedSettings: Partial<AppSettings>) => {
        set({ loading: true, error: null });
        try {
            const settingsDocRef = doc(
                firestore,
                FirestoreCollections.APP_SETTINGS,
                'appSettings'
            );
            const docSnapshot = await getDoc(settingsDocRef);
            const settingsData = docSnapshot.data() as AppSettings;

            const newSettings: AppSettings = {
                ...settingsData,
                ...updatedSettings,
            };

            await setDoc(settingsDocRef, newSettings);

            set({ settings: newSettings, loading: false });
            toast.success('Nastavení bylo úspěšně aktualizováno');
        } catch (error) {
            console.error('Chyba při aktualizaci nastavení:', error);
            set({ error: 'Chyba při aktualizaci nastavení', loading: false });
            toast.error('Chyba při aktualizaci nastavení');
        }
    },
}));

export default useAppSettingsStore;
