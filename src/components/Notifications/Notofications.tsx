import { Button } from '@/components/Button';
import { RouteNames } from '@/enums/RouteNames';
import useNotificationStore from '@/stores/notificationsStore';
import { mdiBellOutline, mdiDotsHorizontal } from '@mdi/js';
import Icon from '@mdi/react';
import { Badge, Box, Divider, IconButton, Menu, Typography } from '@mui/material';
import { FC, MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NotificationList from './NotificationList';

interface NotificationsState {
    notificationCenter: HTMLButtonElement | null;
}

const Notifications: FC = () => {
    const { notifications, unreadNotificationCount } = useNotificationStore();
    const [state, setState] = useState<NotificationsState>({ notificationCenter: null });
    const navigate = useNavigate();

    const handleShowNotificationCenter = useCallback(
        (e: MouseEvent<HTMLButtonElement>): void => {
            setState((prevState) => ({ ...prevState, notificationCenter: e.currentTarget }));
        },
        []
    );

    const handleCloseNotificationCenter = useCallback(() => {
        setState((prevState) => ({ ...prevState, notificationCenter: null }));
    }, []);

    const handleRedirectToNotificationsCenter = useCallback(() => {
        handleCloseNotificationCenter();
        navigate(RouteNames.NotificationsCenter);
    }, [navigate, handleCloseNotificationCenter]);

    return (
        <Box>
            <IconButton onClick={handleShowNotificationCenter}>
                <Badge badgeContent={unreadNotificationCount} color="secondary">
                    <Icon path={mdiBellOutline} size={1} />
                </Badge>
            </IconButton>
            <Menu
                id="notification-menu"
                anchorEl={state.notificationCenter}
                keepMounted
                open={Boolean(state.notificationCenter)}
                onClose={handleCloseNotificationCenter}
            >
                <Box sx={{ width: 400, p: 2 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Upozornění</Typography>
                        <IconButton>
                            <Icon path={mdiDotsHorizontal} size={1} />
                        </IconButton>
                    </Box>

                    <NotificationList notifications={notifications} />

                    <Divider sx={{ my: 2 }} />
                    <Button
                        variant="text"
                        size="small"
                        color="primary"
                        fullWidth
                        onClick={handleRedirectToNotificationsCenter}
                    >
                        Zobrazit další upozornění
                    </Button>
                </Box>
            </Menu>
        </Box>
    );
};

export default Notifications;