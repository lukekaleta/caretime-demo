import { DashboardWidget, NewsWidget, TimelineWidget } from '@/components/Widgets';
import useReservationCount from '@/hooks/useReservationCount';
import { IWidget } from '@/interfaces/Widget';
import useAppointmentsStore from '@/stores/appointmentsStore';
import useUserStore from '@/stores/userStore';
import { mdiAlarmCheck, mdiCalendarClock, mdiCancel, mdiTimerSand } from '@mdi/js';
import { Box, Grid2 as Grid } from '@mui/material';
import { FC, useEffect } from 'react';

const Dashboard: FC = () => {
    const { appointments, fetchClientAppointments } = useAppointmentsStore();
    const { userData } = useUserStore();
    const { missed, pending, confirmed, completed } = useReservationCount(appointments);

    useEffect(() => {
        if (userData?.id) {
            fetchClientAppointments(userData.id);
        }
    }, [fetchClientAppointments, userData?.id]);

    const widgetConfig: IWidget[] = [
        { title: 'Čekající rezervace', value: pending, icon: mdiTimerSand, bgColor: 'primary' },
        { title: 'Blížící se rezervace', value: confirmed, icon: mdiCalendarClock, bgColor: 'warning' },
        { title: 'Promeškané rezervace', value: missed, icon: mdiCancel, bgColor: 'secondary' },
        { title: 'Proběhlé rezervace', value: completed, icon: mdiAlarmCheck, bgColor: 'success' },
    ];

    return (
        <Box display="grid" gap={2}>
            <Grid container spacing={2}>
                {widgetConfig.map((widget, index) => (
                    <Grid key={index} size={{ xs: 12, sm: 6, md: 4, xl: 3 }}>
                        <DashboardWidget
                            bgColor={widget.bgColor}
                            title={widget.title}
                            value={widget.value}
                            icon={widget.icon}
                        />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <NewsWidget />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <TimelineWidget />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;