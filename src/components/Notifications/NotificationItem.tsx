// src/components/Notifications/NotificationItem.tsx

import { StyledIconButton, StyledListItem } from '@/components/StyledComponents';
import { INotification } from '@/interfaces/Notification';
import { mdiAlertCircleOutline, mdiAlertOutline, mdiCheckboxMarkedCircleOutline, mdiCircleSmall, mdiInformationOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Box, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

interface NotificationItemProps {
    notification: INotification;
    handleMarkAsRead: (id: string) => void;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification, handleMarkAsRead }) => {
    const theme = useTheme();

    const getIcon = (type: string) => {
        switch (type) {
            case 'info':
                return <Icon path={mdiInformationOutline} size={1} />;
            case 'success':
                return <Icon path={mdiCheckboxMarkedCircleOutline} size={1} />;
            case 'warning':
                return <Icon path={mdiAlertCircleOutline} size={1} />;
            case 'error':
                return <Icon path={mdiAlertOutline} size={1} />;
            default:
                return null;
        }
    };

    return (
        <StyledListItem>
            <ListItemIcon>
                <Box color={theme.palette[notification.type].main}>
                    {getIcon(notification.type)}
                </Box>
            </ListItemIcon>
            <ListItemText
                primary={
                    <Fragment>
                        {notification.actionLink ? (
                            <Link to={notification.actionLink}>
                                <Typography component="span" variant="body2" sx={{ textDecoration: 'underline', color: theme.palette.secondary.main }}>
                                    {notification.title}
                                </Typography>
                            </Link>
                        ) : (
                            <Typography component="span" variant="body2" sx={{ color: theme.palette.secondary.main }}>
                                {notification.title}
                            </Typography>
                        )}
                    </Fragment>
                }
                secondary={
                    <Fragment>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                            {notification.message}
                        </Typography>
                        <Typography variant="caption" sx={{ fontWeight: 500, color: notification.isRead ? 'text.secondary' : theme.palette.secondary.main }}>
                            {/*      */}
                        </Typography>
                    </Fragment>
                }
            />
            {!notification.isRead && (
                <StyledIconButton onClick={() => handleMarkAsRead(notification.id)}>
                    <Icon path={mdiCircleSmall} size={2} />
                </StyledIconButton>
            )}
        </StyledListItem>
    );
};

export default NotificationItem;