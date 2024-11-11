import { AppSettingsPermissions } from '@/enums/Permissions';
import { RouteNames } from '@/enums/RouteNames';
import useUserStore from '@/stores/userStore';
import { mdiCogOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { IconButton } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router';

const AppSettingsIcon: FC = () => {
    const navigate = useNavigate();
    const { hasPermission } = useUserStore();

    const handleClick = useCallback(() => {
        navigate(RouteNames.AppSettings);
    }, []);

    if (!hasPermission(AppSettingsPermissions.CanSeeAppSettings)) {
        return null;
    }

    return (
        <IconButton onClick={handleClick}>
            <Icon path={mdiCogOutline} size={1} />
        </IconButton>
    );
};

export default AppSettingsIcon;
