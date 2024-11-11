import { DocumentData, DocumentReference } from '@firebase/firestore';

export interface Note {
    createdAt: Date;
    updatedBy: DocumentReference<DocumentData>;
    note: string;
}
