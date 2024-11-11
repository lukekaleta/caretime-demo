import { Box, Divider, Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Timestamp } from 'firebase/firestore';

const formatWorkingHours = (startTime: Timestamp | null, endTime: Timestamp | null) => {
    if (startTime && endTime) {
        return `${dayjs(startTime.toDate()).format('HH:mm')} - ${dayjs(endTime.toDate()).format('HH:mm')}`;
    }
    return 'Zavřeno';
};

interface WorkingHoursProps {
    workingHours: {
        [key: number]: {
            startTime: Timestamp | null;
            endTime: Timestamp | null;
        };
    };
}

const WorkingHours: React.FC<WorkingHoursProps> = ({ workingHours }) => {
    const daysOfWeek = ['Pondělí', 'Úterý', 'Středa', 'Čtvrtek', 'Pátek'];

    return (
        <Box>
            <Typography variant="h6" align="center" gutterBottom>
                Otevírací doba
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={2}>
                {daysOfWeek.map((day, index) => (
                    <Grid item xs={12} key={index}>
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                            <Typography variant="body1" fontWeight="bold">
                                {day}:
                            </Typography>
                            <Typography variant="body2" color={workingHours[index + 1]?.startTime ? 'textPrimary' : 'textSecondary'}>
                                {formatWorkingHours(workingHours[index + 1]?.startTime, workingHours[index + 1]?.endTime)}
                            </Typography>
                        </Box>
                        {index < daysOfWeek.length - 1 && <Divider sx={{ my: 1 }} />}
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default WorkingHours;