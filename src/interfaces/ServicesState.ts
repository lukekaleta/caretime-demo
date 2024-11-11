import { IService } from '@/interfaces/Service';

export interface IServicesState {
    services: IService[];
    selectedService: IService | null;

    isFetchingServices: boolean;
    isAddingService: boolean;
    isUpdatedService: boolean;
    isDeletingService: boolean;

    setSelectedService: (procedure: IService | null) => void;
    fetchServices: (id: string) => Promise<void>;
    addService: (newService: IService, doctorId: string) => Promise<void>;
    updateService: (
        id: string,
        updatedService: Partial<IService>,
        doctorId: string
    ) => Promise<void>;
    deleteService: (id: string, doctorId: string) => Promise<void>;
}
