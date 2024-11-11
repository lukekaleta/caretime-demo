import { ClientDetailLoading } from '@/components/Clients';
import { Paper } from '@/components/Paper';
import { VisitingTimeline } from '@/components/Timeline';
import { RouteNames } from '@/enums/RouteNames';
import useAppointmentsStore from '@/stores/appointmentsStore';
import useClientStore from '@/stores/clientsStore';
import { theme } from '@/theme/index';
import { formatIsoDate } from '@/utils/datetime';
import {
    formatBirthNumber,
    generateGoogleMapsLink,
    parseBirthNumber,
} from '@/utils/index';
import {
    mdiCalendar,
    mdiEmail,
    mdiMapMarker,
    mdiPencil,
    mdiPhone,
    mdiPlus,
} from '@mdi/js';
import Icon from '@mdi/react';
import {
    Avatar,
    Backdrop,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

const ClientDetail: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { fetchClientAppointments } = useAppointmentsStore();
    const { isFetchingClientDetails, fetchClientDetail, clientDetail } =
        useClientStore();

    const selectedClientFullAddress = `${clientDetail?.address?.street}, ${clientDetail?.address?.city}, ${clientDetail?.address?.zip}`;
    const dateOfBirth =
        clientDetail && parseBirthNumber(clientDetail?.birthNumber);

    const handleEditClient = useCallback(() => {
        navigate(`${RouteNames.ClientManager}/${id}`);
    }, [navigate]);

    const handleCreateEvent = useCallback(() => {
        console.log('Ready to create event!');
    }, []);

    useEffect(() => {
        if (id) {
            fetchClientDetail(id);
        }
    }, [id, fetchClientDetail]);

    useEffect(() => {
        if (clientDetail?.id) {
            fetchClientAppointments(clientDetail.id);
        }
    }, [clientDetail, clientDetail?.id, fetchClientAppointments])

    if (isFetchingClientDetails || !clientDetail) {
        return <ClientDetailLoading />;
    }

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[300],
                                }}
                            >
                                <CardHeader
                                    avatar={<Avatar />}
                                    title={clientDetail.lastName}
                                    subheader={clientDetail.firstName}
                                    titleTypographyProps={{
                                        variant: 'body1',
                                        fontWeight:
                                            theme.typography.fontWeightBold,
                                    }}
                                />
                                <Divider />
                                <CardContent>
                                    <List>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    href={`tel:${clientDetail.phoneNumber}`}
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <Icon
                                                        color={
                                                            theme.palette
                                                                .success.main
                                                        }
                                                        path={mdiPhone}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary="Telefon"
                                                secondary={
                                                    clientDetail.phoneNumber
                                                }
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    href={`mailto:${clientDetail.email}`}
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <Icon
                                                        color={
                                                            theme.palette
                                                                .primary.main
                                                        }
                                                        path={mdiEmail}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary="Email"
                                                secondary={clientDetail.email}
                                            />
                                        </ListItem>
                                        <ListItem
                                            secondaryAction={
                                                <IconButton
                                                    target="_blank"
                                                    href={generateGoogleMapsLink(
                                                        selectedClientFullAddress
                                                    )}
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <Icon
                                                        color={
                                                            theme.palette
                                                                .secondary.main
                                                        }
                                                        path={mdiMapMarker}
                                                        size={1}
                                                    />
                                                </IconButton>
                                            }
                                        >
                                            <ListItemText
                                                primary="Adresa"
                                                secondary={
                                                    selectedClientFullAddress
                                                }
                                            />
                                        </ListItem>
                                    </List>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[300],
                                }}
                            >
                                <CardHeader
                                    title="Základní informace"
                                    titleTypographyProps={{
                                        variant: 'body1',
                                    }}
                                />
                                <Divider />
                                <CardContent>
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                    >
                                                        Datum narození:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {dateOfBirth &&
                                                            formatIsoDate(
                                                                dateOfBirth
                                                            )}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <Typography
                                                        variant="body1"
                                                        fontWeight="bold"
                                                    >
                                                        Rodné číslo:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography variant="body1">
                                                        {clientDetail &&
                                                            formatBirthNumber(
                                                                clientDetail.birthNumber
                                                            )}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12}>
                            <Card
                                sx={{
                                    boxShadow: 'none',
                                    border: '1px solid',
                                    borderColor: theme.palette.grey[300],
                                }}
                            >
                                <CardHeader
                                    title="Historie návštěv"
                                    titleTypographyProps={{
                                        variant: 'body1',
                                    }}
                                />
                                <Divider />
                                <CardContent>
                                    <VisitingTimeline />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

            <Backdrop open={open} />
            <SpeedDial
                onClose={handleClose}
                onClick={handleOpen}
                open={open}
                ariaLabel="Floating Action Menu"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon icon={<Icon path={mdiPlus} size={1} />} />}
            >
                <SpeedDialAction
                    onClick={handleEditClient}
                    tooltipOpen
                    icon={<Icon path={mdiPencil} size={1} />}
                    tooltipTitle="Upravit"
                />
                <SpeedDialAction
                    onClick={handleCreateEvent}
                    tooltipOpen
                    icon={<Icon path={mdiCalendar} size={1} />}
                    tooltipTitle="Naplánovat"
                />
            </SpeedDial>
        </Paper>
    );
};

export default ClientDetail;
