import { create } from 'zustand';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    updateDoc,
} from 'firebase/firestore';
import { firestore as db } from '../api/firebase';
import { OrganizationsData } from '@/interfaces/_depracated/Organizations';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { toast } from 'react-toastify';

export interface OrganizationState {
    addOrganization: (organization: OrganizationsData) => void;
    updateOrganization: (
        id: string,
        updatedData: Partial<OrganizationsData>
    ) => void;
    deleteOrganization: (id: string) => void;
    organizationDrawer: boolean;
    selectedOrganization: OrganizationsData | null;
    selectOrganization: (organization: OrganizationsData) => void;
    organizations: OrganizationsData[];
    loading: boolean;
    error: string | null;
    setSelectedOrganization: (organization: OrganizationsData | null) => void;
    fetchOrganizations: () => Promise<void>;
    setOrganizationDrawer: (state: boolean) => void;
}

const useOrganizationStore = create<OrganizationState>((set) => ({
    selectedOrganization: null,
    organizationDrawer: false,
    organizations: [],
    loading: false,
    error: null,

    setOrganizationDrawer: (state: boolean) => {
        set({ organizationDrawer: state });
    },

    selectOrganization: (organization: OrganizationsData) => {
        set({ selectedOrganization: organization });
        toast.success(`Organizace: ${organization.name}`);
    },

    setSelectedOrganization: (organization) =>
        set({ selectedOrganization: organization }),

    fetchOrganizations: async () => {
        set({ loading: true, error: null });
        try {
            const organizationsCollectionRef = collection(
                db,
                FirestoreCollections.ORGANIZATIONS
            );
            const organizationsQuery = query(
                organizationsCollectionRef,
                orderBy('name')
            );
            const querySnapshot = await getDocs(organizationsQuery);

            const organizations: OrganizationsData[] = [];
            let defaultOrganization: OrganizationsData | null = null;

            querySnapshot.forEach((doc) => {
                const data = doc.data() as OrganizationsData;
                const organization = { ...data, id: doc.id };
                organizations.push(organization);

                if (organization.default) {
                    defaultOrganization = organization;
                }
            });

            set({ organizations, loading: false });

            if (defaultOrganization) {
                set({ selectedOrganization: defaultOrganization });
            } else if (organizations.length > 0) {
                set({ selectedOrganization: organizations[0] });
            }
        } catch (error) {
            toast.error('Chyba s načítáním organizací!');
            console.error('Error fetching organizations:', error);
            set({ error: 'Error fetching organizations', loading: false });
        }
    },

    addOrganization: async (newOrganization: OrganizationsData) => {
        try {
            const organizationsCollectionRef = collection(
                db,
                FirestoreCollections.ORGANIZATIONS
            );

            const docRef = await addDoc(
                organizationsCollectionRef,
                newOrganization
            );
            const addedOrganization = { ...newOrganization, id: docRef.id };

            toast.success('Organizace úspěšně přidána!');

            set((state) => ({
                organizations: [...state.organizations, addedOrganization],
            }));
        } catch (error) {
            toast.error('Chyba při přidávání organizace!');
            console.error('Error adding organization:', error);
        }
    },

    updateOrganization: async (
        id: string,
        updatedData: Partial<OrganizationsData>
    ) => {
        try {
            const organizationDocRef = doc(
                db,
                FirestoreCollections.ORGANIZATIONS,
                id
            );

            await updateDoc(organizationDocRef, updatedData);

            toast.success('Organizace úspěšně upravena!');

            set((state) => ({
                organizations: state.organizations.map((org) =>
                    org.id === id ? { ...org, ...updatedData } : org
                ),
            }));
        } catch (error) {
            toast.error('Chyba při úpravě organizace!');
            console.error('Error updating organization:', error);
        }
    },

    deleteOrganization: async (id: string) => {
        try {
            const organizationDocRef = doc(
                db,
                FirestoreCollections.ORGANIZATIONS,
                id
            );

            await deleteDoc(organizationDocRef);

            toast.success('Organizace úspěšně odstraněna!');

            set((state) => ({
                organizations: state.organizations.filter(
                    (org) => org.id !== id
                ),
            }));
        } catch (error) {
            toast.error('Chyba při odstraňování organizace!');
            console.error('Error deleting organization:', error);
        }
    },
}));

export default useOrganizationStore;
