import { calendarConfig } from '@/config/calendarConfig';
import { IService } from '@/interfaces/Service';
import useAppointmentsStore from '@/stores/appointmentsStore';
import useDoctorStore from '@/stores/doctorStore';
import { generateTimeSlots } from '@/utils/_deprecated/time';
import { mdiClock } from '@mdi/js';
import Icon from '@mdi/react';
import { Chip, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs, { Dayjs } from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import { FC, useMemo } from 'react';

dayjs.extend(updateLocale);
dayjs.updateLocale('cs', {
    week: {
        dow: 1,
    },
});

interface DateAndTimeSelectionProps {
    selectedService: IService | null;
    selectedDate: dayjs.Dayjs | null;
    handleSelectDate: (date: dayjs.Dayjs | null) => void;
    selectedTime: string;
    handleSelectTime: (time: string) => void;
}

const DateAndTimeSelection: FC<DateAndTimeSelectionProps> = ({
    selectedService,
    selectedDate,
    handleSelectDate,
    selectedTime,
    handleSelectTime,
}) => {
    const { doctorDetail } = useDoctorStore();
    const { appointments } = useAppointmentsStore()

    const defaultWorkingDays = calendarConfig.businessHours.daysOfWeek;

    const generatedTimeSlots = useMemo(() => {
        if (!selectedService?.defaultDuration || !selectedDate) return [];

        const dayOfWeek = selectedDate.day();
        const duration = selectedService.defaultDuration;

        const serviceStartTime = selectedService.startTime ? dayjs(selectedService.startTime.toDate()) : null;
        const serviceEndTime = selectedService.endTime ? dayjs(selectedService.endTime.toDate()) : null;

        const doctorWorkingHours = doctorDetail?.workingHours[dayOfWeek];
        const startTime = serviceStartTime || (doctorWorkingHours?.startTime ? dayjs(doctorWorkingHours.startTime.toDate()) : null);
        const endTime = serviceEndTime || (doctorWorkingHours?.endTime ? dayjs(doctorWorkingHours.endTime.toDate()) : null);

        if (!startTime || !endTime) {
            return [];
        }

        return generateTimeSlots(duration, startTime, endTime, appointments);
    }, [selectedService, selectedDate, doctorDetail]);

    const shouldDisableDate = (date: Dayjs) => {
        const dayOfWeek = date.day();
        const daysToUse = selectedService && selectedService?.days.length > 0 ? selectedService.days : defaultWorkingDays;

        return !daysToUse.includes(dayOfWeek);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="cs">
                    <DateCalendar
                        value={selectedDate}
                        onChange={handleSelectDate}
                        minDate={dayjs().add(1, 'day')}
                        shouldDisableDate={shouldDisableDate}
                        disablePast
                        sx={{
                            width: 300,
                            height: 400,
                            '& .MuiPickersDay-root': {
                                width: 32,
                                height: 32,
                                margin: '4px',
                                fontSize: '1rem',
                            },
                        }}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
                {generatedTimeSlots?.map((timeSlot: string) => (
                    <Chip
                        onClick={() => handleSelectTime(timeSlot)}
                        color="primary"
                        icon={<Icon path={mdiClock} size={0.7} />}
                        variant={
                            selectedTime === timeSlot ? 'filled' : 'outlined'
                        }
                        sx={{ m: 1, cursor: 'pointer' }}
                        label={timeSlot}
                        key={timeSlot}
                    />
                ))}
            </Grid>
        </Grid>
    );
};

export default DateAndTimeSelection;