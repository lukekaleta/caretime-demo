import { firestore } from '@/api/firebase';
import { FirestoreCollections } from '@/enums/FirestoreCollections';
import { NotificationStatus } from '@/enums/NotificationStatus';
import { INotification } from '@/interfaces/Notification';
import { INotificationsState } from '@/interfaces/NotificationsState';
import {
    addDoc,
    collection,
    doc,
    getDocs,
    limit,
    onSnapshot,
    orderBy,
    query,
    Timestamp,
    updateDoc,
    where,
} from 'firebase/firestore';
import { create } from 'zustand';

const useNotificationStore = create<INotificationsState>((set) => ({
    notifications: [],
    unreadNotificationCount: 0,
    isFetchingNotifications: false,

    subscribeToNotifications: (userId: string) => {
        const notificationsQuery = query(
            collection(firestore, FirestoreCollections.NOTIFICATIONS),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );

        const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
            const notifications = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as INotification[];

            const unreadNotificationCount = notifications.filter(
                (notification) => !notification.isRead
            ).length;

            set({ notifications, unreadNotificationCount });
        });

        return unsubscribe;
    },

    markAsRead: async (notificationId: string) => {
        try {
            const notificationRef = doc(
                firestore,
                FirestoreCollections.NOTIFICATIONS,
                notificationId
            );

            await updateDoc(notificationRef, {
                isRead: true,
            });

            set((state) => {
                const updatedNotifications = state.notifications.map((notif) =>
                    notif.id === notificationId
                        ? { ...notif, isRead: true }
                        : notif
                );
                const updatedUnreadCount = updatedNotifications.filter(
                    (notif) => !notif.isRead
                ).length;

                return {
                    notifications: updatedNotifications,
                    unreadNotificationCount: updatedUnreadCount,
                };
            });
        } catch (error) {
            console.error('Error marking notification as read: ', error);
        }
    },

    addNotification: async (
        userId: string,
        title: string,
        message: string,
        type: NotificationStatus,
        actionLink?: string
    ) => {
        try {
            const newNotification: Omit<INotification, 'id'> = {
                userId,
                title,
                message,
                type,
                isRead: false,
                createdAt: Timestamp.now(),
                actionLink,
            };

            await addDoc(
                collection(firestore, FirestoreCollections.NOTIFICATIONS),
                newNotification
            );
        } catch (error) {
            console.error('Error adding notification: ', error);
        }
    },
}));

export default useNotificationStore;
