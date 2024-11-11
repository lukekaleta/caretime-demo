import { IClient } from '@/interfaces/Client';

export interface IClientState {
    clients: IClient[];
    clientDetail: IClient | null;
    selectedClient: IClient | null;

    isFetchingClients: boolean;
    isFetchingClientDetails: boolean;
    isAddingClient: boolean;
    isAddingClientByUser: boolean;
    isUpdatingClient: boolean;

    fetchClients: () => Promise<void>;
    fetchClientDetail: (id: string) => Promise<void>;
    selectClient: (data: IClient) => void;
    addClient: (data: Partial<IClient>) => Promise<void>;
    addClientByUser: (data: Partial<IClient>) => Promise<void>;
    updateClient: (clientId: string, data: Partial<IClient>) => Promise<void>;
}
