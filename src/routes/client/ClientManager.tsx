import { FC, useCallback, useEffect } from 'react';
import { Box, Container, Grid, MenuItem, TextField } from '@mui/material';
import { Card } from '@/components/Card';
import { Paper } from '@/components/Paper';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Gender from '@/enums/Gender';
import { Button } from '@/components/Button';
import useClientStore from '@/stores/clientsStore';
import { IPerson } from '@/interfaces/Person';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';

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

const ClientAddUnregistered: FC = () => {
    const { t } = useTranslation('clients');
    const {
        addClient,
        isAddingClient,
        fetchClientDetail,
        clientDetail,
        updateClient,
        isUpdatingClient,
    } = useClientStore();
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        getValues,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        defaultValues: {
            firstName: '',
            lastName: '',
            birthNumber: '',
            birthDate: '',
            email: '',
            phoneNumber: '',
            gender: Gender.male,
            street: '',
            city: '',
            zip: '',
        },
    });

    const handleManageClient = useCallback(async () => {
        const formData = getValues();
        const data: Partial<IPerson> = {
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

        if (id) {
            await updateClient(id, data);
            navigate(-1);
        } else {
            await addClient(data);
            reset();
        }
    }, [getValues, addClient, updateClient]);

    useEffect(() => {
        if (id) {
            fetchClientDetail(id).then(() => {
                if (clientDetail) {
                    reset({
                        firstName: clientDetail.firstName,
                        lastName: clientDetail.lastName,
                        birthNumber: clientDetail.birthNumber,
                        email: clientDetail.email || '',
                        phoneNumber: clientDetail.phoneNumber || '',
                        gender: clientDetail.gender || Gender.male,
                        street: clientDetail.address?.street || '',
                        city: clientDetail.address?.city || '',
                        zip: clientDetail.address?.zip || '',
                    });
                }
            });
        }
    }, [id, fetchClientDetail, reset]);

    return (
        <Paper sx={{ padding: 2 }}>
            <Card
                title={id ? t('Update data') : t('Insert data')}
                withHeaderDivider
            >
                <Container maxWidth="md">
                    <form onSubmit={handleSubmit(handleManageClient)}>
                        <Grid container spacing={2}>
                            {/* First Name (Required) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="firstName"
                                    control={control}
                                    rules={{ required: 'Jméno je povinné' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('First Name') as string}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.firstName}
                                            helperText={
                                                errors.firstName?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Last Name (Required) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="lastName"
                                    control={control}
                                    rules={{ required: 'Příjmení je povinné' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('Last Name') as string}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.lastName}
                                            helperText={
                                                errors.lastName?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Birth Number (Required) */}
                            <Grid item xs={12}>
                                <Controller
                                    name="birthNumber"
                                    control={control}
                                    rules={{
                                        required: 'Rodné číslo je povinné',
                                        minLength: {
                                            value: 9,
                                            message:
                                                'Rodné číslo musí mít alespoň 9 znaků',
                                        },
                                        maxLength: {
                                            value: 10,
                                            message:
                                                'Rodné číslo může mít maximálně 10 znaků',
                                        },
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('Birth Number') as string}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.birthNumber}
                                            helperText={
                                                errors.birthNumber?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Email (Optional) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('Email') as string}
                                            type="email"
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={errors.email?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Phone Number (Required) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    rules={{ required: 'Telefon je povinný' }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label={t('Phone Number') as string}
                                            variant="outlined"
                                            fullWidth
                                            error={!!errors.phoneNumber}
                                            helperText={
                                                errors.phoneNumber?.message
                                            }
                                        />
                                    )}
                                />
                            </Grid>

                            {/* Gender (Required) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="gender"
                                    control={control}
                                    rules={{ required: 'Pohlaví je povinné' }}
                                    render={({ field }) => (
                                        <TextField
                                            id="gender-select-label"
                                            fullWidth
                                            select
                                            {...field}
                                            label={t('Gender') as string}
                                            error={!!errors.gender}
                                            helperText={errors.gender?.message}
                                        >
                                            <MenuItem value={Gender.male}>
                                                {t('Male') as string}
                                            </MenuItem>
                                            <MenuItem value={Gender.female}>
                                                {t('Female') as string}
                                            </MenuItem>
                                            <MenuItem value={Gender.other}>
                                                {t('Other') as string}
                                            </MenuItem>
                                        </TextField>
                                    )}
                                />
                            </Grid>

                            {/* Address Fields (Optional) */}
                            <Grid item xs={12} md={6}>
                                <Controller
                                    name="street"
                                    control={control}
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

                            <Grid item xs={12} md={6} />
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'end',
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        color="secondary"
                                        variant="contained"
                                        disabled={
                                            isAddingClient || isUpdatingClient
                                        }
                                    >
                                        {id
                                            ? (t('Update a client') as string)
                                            : (t('Create a client') as string)}
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Card>
        </Paper>
    );
};

export default ClientAddUnregistered;
