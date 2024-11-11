import React, { FC, useCallback, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Fab,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import useAppSettingsStore from '@/stores/appSettingsStore';
import { defaultAppConfig } from '@/config/appConfig';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import useUserStore from '@/stores/userStore';
import { AppSettingsGeneralPermissions } from '@/enums/Permissions';

interface FormValues {
    defaultLanguage: string;
    defaultCurrency: string;
    allowDarkMode: string;
    maxUploadFileSize: number;
    defaultTimezone: string;
    allowClientRegistration: string;
    maxUsers: number;
    maxClients: number;
    maxDoctors: number;
    maxManagers: number;
    maxReceptionists: number;
    maxNurses: number;
}

const AppGeneralSettings: FC = () => {
    const { handleSubmit, control, setValue } = useForm<FormValues>();
    const { updateSettings, settings, loading } = useAppSettingsStore();
    const { hasPermission } = useUserStore();

    useEffect(() => {
        if (settings) {
            setValue(
                'defaultLanguage',
                settings.defaultLanguage || defaultAppConfig.defaultLanguage
            );
            setValue(
                'defaultCurrency',
                settings.defaultCurrency || defaultAppConfig.defaultCurrency
            );
            setValue(
                'allowDarkMode',
                settings.allowDarkMode || defaultAppConfig.allowDarkMode
            );
            setValue(
                'maxUploadFileSize',
                settings.maxUploadFileSize || defaultAppConfig.maxUploadFileSize
            );
            setValue(
                'defaultTimezone',
                settings.defaultTimezone || defaultAppConfig.defaultTimezone
            );
            setValue(
                'allowClientRegistration',
                settings.allowClientRegistration ||
                    defaultAppConfig.allowClientRegistration
            );
            setValue(
                'maxUsers',
                settings.maxUsers || defaultAppConfig.maxUsers
            );
            setValue(
                'maxClients',
                settings.maxClients || defaultAppConfig.maxClients
            );
            setValue(
                'maxDoctors',
                settings.maxDoctors || defaultAppConfig.maxDoctors
            );
            setValue(
                'maxManagers',
                settings.maxManagers || defaultAppConfig.maxManagers
            );
            setValue(
                'maxReceptionists',
                settings.maxReceptionists || defaultAppConfig.maxReceptionists
            );
            setValue(
                'maxNurses',
                settings.maxNurses || defaultAppConfig.maxNurses
            );
        }
    }, [settings, setValue]);

    const onSubmit: SubmitHandler<FormValues> = useCallback(
        async (data) => {
            await updateSettings(data);
        },
        [updateSettings]
    );

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    {/* Levý sloupec - Nastavení aplikace */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'grey.300',
                            }}
                        >
                            <CardHeader
                                title="Nastavení aplikace"
                                titleTypographyProps={{ variant: 'h6' }}
                            />
                            <Divider />
                            <CardContent>
                                {/* Vychozi jazyk */}
                                <Controller
                                    name="defaultLanguage"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>
                                                Výchozí jazyk
                                            </InputLabel>
                                            <Select
                                                disabled={
                                                    !hasPermission(
                                                        AppSettingsGeneralPermissions.CanSwitchLanguages
                                                    )
                                                }
                                                label="Výchozí jazyk"
                                                {...field}
                                                value={
                                                    field.value ||
                                                    defaultAppConfig.defaultLanguage
                                                }
                                            >
                                                <MenuItem value="CZ">
                                                    Čeština
                                                </MenuItem>
                                                <MenuItem value="SK">
                                                    Slovenština
                                                </MenuItem>
                                                <MenuItem value="EN">
                                                    Angličtina
                                                </MenuItem>
                                                <MenuItem value="PL">
                                                    Polština
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />

                                {/* Vychozi mena */}
                                <Controller
                                    name="defaultCurrency"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>
                                                Výchozí měna
                                            </InputLabel>
                                            <Select
                                                disabled={
                                                    !hasPermission(
                                                        AppSettingsGeneralPermissions.CanSwitchCurrency
                                                    )
                                                }
                                                label="Výchozí měna"
                                                {...field}
                                                value={
                                                    field.value ||
                                                    defaultAppConfig.defaultCurrency
                                                }
                                            >
                                                <MenuItem value="EUR">
                                                    EUR
                                                </MenuItem>
                                                <MenuItem value="CZK">
                                                    CZK
                                                </MenuItem>
                                                <MenuItem value="PLN">
                                                    PLN
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />

                                {/* Povolit tmavy rezim */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanAllowDarkMode
                                        )
                                    }
                                    name="allowDarkMode"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>
                                                Povolit tmavý režim
                                            </InputLabel>
                                            <Select
                                                label="Povolit tmavý režim"
                                                {...field}
                                                value={
                                                    field.value ||
                                                    defaultAppConfig.allowDarkMode
                                                }
                                            >
                                                <MenuItem value="allow">
                                                    Povoleno
                                                </MenuItem>
                                                <MenuItem value="disabled">
                                                    Zakázáno
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />

                                {/* Maximalni velikost nahravaneho souboru */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanSetMaximumOfUploadingFiles
                                        )
                                    }
                                    name="maxUploadFileSize"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Maximální velikost nahrávaného souboru (MB)"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Pravý sloupec - Nastavení registrace */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                boxShadow: 'none',
                                border: '1px solid',
                                borderColor: 'grey.300',
                            }}
                        >
                            <CardHeader
                                title="Nastavení registrace"
                                titleTypographyProps={{ variant: 'h6' }}
                            />
                            <Divider />
                            <CardContent>
                                {/* Povolit registrace */}
                                <Controller
                                    name="allowClientRegistration"
                                    control={control}
                                    render={({ field }) => (
                                        <FormControl fullWidth margin="normal">
                                            <InputLabel>
                                                Povolit registrace
                                            </InputLabel>
                                            <Select
                                                disabled={
                                                    !hasPermission(
                                                        AppSettingsGeneralPermissions.CanAllowRegistrations
                                                    )
                                                }
                                                label="Povolit registrace"
                                                {...field}
                                                value={
                                                    field.value ||
                                                    defaultAppConfig.allowClientRegistration
                                                }
                                            >
                                                <MenuItem value="allow">
                                                    Povoleno
                                                </MenuItem>
                                                <MenuItem value="disabled">
                                                    Zakázáno
                                                </MenuItem>
                                            </Select>
                                        </FormControl>
                                    )}
                                />

                                {/* Maximální počet uživatelů */}
                                <Controller
                                    name="maxUsers"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            disabled={
                                                !hasPermission(
                                                    AppSettingsGeneralPermissions.CanSetMaximumUsers
                                                )
                                            }
                                            label="Maximální počet uživatelů"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />

                                {/* Maximální počet klientů */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanSetMaximumClients
                                        )
                                    }
                                    name="maxClients"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Maximální počet klientů"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />

                                {/* Maximální počet doktorů */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanSetMaximumProviders
                                        )
                                    }
                                    name="maxDoctors"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Maximální počet doktorů"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />

                                {/* Maximální počet manažerů */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanSetMaximumManagers
                                        )
                                    }
                                    name="maxManagers"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Maximální počet manažerů"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />

                                {/* Maximální počet recepčních */}
                                <Controller
                                    disabled={
                                        !hasPermission(
                                            AppSettingsGeneralPermissions.CanSetMaximumReceptions
                                        )
                                    }
                                    name="maxReceptionists"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Maximální počet recepčních"
                                            type="number"
                                            fullWidth
                                            {...field}
                                            margin="normal"
                                        />
                                    )}
                                />
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

export default AppGeneralSettings;
