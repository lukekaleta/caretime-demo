import React, { FC, useCallback, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    Fab,
    Grid,
    TextField,
    Tooltip,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useUserStore from '@/stores/userStore';
import { parseBirthNumber } from '@/utils/index';
import useAuthStore from '@/stores/authStore';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import { IPerson } from '@/interfaces/Person';

interface UserFormData extends Partial<IPerson> {
    firstName: string;
    lastName: string;
    street: string;
    city: string;
    zip: string;
    birthDate: string;
    birthNumber: string;
    email: string;
    phone: string;
}

const UserAccountForm: FC = () => {
    const { userData, updateUserData, isUpdatingUserData, fetchUserData } =
        useUserStore();
    const { user } = useAuthStore();

    const { control, handleSubmit, setValue } = useForm<UserFormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            zip: '',
            birthDate: '',
            birthNumber: '',
            email: '',
            phoneNumber: '',
        },
    });

    const birthDate = userData && parseBirthNumber(userData?.birthNumber);

    useEffect(() => {
        if (userData) {
            setValue('firstName', userData.firstName);
            setValue('lastName', userData.lastName);
            setValue('street', userData?.address?.street || '');
            setValue('city', userData?.address?.city || '');
            setValue('zip', userData?.address?.zip || '');
            setValue('birthNumber', userData.birthNumber);
            setValue('birthDate', birthDate || '');
            setValue('email', userData.email);
            setValue('phoneNumber', userData.phoneNumber);
        }
    }, [userData, setValue]);

    const onSubmit = useCallback(
        async (data: UserFormData) => {
            if (user) {
                await updateUserData(user.uid, { address: data });
                await fetchUserData(user.uid);
            }
        },
        [user, updateUserData, fetchUserData]
    );

    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'grey.300',
            }}
        >
            <CardHeader
                title="Úprava základních údajů"
                titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: 'Zadejte křestní jméno' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Name"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Insert last name' }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Surname"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Zadejte emailovou adresu',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Zadejte platný email',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Email"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{
                                    required: 'Insert phone number',
                                    pattern: {
                                        value: /^[+0-9]*$/,
                                        message:
                                            'Zadejte platné telefonní číslo',
                                    },
                                }}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Phone number"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="street"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="Street"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="city"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="zip"
                                control={control}
                                render={({ field, fieldState: { error } }) => (
                                    <TextField
                                        {...field}
                                        label="ZIP"
                                        fullWidth
                                        variant="outlined"
                                        error={!!error}
                                        helperText={
                                            error ? error.message : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6} />

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="birthDate"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Birth date"
                                        type="date"
                                        fullWidth
                                        variant="outlined"
                                        disabled
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Controller
                                name="birthNumber"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Birth number"
                                        fullWidth
                                        variant="outlined"
                                        disabled
                                    />
                                )}
                            />
                        </Grid>

                        <Tooltip title="Save changes">
                            <Fab
                                type="submit"
                                size="large"
                                color="success"
                                aria-label="add"
                                disabled={isUpdatingUserData}
                                sx={{
                                    position: 'fixed',
                                    bottom: 16,
                                    right: 16,
                                }}
                            >
                                <Icon path={mdiCheck} size={1} />
                            </Fab>
                        </Tooltip>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    );
};

export default UserAccountForm;
