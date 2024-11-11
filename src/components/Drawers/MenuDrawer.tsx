import React, { useCallback } from 'react';
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemText,
    Stack,
    Typography,
    useMediaQuery,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router';
import { appConfig } from '@/config/index';
import Icon from '@mdi/react';
import { Logo } from '@/components/Logo';
import { drawerTopNavigateNavigationItem } from '@/lib/menuItems';
import { useLocation } from 'react-router-dom';
import useDrawersStore from '@/stores/drawersStore';
import useUserStore from '@/stores/userStore';

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    '& .MuiListItemText-primary': {
        fontSize: 14,
    },
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
    margin: [theme.spacing(2), theme.spacing(0.5)],
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.white.main,
    '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primaryBackground.light,
    },
    '&.Mui-selected': {
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.primaryBackground.light,
        '&:hover': {
            backgroundColor: theme.palette.primaryBackground.light,
        },
        '& .MuiTypography-root': {
            fontWeight: theme.typography.fontWeightMedium,
        },
    },
}));

const MenuDrawer = () => {
    const { menuDrawer, setMenuDrawer } = useDrawersStore();
    const { userData } = useUserStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const iconSize = 0.7;

    const visibleMenuItems = drawerTopNavigateNavigationItem.filter(
        (item) =>
            !item.allowedPermission ||
            item.allowedPermission.some(
                (perm) => userData?.permissions?.includes(perm) ?? false
            )
    );

    const handleSetRoute = useCallback(
        (routeName: string) => {
            navigate(routeName);
            setMenuDrawer(false);
        },
        [navigate]
    );

    const handleCloseDrawer = useCallback(() => {
        setMenuDrawer(false);
    }, []);

    return (
        <Box>
            <Drawer
                variant={isMobile ? 'temporary' : 'permanent'}
                anchor="left"
                open={menuDrawer || !isMobile}
                onClose={handleCloseDrawer}
                sx={{
                    width: appConfig.drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: appConfig.drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexGrow: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Box
                            sx={{
                                p: theme.spacing(1.5),
                                display: 'flex',
                                height: '70px',
                                alignItems: 'center',
                            }}
                        >
                            <Stack
                                spacing={2}
                                direction="row"
                                sx={{
                                    display: 'flex',
                                    width: '100%',
                                    alignItems: 'end',
                                    justifyContent: 'space-between',
                                }}
                            >
                                <Stack>
                                    <Logo height={35} variant="color-long" />
                                </Stack>
                                <Stack>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: theme.palette.grey.A400 }}
                                    >
                                        v. 0.0.1 alfa
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Box>

                        <Box>
                            <List component="nav">
                                {visibleMenuItems.map((menuItem) => (
                                    <StyledListItemButton
                                        selected={pathname === menuItem.href}
                                        key={menuItem.id}
                                        onClick={() =>
                                            handleSetRoute(menuItem.href)
                                        }
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
                                            primary={menuItem.name}
                                        />
                                    </StyledListItemButton>
                                ))}
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </Box>
    );
};

export default MenuDrawer;
