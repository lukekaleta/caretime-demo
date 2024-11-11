import React, { FC, useCallback, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Fab,
    Grid,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useAppSettingsStore from '@/stores/appSettingsStore';
import { defaultAppConfig } from '@/config/appConfig';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import useUserStore from '@/stores/userStore';
import { AppSettingsSecurityPermissions } from '@/enums/Permissions';

interface FormValues {
    minLength: number;
    sessionTimeout: number;
    requireSpecialCharacters: boolean;
    requireNumbers: boolean;
    requiredUpperLetter: boolean;
}

const AppSecuritySettings: FC = () => {
    const { settings, updateSettings } = useAppSettingsStore();
    const { hasPermission } = useUserStore();
    const { passwordPolicy } = defaultAppConfig;
    const { handleSubmit, control, setValue } = useForm<FormValues>({
        defaultValues: {
            minLength: passwordPolicy.minLength,
            sessionTimeout: passwordPolicy.sessionTimeout,
            requireSpecialCharacters: passwordPolicy.requireSpecialCharacters,
            requireNumbers: passwordPolicy.requireNumbers,
            requiredUpperLetter: passwordPolicy.requiredUpperLetter,
        },
    });

    useEffect(() => {
        if (settings?.passwordPolicy) {
            setValue(
                'minLength',
                settings.passwordPolicy.minLength || passwordPolicy.minLength
            );
            setValue(
                'sessionTimeout',
                settings.passwordPolicy.sessionTimeout ||
                    passwordPolicy.sessionTimeout
            );
            setValue(
                'requireSpecialCharacters',
                settings.passwordPolicy.requireSpecialCharacters ||
                    passwordPolicy.requireSpecialCharacters
            );
            setValue(
                'requireNumbers',
                settings.passwordPolicy.requireNumbers ||
                    passwordPolicy.requireNumbers
            );
            setValue(
                'requiredUpperLetter',
                settings.passwordPolicy.requiredUpperLetter ||
                    passwordPolicy.requiredUpperLetter
            );
        }
    }, [settings, setValue]);

    const onSubmit = useCallback(
        async (data: FormValues) => {
            await updateSettings({ passwordPolicy: data });
        },
        [updateSettings]
    );

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'grey.300',
                            }}
                        >
                            <CardHeader
                                title="Zabezpečení"
                                titleTypographyProps={{ variant: 'h6' }}
                            />
                            <Divider />
                            <CardContent>
                                <Typography variant="body1" gutterBottom>
                                    Zadejte následující nastavení pro
                                    bezpečnost.
                                </Typography>

                                {/* Minimální délka hesla */}
                                <Controller
                                    name="minLength"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            disabled={
                                                !hasPermission(
                                                    AppSettingsSecurityPermissions.CanSetMaximumLengthOfPasswords
                                                )
                                            }
                                            label="Minimální délka hesla"
                                            type="number"
                                            fullWidth
                                            margin="normal"
                                            {...field}
                                        />
                                    )}
                                />

                                {/* Požadovat velké písmeno */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Požadovat velké písmeno
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="requiredUpperLetter"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsSecurityPermissions.CanAllowCapitalLetterOfPasswords
                                                        )
                                                    }
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Požadovat speciální znaky */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Požadovat speciální znaky
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="requireSpecialCharacters"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsSecurityPermissions.CanAllowSpecialCharacterOfPasswords
                                                        )
                                                    }
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>

                                {/* Požadovat čísla */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Požadovat čísla
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="requireNumbers"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsSecurityPermissions.CanAllowNumberOfPasswords
                                                        )
                                                    }
                                                    checked={
                                                        field.value ?? false
                                                    }
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6} />
                </Grid>

                <Tooltip title="Uložit nastavení">
                    <Fab
                        type="submit"
                        size="large"
                        color="success"
                        aria-label="add"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <Icon path={mdiCheck} size={1} />
                    </Fab>
                </Tooltip>
            </form>
        </Box>
    );
};

export default AppSecuritySettings;
