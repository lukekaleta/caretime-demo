import React, { FC, MouseEvent, useCallback, useState } from 'react';
import {
    Divider,
    IconButton,
    ListItemButton,
    ListItemText,
    Menu,
} from '@mui/material';
import { Box } from '@mui/system';
import Icon from '@mdi/react';
import { mdiDotsHorizontal, mdiLogout } from '@mdi/js';
import { RouteNames } from '@/enums/RouteNames';
import { signOut } from '@firebase/auth';
import { auth } from '@/api/firebase';
import { useNavigate } from 'react-router';
import { userNavigateMenuItems } from '@/lib/menuItems';

interface AvatarState {
    menu: HTMLButtonElement | null;
}

const UserNavigate: FC = () => {
    const [state, setState] = useState<AvatarState>({
        menu: null,
    });

    const navigate = useNavigate();

    const handleShowMenu = useCallback((e: MouseEvent<HTMLButtonElement>) => {
        setState((prevState) => ({
            ...prevState,
            menu: e.currentTarget,
        }));
    }, []);

    const handleCloseMenu = useCallback(() => {
        setState((prevState) => ({
            ...prevState,
            menu: null,
        }));
    }, []);

    const handleSetRoute = useCallback(
        (routeName: string) => {
            navigate(routeName);
            handleCloseMenu();
        },
        [handleCloseMenu]
    );

    const handleLogout = useCallback(async () => {
        try {
            await signOut(auth)
                .then((r) => console.log(r)) // undefined
                .catch();
            navigate(RouteNames.Login);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }, [navigate]);

    return (
        <Box>
            <IconButton onClick={(e) => handleShowMenu(e)}>
                <Icon path={mdiDotsHorizontal} size={1} />
            </IconButton>
            <Menu
                id="user-navigate-menu"
                anchorEl={state.menu}
                keepMounted
                open={Boolean(state.menu)}
                onClose={handleCloseMenu}
            >
                {userNavigateMenuItems.map((menuItem) => (
                    <Box key={menuItem.id}>
                        <ListItemButton
                            onClick={() => handleSetRoute(menuItem.href)}
                        >
                            <ListItemText primary={menuItem.name} />
                        </ListItemButton>
                        {menuItem.divided && <Divider />}
                    </Box>
                ))}
                <Divider />
                <ListItemButton onClick={handleLogout}>
                    <ListItemText
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}
                        primary="Odhlasit"
                    />
                    <Icon path={mdiLogout} size={1} />
                </ListItemButton>
            </Menu>
        </Box>
    );
};

export default UserNavigate;
