import { create } from 'zustand';
import { ReactNode } from 'react';

interface DialogState {
    isOpen: boolean;
    dialogTitle: string;
    dialogContent: ReactNode;
    confirmButtonText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
    openDialog: (
        title: string,
        content: ReactNode,
        onConfirm: () => void,
        confirmButtonText?: string,
        loading?: boolean,
        onCancel?: () => void
    ) => void;
    closeDialog: () => void;
}

const useDialogStore = create<DialogState>((set) => ({
    isOpen: false,
    dialogTitle: '',
    dialogContent: '',
    loading: false,
    confirmButtonText: undefined,
    onConfirm: () => {},
    onCancel: () => {},

    openDialog: (
        title,
        content,
        onConfirm,
        confirmButtonText,
        loading = false,
        onCancel
    ) =>
        set({
            isOpen: true,
            dialogTitle: title,
            dialogContent: content,
            onConfirm,
            confirmButtonText: confirmButtonText,
            loading,
            onCancel: onCancel || (() => set({ isOpen: false })),
        }),

    closeDialog: () => set({ isOpen: false, loading: false }),
}));

export default useDialogStore;
