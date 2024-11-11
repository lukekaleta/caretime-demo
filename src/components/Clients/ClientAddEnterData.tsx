import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Paper } from '@/components/Paper';
import Gender from '@/enums/Gender';
import { IPerson } from '@/interfaces/Person';
import useUsersStore from '@/stores/usersStore';
import { parseBirthNumber } from '@/utils/index';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import { FC, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormData {
    firstName: string;
    lastName: string;
    birthNumber: string;
    birthDate: string;
    email: string;
    phoneNumber: string;
    gender: Gender;
    street: string;
    city: string;
    zip: string;
}

const ClientAddEnterData: FC = () => {
    const { t } = useTranslation('clients');
    const { selectedUser, updateUser, isUpdatingUser } = useUsersStore();
    const { control, handleSubmit, getValues, setValue, reset } =
        useForm<FormData>();

    const birthDate =
        selectedUser && parseBirthNumber(selectedUser?.birthNumber);

    const handleClickOnSave = useCallback(async () => {
        const formData = getValues();
        const data: Partial<IPerson> = {
            id: selectedUser?.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            birthNumber: formData.birthNumber,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
            gender: formData.gender,
            address: {
                street: formData.street,
                city: formData.city,
                zip: formData.zip,
            },
        };
        await updateUser(data);
    }, [getValues, updateUser, selectedUser]);

    useEffect(() => {
        if (selectedUser) {
            setValue('gender', selectedUser.gender);
        }
    }, [selectedUser, setValue]);

    return (
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card title={t('Info')} withHeaderDivider>
                        <Box>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 130,
                                                height: 130,
                                                mb: 2,
                                            }}
                                            src={selectedUser?.profilePicture}
                                        />
                                    </Box>
                                    <Divider sx={{ my: 1 }} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={8}>
                                            <>{t('Account')}</>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                }}
                                                variant="button"
                                                color={
                                                    selectedUser?.isActive
                                                        ? 'success'
                                                        : 'error'
                                                }
                                            >
                                                <>
                                                    {selectedUser?.isActive
                                                        ? t('Active')
                                                        : t('Deactivated')}
                                                </>
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item xs={8}>
                                            <>{t('Email')}</>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <Typography
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                }}
                                                variant="button"
                                                color={
                                                    selectedUser?.isEmailVerified
                                                        ? 'success'
                                                        : 'error'
                                                }
                                            >
                                                <>
                                                    {selectedUser?.isEmailVerified
                                                        ? t('Verified')
                                                        : t('Unverified')}
                                                </>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card title={t('Enter data')} withHeaderDivider>
                        <form onSubmit={handleSubmit(handleClickOnSave)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.firstName || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    t('First Name') as string
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.lastName || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Last Name') as string}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="birthNumber"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.birthNumber || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    t('Birth Number') as string
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="birthDate"
                                        control={control}
                                        defaultValue={birthDate || ''}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                disabled
                                                label={
                                                    t('Birth Date') as string
                                                }
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        defaultValue={selectedUser?.email || ''}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Email') as string}
                                                type="email"
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="phoneNumber"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.phoneNumber || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={
                                                    t('Phone Number') as string
                                                }
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                id="gender-select-label"
                                                select
                                                fullWidth
                                                {...field}
                                                value={
                                                    field.value || Gender.male
                                                }
                                                label={t('Gender') as String}
                                                helperText="Please select your currency"
                                            >
                                                <MenuItem value={Gender.male}>
                                                    <>{t('Male')}</>
                                                </MenuItem>
                                                <MenuItem value={Gender.female}>
                                                    <>{t('Female')}</>
                                                </MenuItem>
                                                <MenuItem value={Gender.other}>
                                                    <>{t('Other')}</>
                                                </MenuItem>
                                            </TextField>
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="street"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.address?.street || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Street') as string}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="city"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.address?.city || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('City') as string}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="zip"
                                        control={control}
                                        defaultValue={
                                            selectedUser?.address?.zip || ''
                                        }
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={t('Zip Code') as string}
                                                variant="outlined"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'end',
                                        }}
                                    >
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="success"
                                            disabled={isUpdatingUser}
                                        >
                                            <>{t('Save changes')}</>
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ClientAddEnterData;
