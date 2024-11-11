import React, { FC, useCallback } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Fab,
    Grid,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Button } from '@/components/Button';
import { Controller, useForm } from 'react-hook-form';
import useAuthStore from '@/stores/authStore';
import useDialogStore from '@/stores/dialogStore';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

interface ChangePasswordFormData {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface DeleteAccountFormData {
    currentPassword: string;
}

const UserAccountSecurity: FC = () => {
    const theme = useTheme();
    const {
        changePassword,
        deleteAccount,
        isDeletingPassword,
        sendVerificationEmail,
    } = useAuthStore();
    const { openDialog } = useDialogStore();
    const { user } = useAuthStore();

    const {
        control: controlChangePassword,
        handleSubmit: handleSubmitChangePassword,
        setError: setErrorChangePassword,
        clearErrors: clearErrorsChangePassword,
        formState: { errors: errorsChangePassword },
    } = useForm<ChangePasswordFormData>({
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onSubmitChangePassword = async (data: ChangePasswordFormData) => {
        if (data.newPassword === data.confirmPassword) {
            await changePassword(data);
            clearErrorsChangePassword('confirmPassword');
        } else {
            setErrorChangePassword('confirmPassword', {
                type: 'manual',
                message: 'Hesla se neshodují',
            });
        }
    };

    const {
        control: controlDeleteAccount,
        handleSubmit: handleSubmitDeleteAccount,
        setError: setErrorDeleteAccount,
        formState: { errors: errorsDeleteAccount },
    } = useForm<DeleteAccountFormData>({
        defaultValues: {
            currentPassword: '',
        },
    });

    const onSubmitDeleteAccount = async (data: DeleteAccountFormData) => {
        try {
            await deleteAccount({ currentPassword: data.currentPassword });
        } catch (error) {
            setErrorDeleteAccount('currentPassword', {
                type: 'manual',
                message: 'Chybné heslo, účet nebyl odstraněn.',
            });
        }
    };

    const handleAccountDeletion = () => {
        openDialog(
            'Potvrzení odstranění účtu',
            <Box>
                <Typography>
                    Pro odstranění účtu zadejte své aktuální heslo:
                </Typography>
                <Controller
                    name="currentPassword"
                    control={controlDeleteAccount}
                    rules={{ required: 'Zadejte aktuální heslo' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Aktuální heslo"
                            type="password"
                            fullWidth
                            error={!!errorsDeleteAccount.currentPassword}
                            helperText={
                                errorsDeleteAccount.currentPassword?.message
                            }
                            sx={{ mt: 2 }}
                        />
                    )}
                />
            </Box>,
            handleSubmitDeleteAccount(onSubmitDeleteAccount),
            'Odstranit účet',
            isDeletingPassword
        );
    };

    const handleVerifyEmail = useCallback(async () => {
        await sendVerificationEmail();
    }, [sendVerificationEmail]);

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {/* Levá část - Změna hesla */}
                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: theme.palette.grey[300],
                        }}
                    >
                        <CardHeader
                            titleTypographyProps={{ variant: 'h6' }}
                            title="Změna hesla"
                        />
                        <Divider />
                        <CardContent sx={{ padding: 0 }}>
                            <Box sx={{ p: 2 }}>
                                <form
                                    onSubmit={handleSubmitChangePassword(
                                        onSubmitChangePassword
                                    )}
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Controller
                                                name="currentPassword"
                                                control={controlChangePassword}
                                                rules={{
                                                    required:
                                                        'Zadejte aktuální heslo',
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Aktuální heslo"
                                                        type="password"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={
                                                            !!errorsChangePassword.currentPassword
                                                        }
                                                        helperText={
                                                            errorsChangePassword
                                                                .currentPassword
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="newPassword"
                                                control={controlChangePassword}
                                                rules={{
                                                    required:
                                                        'Zadejte nové heslo',
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Nové heslo"
                                                        type="password"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={
                                                            !!errorsChangePassword.newPassword
                                                        }
                                                        helperText={
                                                            errorsChangePassword
                                                                .newPassword
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Controller
                                                name="confirmPassword"
                                                control={controlChangePassword}
                                                rules={{
                                                    required:
                                                        'Potvrďte nové heslo',
                                                }}
                                                render={({ field }) => (
                                                    <TextField
                                                        {...field}
                                                        label="Potvrdit nové heslo"
                                                        type="password"
                                                        fullWidth
                                                        variant="outlined"
                                                        error={
                                                            !!errorsChangePassword.confirmPassword
                                                        }
                                                        helperText={
                                                            errorsChangePassword
                                                                .confirmPassword
                                                                ?.message
                                                        }
                                                    />
                                                )}
                                            />
                                        </Grid>

                                        <Tooltip title="Změnit heslo">
                                            <Fab
                                                type="submit"
                                                size="large"
                                                color="success"
                                                aria-label="add"
                                                sx={{
                                                    position: 'fixed',
                                                    bottom: 16,
                                                    right: 16,
                                                }}
                                            >
                                                <Icon
                                                    path={mdiCheck}
                                                    size={1}
                                                />
                                            </Fab>
                                        </Tooltip>
                                    </Grid>
                                </form>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pravá část - Deaktivace účtu */}
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        {!user?.emailVerified && (
                            <Grid item>
                                <Card
                                    sx={{
                                        boxShadow: 'none',
                                        border: '1px solid',
                                        borderColor: theme.palette.grey[300],
                                    }}
                                >
                                    <CardHeader
                                        titleTypographyProps={{ variant: 'h6' }}
                                        title="Ověření e-mailové adresy"
                                    />
                                    <Divider />
                                    <CardContent sx={{ padding: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ p: 2 }}
                                        >
                                            Na vaši e-mailovou adresu byl
                                            odeslán e-mail s odkazem pro
                                            ověření. Kliknutím na tento odkaz
                                            potvrdíte svou e-mailovou adresu a
                                            získáte plný přístup ke všem funkcím
                                            aplikace.
                                        </Typography>
                                        <Box sx={{ p: 2 }}>
                                            <Button
                                                variant="outlined"
                                                color="warning"
                                                size="small"
                                                onClick={handleVerifyEmail}
                                            >
                                                Odeslat ověřovací e-mail
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}

                        <Grid item>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[300],
                                }}
                            >
                                <CardHeader
                                    titleTypographyProps={{ variant: 'h6' }}
                                    title="Odstranění účtu"
                                />
                                <Divider />
                                <CardContent sx={{ padding: 0 }}>
                                    <Typography variant="body2" sx={{ p: 2 }}>
                                        Odstraněním účtu budou nenávratně
                                        smazána všechna data a účet nebude možné
                                        obnovit. Buďte si tímto krokem zcela
                                        jistí.
                                    </Typography>
                                    <Box sx={{ p: 2 }}>
                                        <Button
                                            variant="text"
                                            color="error"
                                            size="small"
                                            onClick={handleAccountDeletion}
                                        >
                                            Odstranění účtu
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserAccountSecurity;
