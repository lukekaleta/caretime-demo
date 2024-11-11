import { Paper } from "@/components/Paper";
import AppointmentStatus from "@/enums/AppointmentStatus";
import DateTimeFormat from "@/enums/DateTimeFormat";
import useAppointmentsStore from "@/stores/appointmentsStore";
import { convertTimestampToDayjs } from "@/utils/_deprecated/time";
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Typography } from "@mui/material";
import { FC } from "react";

const TimelineWidget: FC = () => {
    const { appointments } = useAppointmentsStore()
    const filteredAppointments = appointments.filter((a) => a.status === AppointmentStatus.pending)

    return (
        <Paper>
            <Box display="flex" flexDirection="column">
                <Typography variant="h6" fontWeight={500}>
                    Časová osa proběhlých rezervací
                </Typography>

                <Timeline position="alternate">

                    {filteredAppointments.map((appointment) => (
                        <TimelineItem key={appointment.id}>
                            <TimelineOppositeContent color="text.secondary">
                                <Typography variant="body2">
                                    {appointment.start && convertTimestampToDayjs(appointment.start).format(DateTimeFormat.FULL_DATE)}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot color="info" />
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Typography variant="body2">
                                    {appointment.serviceName}
                                </Typography>
                                <Typography variant="body2">
                                    {appointment.end && convertTimestampToDayjs(appointment.end).format(DateTimeFormat.FULL_DATE)}
                                </Typography>
                            </TimelineContent>
                        </TimelineItem>
                    ))}

                </Timeline>
            </Box>
        </Paper>
    )
}

export default TimelineWidget