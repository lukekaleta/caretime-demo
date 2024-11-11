import { Dialog, DialogContentEventDetail } from '@/components/Dialog';
import { calendarConfig } from '@/config/calendarConfig';
import { useEventColor } from '@/hooks/useEventColor';
import { IAppointment } from '@/interfaces/Appointment';
import useCalendarStore from '@/stores/calendarStore';
import useDialogStore from '@/stores/dialogStore';
import { EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box } from '@mui/material';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CalendarToolbar from './CalendarToolbar';

dayjs.extend(localizedFormat);
dayjs.extend(duration);

interface ICalendarState {
    selectedEvent: IAppointment | null
}

interface ICalendarProps {
    userId: string | undefined;
}

const Calendar: FC<ICalendarProps> = ({ userId }) => {
    const [state, setState] = useState<ICalendarState>({
        selectedEvent: null
    })

    const { t } = useTranslation('calendar');
    const { events, selectedDay, currentView, setCurrentView, fetchEvents } = useCalendarStore();
    const calendarRef = useRef<any>(null);
    const { getEventColor } = useEventColor();
    const { openDialog } = useDialogStore();

    useEffect(() => {
        const calendarApi = calendarRef.current.getApi();
        if (selectedDay) {
            calendarApi.gotoDate(selectedDay);
        }
    }, [selectedDay]);

    useEffect(() => {
        if (userId) {
            fetchEvents(userId);
        }
    }, [userId, currentView, selectedDay]);

    const handleSelectEvent = useCallback((clickInfo: EventClickArg) => {
        // Získání detailu události z clickInfo.event.extendedProps, kde jsou uložena data z FullCalendar
        const event: IAppointment = clickInfo.event.extendedProps as IAppointment;

        // Aktualizace state se zvolenou událostí
        setState((prevState) => ({
            ...prevState,
            selectedEvent: event
        }));

        // Otevření dialogu s detaily události
        openDialog(
            event.serviceName,
            <DialogContentEventDetail
                title={event.serviceName}
                start={event.start}
                end={event.end}
                status={event.status}
                note={event.notes}
                clientName={'TODO: Doplnit'}
                durationText={'TODO: chybi ve '}
            />,
            () => { }
        );
    }, [openDialog]);

    const handleViewChange = (view: string) => {
        setCurrentView(view);
        const calendarApi = calendarRef.current.getApi();
        calendarApi.changeView(view);
        if (userId) {
            fetchEvents(userId);
        }
    };

    return (
        <Box>
            <Dialog hideConfirmButton cancelButtonText={t('Close')} />
            <CalendarToolbar
                handlePrevClick={() => {
                    calendarRef.current.getApi().prev();
                    if (userId) {
                        fetchEvents(userId);
                    }
                }}
                handleNextClick={() => {
                    calendarRef.current.getApi().next();
                    if (userId) {
                        fetchEvents(userId);
                    }
                }}
                handleViewChange={handleViewChange}
                currentView={currentView}
                today={dayjs()}
            />
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin]}
                initialView={currentView}
                events={events.map((event) => ({
                    title: event.serviceName,
                    start: event.start,
                    end: event.end,
                    extendedProps: event,
                    ...getEventColor(event.status),
                }))}
                eventClick={handleSelectEvent}
                eventContent={(eventInfo) => (
                    <div
                        style={{
                            backgroundColor: eventInfo.backgroundColor,
                            color: eventInfo.textColor,
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease',
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLDivElement).style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLDivElement).style.backgroundColor = eventInfo.backgroundColor;
                        }}
                    >
                        {eventInfo.event.title}
                    </div>
                )}
                {...calendarConfig}
            />
        </Box>
    );
};

export default Calendar;