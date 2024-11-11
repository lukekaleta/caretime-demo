import { Card } from '@/components/Card';
import { Paper } from '@/components/Paper';
import useUsersStore from '@/stores/usersStore';
import useUserStore from '@/stores/userStore';
import { formatIsoDate } from '@/utils/datetime';
import { formatBirthNumber, parseBirthNumber } from '@/utils/index';
import { Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const ClientAddCreateClient = () => {
    const { t } = useTranslation('clients');
    const { selectedUser } = useUsersStore();
    const { fetchUserData, userData } = useUserStore();

    const birthDate = userData && parseBirthNumber(userData?.birthNumber);

    useEffect(() => {
        selectedUser && fetchUserData(selectedUser?.id);
    }, [selectedUser, fetchUserData]);

    return (
        <Paper sx={{ padding: 2 }}>
            <Card title={t('Review and confirm')} withHeaderDivider>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">
                            {t('Info') as String}
                        </Typography>
                    </Grid>

                    {/* First Name */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('First Name') as String}:
                        </Typography>
                        <Typography>{userData?.firstName}</Typography>
                    </Grid>

                    {/* Last Name */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Last Name') as String}:
                        </Typography>
                        <Typography>{userData?.lastName}</Typography>
                    </Grid>

                    {/* Birth Number */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Birth Number') as String}:
                        </Typography>
                        <Typography>
                            {userData &&
                                formatBirthNumber(userData?.birthNumber)}
                        </Typography>
                    </Grid>

                    {/* Birth Date */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Birth Date') as String}:
                        </Typography>
                        <Typography>
                            {birthDate && formatIsoDate(birthDate)}
                        </Typography>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Email') as String}:
                        </Typography>
                        <Typography>{userData?.email}</Typography>
                    </Grid>

                    {/* Phone Number */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Phone Number') as String}:
                        </Typography>
                        <Typography>{userData?.phoneNumber}</Typography>
                    </Grid>

                    {/* Gender */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Gender') as String}:
                        </Typography>
                        <Typography>{userData?.gender}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Street') as String}:
                        </Typography>
                        <Typography>{userData?.address?.street}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('City') as String}:
                        </Typography>
                        <Typography>{userData?.address?.city}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle1">
                            {t('Zip Code') as String}:
                        </Typography>
                        <Typography>{userData?.address?.zip}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Paper>
    );
};

export default ClientAddCreateClient;
