import { FC } from 'react';
import { Box, Grid } from '@mui/material';
import { AvatarManager } from '@/components/AvatarManager';
import UserAccountForm from '@/components/User/UserAccountForm';

const UserAccountProfile: FC = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <AvatarManager />
                </Grid>

                <Grid item xs={12} md={8}>
                    <UserAccountForm />
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserAccountProfile;
