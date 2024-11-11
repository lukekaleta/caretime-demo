import { Button } from '@/components/Button';
import useCalendarStore from '@/stores/calendarStore';
import {
    Box,
    ButtonGroup,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface CalendarToolbarProps {
    handlePrevClick: () => void;
    handleNextClick: () => void;
    handleViewChange: (viewName: string) => void;
    currentView: string;
    today: dayjs.Dayjs;
}

const CalendarToolbar: FC<CalendarToolbarProps> = ({
    handlePrevClick,
    handleNextClick,
    handleViewChange,
    currentView,
    today,
}) => {
    const { t } = useTranslation('calendar');
    const { setSelectedDay, setSelectedMonth, setSelectedYear } =
        useCalendarStore();

    const handleSelectChange = (event: SelectChangeEvent<string>, type: 'day' | 'month' | 'year') => {
        const value = event.target.value;
        if (type === 'day') {
            const selectedDate = dayjs(new Date(today.year(), today.month(), Number(value)));
            setSelectedDay(selectedDate.toDate());
        } else if (type === 'month') {
            const selectedDate = dayjs(new Date(today.year(), Number(value) - 1, today.date()));
            setSelectedMonth(Number(value) - 1);
            setSelectedDay(selectedDate.toDate());
        } else if (type === 'year') {
            const selectedDate = dayjs(new Date(Number(value), today.month(), today.date()));
            setSelectedYear(Number(value));
            setSelectedDay(selectedDate.toDate());
        }
    };

    return (
        <Box display="flex" alignItems="center" mb={2}>
            <ButtonGroup size="small" aria-label="navigation button group">
                <Button
                    size="small"
                    variant="contained"
                    onClick={handlePrevClick}
                >
                    {t('Previous') as String}
                </Button>
                <Button
                    size="small"
                    variant="contained"
                    onClick={handleNextClick}
                >
                    {t('Next') as String}
                </Button>
            </ButtonGroup>

            <Box
                display="flex"
                alignItems="center"
                flexGrow={1}
                justifyContent="center"
            >
                <Select
                    size="small"
                    value={today.date().toString()} // Pouze den
                    onChange={(e) => handleSelectChange(e, 'day')}
                    variant="outlined"
                >
                    {Array.from({ length: 31 }, (_, index) => (
                        <MenuItem key={index + 1} value={(index + 1).toString()}>
                            {index + 1}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    value={(today.month() + 1).toString()} // Pouze měsíc
                    onChange={(e) => handleSelectChange(e, 'month')}
                    variant="outlined"
                    sx={{ mx: 1 }}
                >
                    {Array.from({ length: 12 }, (_, index) => (
                        <MenuItem key={index + 1} value={(index + 1).toString()}>
                            {dayjs().month(index).format('MMMM')}
                        </MenuItem>
                    ))}
                </Select>

                <Select
                    size="small"
                    value={today.year().toString()} // Pouze rok
                    onChange={(e) => handleSelectChange(e, 'year')}
                    variant="outlined"
                >
                    {Array.from({ length: 10 }, (_, index) => (
                        <MenuItem key={today.year() + index} value={(today.year() + index).toString()}>
                            {today.year() + index}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <ButtonGroup size="small" aria-label="view mode button group">
                <Button
                    size="small"
                    variant={
                        currentView === 'dayGridMonth'
                            ? 'contained'
                            : 'outlined'
                    }
                    onClick={() => handleViewChange('dayGridMonth')}
                >
                    {t('Month View') as String}
                </Button>
                <Button
                    size="small"
                    variant={
                        currentView === 'timeGridWeek'
                            ? 'contained'
                            : 'outlined'
                    }
                    onClick={() => handleViewChange('timeGridWeek')}
                >
                    {t('Week View') as String}
                </Button>
                <Button
                    size="small"
                    variant={
                        currentView === 'timeGridDay' ? 'contained' : 'outlined'
                    }
                    onClick={() => handleViewChange('timeGridDay')}
                >
                    {t('Day View') as String}
                </Button>
            </ButtonGroup>
        </Box>
    );
};

export default CalendarToolbar;