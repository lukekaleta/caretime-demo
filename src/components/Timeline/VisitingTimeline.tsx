import AppointmentStatus from '@/enums/AppointmentStatus';
import DateTimeFormat from '@/enums/DateTimeFormat';
import useAppointmentsStore from '@/stores/appointmentsStore';
import { convertTimestampToDayjs } from '@/utils/_deprecated/time';
import { capitalizeFirstLetter } from '@/utils/index';
import { mdiAlertCircleOutline, mdiCancel, mdiCheckAll, mdiCheckCircleOutline, mdiClockOutline, mdiCloseCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';


const VisitingTimeline: FC = () => {
    const { t: tCommon } = useTranslation('common')
    const { appointments } = useAppointmentsStore()

    const statusIconMap: Record<AppointmentStatus, string> = {
        [AppointmentStatus.pending]: mdiClockOutline,
        [AppointmentStatus.confirmed]: mdiCheckCircleOutline,
        [AppointmentStatus.cancelled]: mdiCloseCircleOutline,
        [AppointmentStatus.completed]: mdiCheckAll,
        [AppointmentStatus.missed]: mdiCancel,
    };

    const statusColorMap: Record<AppointmentStatus, 'info' | 'success' | 'warning' | 'primary' | 'error'> = {
        [AppointmentStatus.pending]: 'info',
        [AppointmentStatus.confirmed]: 'primary',
        [AppointmentStatus.cancelled]: 'error',
        [AppointmentStatus.completed]: 'success',
        [AppointmentStatus.missed]: 'warning',
    };


    const getIconByStatus = (status: AppointmentStatus): string => {
        return statusIconMap[status] || mdiAlertCircleOutline;
    };

    const getColorByStatus = (status: AppointmentStatus): 'info' | 'success' | 'warning' | 'primary' | 'error' => {
        return statusColorMap[status] || 'primary';
    };

    return (
        <Timeline position="alternate">

            {appointments.map((appointment) => (
                <TimelineItem key={appointment.id}>
                    <TimelineOppositeContent
                        sx={{ m: 'auto 0' }}
                        align="right"
                        variant="body2"
                        color="text.secondary"
                    >
                        {appointment.start && convertTimestampToDayjs(appointment.start).format(DateTimeFormat.FULL_DATE_TIME)}
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineConnector />
                        <TimelineDot color={getColorByStatus(appointment.status)}>
                            <Tooltip title={tCommon(capitalizeFirstLetter(appointment.status))}>
                                <Icon path={getIconByStatus(appointment.status)} size={1} />
                            </Tooltip>
                        </TimelineDot>
                        <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                        <Typography variant="body1" component="span" fontWeight="bold">
                            {appointment.serviceName}
                        </Typography>
                    </TimelineContent>
                </TimelineItem>
            ))}

        </Timeline>
    );
}

export default VisitingTimeline