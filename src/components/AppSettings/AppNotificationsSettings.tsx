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
    Tooltip,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useAppSettingsStore from '@/stores/appSettingsStore';
import { defaultAppConfig } from '@/config/appConfig';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import useUserStore from '@/stores/userStore';
import { AppSettingsNotificationsPermissions } from '@/enums/Permissions';

interface FormValues {
    enableGlobalNotifications: boolean;
    enableEmailNotifications: boolean;
    enableSmsNotifications: boolean;
    enablePushNotifications: boolean;
}

const AppNotificationsSettings: FC = () => {
    const { settings, updateSettings } = useAppSettingsStore();
    const { hasPermission } = useUserStore();

    const { control, handleSubmit, setValue } = useForm<FormValues>({
        defaultValues: {
            enableGlobalNotifications:
                settings.notifications.enableGlobalNotifications ||
                defaultAppConfig.notifications.enableGlobalNotifications,
            enableEmailNotifications:
                settings.notifications.enableEmailNotifications ||
                defaultAppConfig.notifications.enableEmailNotifications,
            enableSmsNotifications:
                settings.notifications.enableSmsNotifications ||
                defaultAppConfig.notifications.enableSmsNotifications,
            enablePushNotifications:
                settings.notifications.enablePushNotifications ||
                defaultAppConfig.notifications.enablePushNotifications,
        },
    });

    useEffect(() => {
        if (settings && settings.notifications) {
            setValue(
                'enableGlobalNotifications',
                settings.notifications.enableGlobalNotifications || false
            );
            setValue(
                'enableEmailNotifications',
                settings.notifications.enableEmailNotifications || false
            );
            setValue(
                'enableSmsNotifications',
                settings.notifications.enableSmsNotifications || false
            );
            setValue(
                'enablePushNotifications',
                settings.notifications.enablePushNotifications || false
            );
        }
    }, [settings, setValue]);

    const onSubmit = useCallback(
        async (data: FormValues) => {
            await updateSettings({ notifications: data });
        },
        [updateSettings]
    );

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                    {/* Levá polovina */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'grey.300',
                            }}
                        >
                            <CardHeader
                                title="Nastavení notifikací"
                                titleTypographyProps={{ variant: 'h6' }}
                            />
                            <Divider />
                            <CardContent>
                                {/* Povolit globální notifikace */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Povolit globální notifikace
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="enableGlobalNotifications"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsNotificationsPermissions.CanAllowGlobalNotifications
                                                        )
                                                    }
                                                    checked={field.value}
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

                                {/* Povolit zasílání emailů */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Povolit zasílání emailů
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="enableEmailNotifications"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsNotificationsPermissions.CanAllowSendingEmails
                                                        )
                                                    }
                                                    checked={field.value}
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

                                {/* Povolit zasílání SMS */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Povolit zasílání SMS
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="enableSmsNotifications"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsNotificationsPermissions.CanAllowSendingSms
                                                        )
                                                    }
                                                    checked={field.value}
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

                                {/* Povolit zasílání push */}
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="space-between"
                                    sx={{ mt: 2 }}
                                >
                                    <Grid item>
                                        <Typography variant="body1">
                                            Povolit zasílání push
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Controller
                                            name="enablePushNotifications"
                                            control={control}
                                            render={({ field }) => (
                                                <Switch
                                                    disabled={
                                                        !hasPermission(
                                                            AppSettingsNotificationsPermissions.CanAllowSendingPushNotifications
                                                        )
                                                    }
                                                    checked={field.value}
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

export default AppNotificationsSettings;
