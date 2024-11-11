import { INotification } from '@/interfaces/Notification';
import useNotificationStore from '@/stores/notificationsStore';
import { Box, List, Typography } from '@mui/material';
import { FC } from 'react';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
    notifications: INotification[];
}

const NotificationList: FC<NotificationListProps> = ({ notifications }) => {
    const { markAsRead } = useNotificationStore();

    return notifications.length > 0 ? (
        <List>
            {notifications.map((notification) => (
                <NotificationItem
                    key={notification.id}
                    notification={notification}
                    handleMarkAsRead={markAsRead}
                />
            ))}
        </List>
    ) : (
        <Box py={2} display="flex" justifyContent="center" alignItems="center">
            <Typography variant="body2" color="textSecondary">
                Žádné nové notifikace
            </Typography>
        </Box>
    );
};

export default NotificationList;