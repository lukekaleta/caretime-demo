import UserStatus from '@/enums/UserStatus';
import { IOrganization } from '@/interfaces/Organization';
import { IPerson } from '@/interfaces/Person';
import { Timestamp } from 'firebase/firestore';

export interface IDoctor extends IPerson {
    id?: string;
    profilePicture?: string;
    status: UserStatus;
    registrationDate: Date;
    organization?: IOrganization;
    specialization: string;
    servicesCollectionId?: string;
    availableDays: number[];
    workingHours: {
        [day: number]: {
            startTime: Timestamp | null;
            endTime: Timestamp | null;
        };
    };
}
