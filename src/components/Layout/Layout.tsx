import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import { Dialog } from '@/components/Dialog';
import { MenuDrawer } from '@/components/Drawers';
import UserDrawer from '@/components/Drawers/UserDrawer';
import AppSettingsIcon from '@/components/Layout/AppSettingsIcon';
import { Notifications } from '@/components/Notifications';
import { Paper } from '@/components/Paper';
import UserAvatar from '@/components/User/UserAvatar';
import { RouteNames } from '@/enums/RouteNames';
import useAuthStore from '@/stores/authStore';
import useDialogStore from '@/stores/dialogStore';
import useDrawersStore from '@/stores/drawersStore';
import useNotificationStore from '@/stores/notificationsStore';
import { mdiArrowLeft, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Grid,
    IconButton,
    Toolbar,
    Tooltip,
    useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { appConfig } from '../../config';

const Layout: FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { user } = useAuthStore();
    const { openDialog, closeDialog } = useDialogStore();
    const { menuDrawer, setMenuDrawer } = useDrawersStore();
    const subscribeToNotifications = useNotificationStore((state) => state.subscribeToNotifications);

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const handleRedirect = useCallback(() => {
        navigate(RouteNames.UserAccount);
    }, [navigate]);

    const handleCloseDialog = useCallback(() => {
        closeDialog();
    }, [closeDialog]);

    const toggleDrawer = useCallback(() => {
        setMenuDrawer(!menuDrawer);
    }, [menuDrawer, setMenuDrawer]);

    useEffect(() => {
        if (user?.uid) {
            const unsubscribe = subscribeToNotifications(user.uid);

            return () => unsubscribe();
        }
    }, [user, subscribeToNotifications]);


    useEffect(() => {
        if (user && !user.emailVerified) {
            openDialog(
                'Vaše e-mailová adresa není ověřená!',
                'Pro plný přístup k funkcím aplikace ověřte prosím svou e-mailovou adresu.',
                () => {
                    handleRedirect();
                    handleCloseDialog();
                },
                'Ověřit e-mail'
            );
        }
    }, [user, handleCloseDialog, handleRedirect, openDialog]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <CssBaseline />
            <Dialog />
            <UserDrawer />

            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: theme.palette.background.default,
                    boxShadow: 'none',
                    width: isMobile
                        ? '100%'
                        : `calc(100% - ${appConfig.drawerWidth}px)`,
                    ml: isMobile ? 0 : `${appConfig.drawerWidth}px`,
                }}
            >
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            onClick={toggleDrawer}
                            edge="start"
                            size="large"
                        >
                            <Icon path={mdiMenu} size={1} />
                        </IconButton>
                    )}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <AppSettingsIcon />
                            </Grid>
                            <Grid item>
                                <Notifications />
                            </Grid>
                            <Grid item>
                                <UserAvatar />
                            </Grid>
                        </Grid>
                    </Box>
                </Toolbar>
            </AppBar>

            <MenuDrawer />

            <Box
                component="main"
                sx={{
                    flexGrow: 2,
                    bgcolor: theme.palette.white.main,
                    p: 3,
                    width: isMobile
                        ? '100%'
                        : `calc(100% - ${appConfig.drawerWidth}px)`,
                    ml: isMobile ? 0 : `${appConfig.drawerWidth}px`,
                    mt: 6,
                    backgroundColor: theme.palette.customBackground.main,
                }}
            >
                <Container
                    maxWidth='xl'
                    sx={{ padding: 0 }}
                >
                    <Paper
                        sx={{
                            my: theme.spacing(2),
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Tooltip title="Zpět">
                            <IconButton onClick={handleBack}>
                                <Icon path={mdiArrowLeft} size={1} />
                            </IconButton>
                        </Tooltip>
                        <Box sx={{ flexGrow: 1 }} />
                        <Breadcrumbs />
                    </Paper>
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Layout;
