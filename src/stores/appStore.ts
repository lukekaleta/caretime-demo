import { create } from 'zustand';

interface AppState {
    userDrawer: boolean;
    setUserDrawer: (isOpen: boolean) => void;
}

const useAppStore = create<AppState>((set) => ({
    userDrawer: false,

    setUserDrawer: (isOpen: boolean) => set({ userDrawer: isOpen }),
}));

export default useAppStore;
