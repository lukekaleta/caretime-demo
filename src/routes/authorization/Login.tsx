import { Logo } from '@/components//Logo';
import { Button } from '@/components/Button';
import { RouteNames } from '@/enums/RouteNames';
import { LoginData } from '@/interfaces/_depracated/Auth';
import { ILogin } from '@/interfaces/Login';
import useAppSettingsStore from '@/stores/appSettingsStore';
import useAuthStore from '@/stores/authStore';
import {
    Box,
    CircularProgress,
    CssBaseline,
    Grid,
    Link,
    Paper,
    TextField,
    Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const Login: FC = () => {
    const navigate = useNavigate();
    const { login, isLoggingIn, user } = useAuthStore();
    const { settings } = useAppSettingsStore();
    const theme = useTheme();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>();

    const handleLogin = useCallback(
        async (data: ILogin) => {
            await login(data);
        },
        [login]
    );

    const handleRedirectToResetPassword = useCallback(() => {
        navigate(RouteNames.ResetPassword);
    }, [navigate]);

    const handleRedirectToRegister = useCallback(() => {
        navigate(RouteNames.Register);
    }, [navigate]);

    useEffect(() => {
        if (user) {
            navigate(RouteNames.Home);
        }
    }, [user, navigate])

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
                maxWidth="sm"
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
                            mb: theme.spacing(2),
                        }}
                    >
                        <Logo height={100} />
                    </Box>

                    <Typography
                        color="primary"
                        variant="h5"
                        align="center"
                        gutterBottom
                        sx={{
                            fontWeight: theme.typography.fontWeightBold,
                        }}
                    >
                        Vítejte zpátky!
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Pro pokračování vyplňte přihlašovací údaje.
                    </Typography>
                    <form
                        onSubmit={handleSubmit(handleLogin)}
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
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="password"
                            label="Heslo"
                            type="password"
                            autoComplete="current-password"
                            {...register('password', {
                                required: 'Heslo je povinné',
                                minLength: {
                                    value: 5,
                                    message: 'Heslo musí mít alespoň 5 znaků',
                                },
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Grid item>
                                <Link
                                    sx={{
                                        cursor: 'pointer',
                                    }}
                                    onClick={handleRedirectToResetPassword}
                                    variant="body2"
                                >
                                    Zapomenuté heslo?
                                </Link>
                            </Grid>
                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            size="large"
                            variant="contained"
                            color="primary"
                            disabled={isLoggingIn}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            {isLoggingIn ? (
                                <CircularProgress size={26} color="inherit" />
                            ) : (
                                'Přihlásit se'
                            )}
                        </Button>
                        {settings?.allowClientRegistration === 'allow' && (
                            <Button
                                onClick={handleRedirectToRegister}
                                fullWidth
                                size="large"
                                variant="outlined"
                                color="secondary"
                            >
                                Ještě nemáte účet?
                            </Button>
                        )}
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Login;
