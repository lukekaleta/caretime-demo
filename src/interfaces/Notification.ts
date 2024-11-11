import { NotificationStatus } from '@/enums/NotificationStatus';
import { Timestamp } from 'firebase/firestore';

export interface INotification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: NotificationStatus;
    isRead: boolean;
    createdAt: Timestamp;
    actionLink?: string;
}
