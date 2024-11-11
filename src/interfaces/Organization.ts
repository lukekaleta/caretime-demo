import { IDoctor } from '@/interfaces/Doctor';
import { IOpeningHours } from '@/interfaces/OpeningHours';

export interface IOrganization {
    id: string;
    default: boolean;
    name: string;
    phone: string;
    email: string;
    description: string;
    responsiblePerson?: IDoctor;
    openingHours?: IOpeningHours;
}
