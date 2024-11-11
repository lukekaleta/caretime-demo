import React, { FC, useCallback } from 'react';
import {
    Avatar,
    Box as MuiBox,
    colors,
    Divider,
    Drawer as MuiDrawer,
    IconButton,
    List,
    ListItemButton,
    ListItemText,
    Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useAppStore from '@/stores/appStore';
import useAuthStore from '@/stores/authStore';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/Button';
import { userDrawerNavigateMenuItems } from '@/lib/menuItems';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RouteNames } from '@/enums/RouteNames';

const StyledDrawer = styled(MuiDrawer)(({ theme }) => ({
    width: 320,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        boxShadow: '-40px 40px 80px -8px rgba(145, 158, 171, 0.24)',
        width: 320,
        padding: theme.spacing(2),
        border: 'none',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}));

const HeaderBox = styled(MuiBox)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
}));

const ContentBox = styled(MuiBox)(({ theme }) => ({
    marginTop: theme.spacing(2),
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}));

const BottomBox = styled(MuiBox)(() => ({
    marginTop: 'auto',
    width: '100%',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    margin: [theme.spacing(2), theme.spacing(0)],
    borderRadius: theme.shape.borderRadius,
    color: colors.grey['600'],
    backgroundColor: theme.palette.white.main,
    '&:hover': {
        color: colors.grey['600'],
        backgroundColor: colors.grey['100'],
    },
    '&.Mui-selected': {
        color: colors.grey['600'],
        backgroundColor: colors.grey['200'],
        '&:hover': {
            backgroundColor: colors.grey['200'],
        },
        '& .MuiTypography-root': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
}));

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontSize: 14,
    },
}));

const UserDrawer: FC = () => {
    const { t } = useTranslation('user');
    const { setUserDrawer, userDrawer } = useAppStore();
    const { userData } = useUserStore();
    const { logout, isLoggingOut } = useAuthStore();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    const theme = useTheme();
    const iconSize = 0.7;

    const handleSetRoute = useCallback(
        (routeName: string) => {
            navigate(routeName);
        },
        [navigate]
    );

    const handleCloseDrawer = useCallback(() => {
        setUserDrawer(false);
    }, [setUserDrawer]);

    const handleLogout = useCallback(async () => {
        await logout().then(() => {
            navigate(RouteNames.Login);
        });
        setUserDrawer(false);
    }, [logout, setUserDrawer, navigate]);

    return (
        <StyledDrawer anchor="right" open={userDrawer} variant="persistent">
            <HeaderBox>
                <IconButton onClick={handleCloseDrawer} size="small">
                    <Icon path={mdiClose} size={1} />
                </IconButton>
            </HeaderBox>
            <ContentBox>
                <MuiBox
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar
                        sx={{ width: 100, height: 100, mb: theme.spacing(2) }}
                        src={userData?.profilePicture}
                    />
                    <Typography
                        variant="h6"
                        color={colors.grey['600']}
                    >{`${userData?.titleBefore || ''} ${userData?.firstName} ${userData?.lastName} ${userData?.titleAfter || ''}`}</Typography>
                    <Typography variant="body2" color={colors.grey['500']}>
                        {userData?.email}
                    </Typography>
                </MuiBox>
                <MuiBox sx={{ pt: theme.spacing(8), width: '100%' }}>
                    <Divider variant="middle" />
                    <List sx={{ my: theme.spacing(2) }}>
                        {userDrawerNavigateMenuItems.map((menuItem) => (
                            <StyledListItemButton
                                selected={pathname === menuItem.href}
                                key={menuItem.id}
                                onClick={() => handleSetRoute(menuItem.href)}
                            >
                                {menuItem.icon && (
                                    <Icon
                                        path={menuItem.icon}
                                        size={iconSize}
                                    />
                                )}
                                <StyledListItemText
                                    sx={{
                                        ml: theme.spacing(2),
                                    }}
                                >
                                    <>{t(menuItem.name)}</>
                                </StyledListItemText>
                            </StyledListItemButton>
                        ))}
                    </List>
                    <Divider variant="middle" />
                </MuiBox>
            </ContentBox>
            <BottomBox>
                <Button
                    size="large"
                    variant="contained"
                    color="error"
                    fullWidth
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                >
                    Odhlásit se
                </Button>
            </BottomBox>
        </StyledDrawer>
    );
};

export default UserDrawer;
