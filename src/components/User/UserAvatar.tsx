import { FC, useCallback } from 'react';
import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import userStore from '@/stores/userStore';
import useAppStore from '@/stores/appStore';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    boxSizing: 'border-box',
    cursor: 'pointer',
}));

const UserAvatar: FC = () => {
    const { userData } = userStore();
    const { setUserDrawer } = useAppStore();

    const handleOpenDrawer = useCallback(() => {
        setUserDrawer(true);
    }, [setUserDrawer]);

    return (
        <StyledAvatar
            src={userData?.profilePicture}
            onClick={handleOpenDrawer}
        />
    );
};

export default UserAvatar;
