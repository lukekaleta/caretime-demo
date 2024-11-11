import { NotificationStatus } from '@/enums/NotificationStatus';
import { Unsubscribe } from 'firebase/firestore';
import { INotification } from './Notification';

export interface INotificationsState {
    notifications: INotification[];
    unreadNotificationCount: number;

    isFetchingNotifications: boolean;

    subscribeToNotifications: (userId: string) => Unsubscribe;
    markAsRead: (notificationId: string) => Promise<void>;
    addNotification: (
        userId: string,
        title: string,
        message: string,
        type: NotificationStatus,
        actionLink?: string
    ) => Promise<void>;
}
