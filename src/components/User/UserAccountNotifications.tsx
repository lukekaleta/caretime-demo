import React, { FC, useCallback, useEffect, useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    Divider,
    Fab,
    FormControlLabel,
    Grid,
    Tooltip,
    Typography,
} from '@mui/material';
import { theme } from '@/theme/index';
import useUserStore from '@/stores/userStore';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import { IPreference } from '@/interfaces/Preference';

const UserAccountNotifications: FC = () => {
    const { userData, updateUserData } = useUserStore();
    const [notifications, setNotifications] = useState<Partial<IPreference>>({
        reservationConfirmation: false,
        newChatMessage: false,
        upcomingAppointmentReminder: false,
        recommendedVisit: false,
        disableAll: false,
    });

    useEffect(() => {
        if (userData?.preference) {
            setNotifications({
                reservationConfirmation:
                    userData.preference.reservationConfirmation,
                newChatMessage: userData.preference.newChatMessage,
                upcomingAppointmentReminder:
                    userData.preference.upcomingAppointmentReminder,
                recommendedVisit: userData.preference.recommendedVisit,
                disableAll: userData.preference.disableAll,
            });
        }
    }, [userData]);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, checked } = event.target;

        if (name === 'disableAll' && checked) {
            setNotifications({
                reservationConfirmation: false,
                newChatMessage: false,
                upcomingAppointmentReminder: false,
                recommendedVisit: false,
                disableAll: true,
            });
        } else {
            setNotifications((prev) => ({
                ...prev,
                [name]: checked,
                disableAll: false,
            }));
        }
    };

    const handleSavePreferences = useCallback(async () => {
        if (userData?.id) {
            await updateUserData(userData.id, {
                preference: { ...notifications },
            });
        }
    }, [updateUserData, userData, notifications]);

    return (
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {/* Levá část */}
                <Grid item xs={12} md={8}>
                    <Card
                        sx={{
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'grey.300',
                        }}
                    >
                        <CardHeader
                            title="Preference"
                            titleTypographyProps={{ variant: 'h6' }}
                        />
                        <Divider />
                        <CardContent
                            sx={{ display: 'flex', flexDirection: 'column' }}
                        >
                            <Typography
                                variant="subtitle1"
                                gutterBottom
                                sx={{ mb: theme.spacing(4) }}
                            >
                                Chci dostávat upozornění na:
                            </Typography>

                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={
                                            notifications.reservationConfirmation
                                        }
                                        onChange={handleCheckboxChange}
                                        name="reservationConfirmation"
                                    />
                                }
                                label="Potvrzení rezervace"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={notifications.newChatMessage}
                                        onChange={handleCheckboxChange}
                                        name="newChatMessage"
                                    />
                                }
                                label="Nová zpráva v chatu s lékařem"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={
                                            notifications.upcomingAppointmentReminder
                                        }
                                        onChange={handleCheckboxChange}
                                        name="upcomingAppointmentReminder"
                                    />
                                }
                                label="Blížící se termín návštěvy (den dopředu)"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={notifications.recommendedVisit}
                                        onChange={handleCheckboxChange}
                                        name="recommendedVisit"
                                    />
                                }
                                label="Doporučená další návštěva"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                {/* Pravá část */}
                <Grid item xs={12} md={4}>
                    <Card
                        sx={{
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: 'grey.300',
                        }}
                    >
                        <CardHeader
                            title="Zrušit všechna upozornění"
                            titleTypographyProps={{ variant: 'h6' }}
                        />
                        <Divider />
                        <CardContent>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        size="small"
                                        checked={notifications.disableAll}
                                        onChange={handleCheckboxChange}
                                        name="disableAll"
                                    />
                                }
                                label="Zrušit všechna upozornění"
                                sx={{ display: 'block' }}
                            />
                            <Typography
                                variant="body2"
                                sx={{ color: theme.palette.grey[600], mb: 2 }}
                            >
                                Po zaškrtnutí této možnosti nebudete dostávat
                                žádná upozornění.
                            </Typography>
                        </CardContent>

                        <Tooltip title="Uložit preference">
                            <Fab
                                onClick={handleSavePreferences}
                                size="large"
                                color="success"
                                aria-label="add"
                                sx={{
                                    position: 'fixed',
                                    bottom: 16,
                                    right: 16,
                                }}
                            >
                                <Icon path={mdiCheck} size={1} />
                            </Fab>
                        </Tooltip>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default UserAccountNotifications;
