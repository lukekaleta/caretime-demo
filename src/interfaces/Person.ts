import { DocumentData, DocumentReference } from '@firebase/firestore';
import Gender from '@/enums/Gender';
import { IAddress } from '@/interfaces/Address';

export interface IPerson {
    id?: string;
    titleBefore?: string;
    firstName: string;
    lastName: string;
    titleAfter?: string;
    birthNumber: string;
    gender: Gender;
    email: string;
    phoneNumber?: string;
    address?: IAddress;
    roleReference: DocumentReference<DocumentData, DocumentData>;
    permissions?: string[];
    roleId: string;
}
