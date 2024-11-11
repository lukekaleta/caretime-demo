import { Timestamp } from "firebase/firestore";

export interface IService {
    id?: string;
    userId: string;
    name: string;
    description: string;
    price: number;
    defaultDuration: number;
    days: number[];
    startTime?: Timestamp | null;
    endTime?: Timestamp | null;
}
