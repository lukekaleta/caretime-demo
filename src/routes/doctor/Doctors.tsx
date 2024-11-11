import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { RouteNames } from '@/enums/RouteNames';
import { IDoctor } from '@/interfaces/Doctor';
import useDoctorsStore from '@/stores/doctorsStore';
import { theme } from '@/theme/index';
import { mdiDotsVertical, mdiEmailOutline, mdiPhoneOutline } from '@mdi/js';
import Icon from '@mdi/react';
import {
    Avatar,
    Box,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    Menu,
    MenuItem,
    Paper,
    Tooltip,
} from '@mui/material';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

const Doctors: FC = () => {
    const { t } = useTranslation('doctors');
    const { doctors, fetchDoctors, isFetchingDoctors } = useDoctorsStore();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<IDoctor | null>(null);

    const handleCreateAppointmentRedirect = useCallback(
        (id?: string) => {
            if (id) {
                navigate(`${RouteNames.CreateAppointment}/${id}`);
            }
        },
        [navigate]
    );

    const handleDoctorCalendarRedirect = useCallback(
        (id?: string) => {
            if (id) {
                navigate(`${RouteNames.DoctorCalendar}/${id}`);
            }
        },
        [navigate]
    );

    const handleOpenDoctorMenu = useCallback(
        (event: React.MouseEvent<HTMLElement>, doctor: IDoctor) => {
            setAnchorEl(event.currentTarget);
            setSelectedDoctor(doctor);
        },
        []
    );

    const handleCloseMenu = useCallback(() => {
        setAnchorEl(null);
    }, []);

    const handleEditServices = useCallback(() => {
        if (selectedDoctor) {
            navigate(`${RouteNames.ServicesManager}/${selectedDoctor.id}`);
        }
        handleCloseMenu();
    }, [navigate, selectedDoctor, handleCloseMenu]);

    const handleEditOpeningHours = useCallback(() => {
        if (selectedDoctor) {
            navigate(`${RouteNames.DoctorOpeningHoursManager}/${selectedDoctor.id}`);
        }
        handleCloseMenu();
    }, [navigate, selectedDoctor, handleCloseMenu]);

    useEffect(() => {
        fetchDoctors();
    }, [fetchDoctors]);

    return (
        <Paper sx={{ p: 2, boxShadow: 'none' }}>
            <Box>
                <Grid container spacing={2}>
                    {doctors.map((doctor: IDoctor) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={doctor.id}>
                            <Card
                                withHeaderDivider
                                avatar={<Avatar src={doctor.profilePicture} />}
                                title={`${doctor.titleBefore || ''} ${doctor.firstName}`}
                                subtitle={`${doctor.lastName} ${doctor.titleAfter || ''}`}
                                action={
                                    <IconButton
                                        onClick={(event) =>
                                            handleOpenDoctorMenu(event, doctor)
                                        }
                                    >
                                        <Icon path={mdiDotsVertical} size={1} />
                                    </IconButton>
                                }
                                footer={
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}
                                    >
                                        <Button
                                            color="primary"
                                            size="small"
                                            onClick={() =>
                                                handleCreateAppointmentRedirect(
                                                    doctor.id
                                                )
                                            }
                                        >
                                            <>{t('Reservation')}</>
                                        </Button>
                                        <Button
                                            color="secondary"
                                            size="small"
                                            onClick={() =>
                                                handleDoctorCalendarRedirect(
                                                    doctor.id
                                                )
                                            }
                                        >
                                            <>{t('Calendar')}</>
                                        </Button>
                                    </Box>
                                }
                            >
                                <List dense>
                                    <ListItem
                                        sx={{ p: 1 }}
                                        secondaryAction={
                                            <Tooltip
                                                title={t('Call') as string}
                                            >
                                                <IconButton
                                                    href={`tel:${doctor.phoneNumber}`}
                                                    edge="end"
                                                    aria-label="phoneNumber"
                                                >
                                                    <Icon
                                                        color={
                                                            theme.palette
                                                                .success.light
                                                        }
                                                        path={mdiPhoneOutline}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    >
                                        <ListItemText
                                            primary="Telefon"
                                            secondary={doctor.phoneNumber}
                                        />
                                    </ListItem>
                                    <ListItem
                                        sx={{ p: 1 }}
                                        secondaryAction={
                                            <Tooltip
                                                title={
                                                    t('Send email') as string
                                                }
                                            >
                                                <IconButton
                                                    href={`mailto:${doctor.email}`}
                                                    edge="end"
                                                    aria-label="email"
                                                >
                                                    <Icon
                                                        color={
                                                            theme.palette
                                                                .warning.light
                                                        }
                                                        path={mdiEmailOutline}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    >
                                        <ListItemText
                                            primary="E-mail"
                                            secondary={doctor.email}
                                        />
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Menu pro úpravu služeb */}
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                >
                    <MenuItem onClick={handleEditServices}>
                        {t('Edit Services')}
                    </MenuItem>
                    <MenuItem onClick={handleEditOpeningHours}>
                        {t('Edit opening hours')}
                    </MenuItem>
                </Menu>
            </Box>
        </Paper>
    );
};

export default Doctors;
