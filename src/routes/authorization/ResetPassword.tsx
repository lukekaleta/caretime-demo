import React, { FC, useCallback } from 'react';
import {
    Box,
    CircularProgress,
    CssBaseline,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Logo } from '@/components/Logo';
import { RouteNames } from '@/enums/RouteNames';
import useAuthStore from '@/stores/authStore';
import { ResetPasswordData } from '@/interfaces/_depracated/Auth';
import { Button } from '@/components/Button';

const ResetPassword: FC = () => {
    const navigate = useNavigate();
    const { resetPassword, isResettingPassword } = useAuthStore();
    const theme = useTheme();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ResetPasswordData>();

    const handleResetPassword = useCallback(
        async (data: ResetPasswordData) => {
            await resetPassword(data);
            reset();
        },
        [resetPassword, reset]
    );

    const handleNavigateToLogin = useCallback(() => {
        navigate(RouteNames.Login);
    }, [navigate]);

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: theme.palette.customBackground.main,
                width: '100%',
            }}
        >
            <CssBaseline />
            <Box
                sx={{
                    p: 1,
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        padding: 6,
                        borderRadius: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: theme.spacing(4),
                        }}
                    >
                        <Logo height={100} />
                    </Box>

                    <Typography
                        color="primary"
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: theme.typography.fontWeightBold }}
                    >
                        Obnovte své heslo
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Zadejte svůj email pro reset hesla.
                    </Typography>
                    <form
                        onSubmit={handleSubmit(handleResetPassword)}
                        style={{ width: '100%', marginTop: theme.spacing(2) }}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email"
                            autoComplete="email"
                            {...register('email', {
                                required: 'Email je povinný',
                                pattern: {
                                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                    message: 'Zadejte platný email',
                                },
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <Grid
                            container
                            justifyContent="center"
                            spacing={2}
                            mt={2}
                        >
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary"
                                    disabled={isResettingPassword}
                                >
                                    {isResettingPassword ? (
                                        <CircularProgress
                                            size={26}
                                            color="inherit"
                                        />
                                    ) : (
                                        'Odeslat žádost'
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    disabled={isResettingPassword}
                                    onClick={handleNavigateToLogin}
                                >
                                    Zpátky na přihlášení
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default ResetPassword;
