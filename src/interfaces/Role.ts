import { Timestamp } from 'firebase/firestore';
import { Reference } from '@firebase/database-types';

export interface IRoleData {
    id: string;
    name: string;
    description?: string;
    permissions?: string[];
    isActive?: boolean;
    createdAt?: Timestamp;
    createdBy?: Reference;
    updatedAt?: Timestamp;
    updatedBy?: Reference;
}
