import { create } from 'zustand';

interface DrawersState {
    addOrganizationDrawer: boolean;
    userDetailDrawer: boolean;
    procedureDetailDrawer: boolean;
    menuDrawer: boolean;

    setAddOrganizationDrawerOpen: (open: boolean) => void;
    setUserDetailDrawerOpen: (open: boolean) => void;
    setProcedureDetailDrawer: (open: boolean) => void;
    setMenuDrawer: (open: boolean) => void;
}

const useDrawersStore = create<DrawersState>((set) => ({
    addOrganizationDrawer: false,
    userDetailDrawer: false,
    procedureDetailDrawer: false,
    menuDrawer: false,

    setAddOrganizationDrawerOpen: (state) =>
        set({ addOrganizationDrawer: state }),
    setUserDetailDrawerOpen: (state) => set({ userDetailDrawer: state }),
    setProcedureDetailDrawer: (state) => set({ procedureDetailDrawer: state }),
    setMenuDrawer: (state) => set({ menuDrawer: state }),
}));

export default useDrawersStore;
