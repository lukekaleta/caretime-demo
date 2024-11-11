import React, { FC, useCallback } from 'react';
import {
    Box,
    CircularProgress,
    CssBaseline,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useTheme } from '@mui/material/styles';
import { Logo } from '@/components//Logo';
import { RouteNames } from '@/enums/RouteNames';
import useAuthStore from '@/stores/authStore';
import { Button } from '@/components/Button';
import useAppSettingsStore from '@/stores/appSettingsStore';
import { REGEX } from '@/utils/regex';
import usePasswordRegex from '@/hooks/usePasswordRegex';
import { useTranslation } from 'react-i18next';
import { IRegister } from '@/interfaces/Register';
import Gender from '@/enums/Gender';
import validateBirthNumber from '@/utils/validateBirthNumber';

const Register: FC = () => {
    const { t } = useTranslation('register');
    const navigate = useNavigate();
    const { register: registerUser, isRegistering } = useAuthStore();
    const { settings } = useAppSettingsStore();
    const theme = useTheme();
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IRegister>();
    const { passwordRequires, regex: passwordRegex } = usePasswordRegex(
        settings.passwordPolicy
    );

    const handleRedirectToLogin = useCallback(() => {
        navigate(RouteNames.Login);
    }, [navigate]);

    const handleRegister = useCallback(
        async (data: IRegister) => {
            await registerUser(data);

            reset();
        },
        [registerUser]
    );

    return (
        <Box
            component="main"
            sx={{
                backgroundColor: '#f1f5f9',
                width: '100%',
            }}
        >
            <CssBaseline />
            <Box
                maxWidth="sm"
                sx={{
                    p: 1,
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
                        padding: theme.spacing(6),
                        borderRadius: 2,
                        boxShadow: 'none',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: theme.spacing(1),
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
                        Vytvořte si účet
                    </Typography>
                    <Typography
                        variant="body1"
                        align="center"
                        color="textSecondary"
                        gutterBottom
                    >
                        Vyplňte následující údaje pro registraci.
                    </Typography>
                    <form
                        onSubmit={handleSubmit(handleRegister)}
                        style={{ width: '100%', marginTop: theme.spacing(2) }}
                    >
                        <Grid container spacing={1}>
                            {/* Jméno a příjmení */}
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Titul před"
                                            {...register('titleBefore')}
                                        />
                                    </Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Jméno"
                                            {...register('firstName', {
                                                required: 'Jméno je povinné',
                                            })}
                                            error={!!errors.firstName}
                                            helperText={
                                                errors.firstName?.message
                                            }
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Grid container spacing={1}>
                                    <Grid item xs={8}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Příjmení"
                                            {...register('lastName', {
                                                required: 'Příjmení je povinné',
                                            })}
                                            error={!!errors.lastName}
                                            helperText={
                                                errors.lastName?.message
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            variant="outlined"
                                            fullWidth
                                            label="Titul za"
                                            {...register('titleAfter')}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>

                            {/* Rodné číslo a Pohlaví */}
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Rodné číslo"
                                    {...register('birthNumber', {
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
                                        pattern: {
                                            value: REGEX.BIRTH_NUMBER,
                                            message:
                                                'Rodné číslo může obsahovat pouze čísla',
                                        },
                                        validate: {
                                            birthNumberValidation: (value) =>
                                                validateBirthNumber(value) ||
                                                'Zadejte platné rodné číslo',
                                        },
                                    })}
                                    error={!!errors.birthNumber}
                                    helperText={errors.birthNumber?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="gender-label">
                                        Pohlaví
                                    </InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        label="Pohlaví"
                                        defaultValue=""
                                        {...register('gender', {
                                            required: 'Pohlaví je povinné',
                                        })}
                                        error={!!errors.gender}
                                    >
                                        <MenuItem value={Gender.male}>
                                            Muž
                                        </MenuItem>
                                        <MenuItem value={Gender.female}>
                                            Žena
                                        </MenuItem>
                                        <MenuItem value={Gender.other}>
                                            Ostatní
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            {/* Email a telefonní číslo */}
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Email"
                                    {...register('email', {
                                        pattern: {
                                            value: REGEX.EMAIL,
                                            message: 'Zadejte platný email',
                                        },
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Telefonní číslo"
                                    {...register('phoneNumber', {
                                        required: 'Telefonní číslo je povinné',
                                        pattern: {
                                            value: REGEX.PHONE,
                                            message:
                                                'Zadejte platné telefonní číslo s předvolbou (např. +420)',
                                        },
                                    })}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                />
                            </Grid>

                            {/* Heslo a potvrzení hesla */}
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Heslo"
                                    type="password"
                                    {...register('password', {
                                        required: 'Heslo je povinné',
                                        pattern: {
                                            value: passwordRegex,
                                            message: `Heslo nesplňuje pravidla`,
                                        },
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label="Potvrďte heslo"
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Potvrzení hesla je povinné',
                                        validate: (value) =>
                                            value === watch('password') ||
                                            'Hesla se neshodují',
                                    })}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="body2">
                                    Heslo musí splňovat tyto pravidla:{' '}
                                    <strong>
                                        {passwordRequires
                                            .map((r) => t(r))
                                            .join(', ')}
                                    </strong>
                                </Typography>
                            </Grid>
                        </Grid>

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
                                    disabled={isRegistering}
                                >
                                    {isRegistering ? (
                                        <CircularProgress
                                            size={26}
                                            color="inherit"
                                        />
                                    ) : (
                                        'Registrovat se'
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    color="secondary"
                                    disabled={isRegistering}
                                    onClick={handleRedirectToLogin}
                                >
                                    Zpět na přihlášení
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
};

export default Register;
