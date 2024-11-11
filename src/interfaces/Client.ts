import { DocumentData, DocumentReference } from '@firebase/firestore';
import UserStatus from '@/enums/UserStatus';
import ReservationStatus from '@/enums/ReservationStatus';
import Gender from '@/enums/Gender';
import { Note } from '@/interfaces//Note';
import { IPerson } from '@/interfaces/Person';

export interface IClient extends IPerson {
    id?: string;
    status: UserStatus;
    registrationDate: Date;
    notes?: Note[];
    createdBy?: DocumentReference<DocumentData, DocumentReference>;
}

interface DummyDataPerson {
    id: string;
    status: UserStatus;
    registrationDate: Date;
    notes?: Note[];
    createdBy?: DocumentReference<DocumentData, DocumentReference>;
    title?: string;
    firstName: string;
    lastName: string;
    birthNumber: string;
    gender: Gender;
    email: string;
    phoneNumber?: string;
    address?: {
        street?: string;
        city?: string;
        zip?: string;
    };
    roleReference: DocumentReference<DocumentData, DocumentReference>; // firestore/roles/user
    roleId: 'user';
    reservations?: {
        status: ReservationStatus;
        createdAt: Date;
        serviceProvider: DocumentReference<DocumentData, DocumentReference>; // firestore/users/[uD6qwGOFfpbI6ZnGFz4CHPNoKnM2, NAdTm1tqdHbCDGYUYMibsgPiPQq2]
        service: DocumentReference<DocumentData, DocumentReference>; // firestore/procedures/[FLqcg1wXJT9vpzADVVA0, dHa7eHGPPTW4cVSUstD1, eC3GMCwStylw6hm24eDW]
        startTime: Date;
        endTime: Date;
        updatedAt?: Date;
        notes?: string;
    };
}
