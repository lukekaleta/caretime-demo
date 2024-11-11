import csLocale from '@fullcalendar/core/locales/cs';

export const calendarConfig = {
    locale: csLocale,
    weekends: true,
    height: '71vh',
    businessHours: {
        // Pracovní hodiny: Pondělí až pátek, od 7:00 do 15:30
        daysOfWeek: [1, 2, 3, 4, 5], // Pondělí až pátek
        startTime: '07:00', // Začátek pracovního dne
        endTime: '15:30', // Konec pracovního dne
    },
    slotMinTime: '07:00:00', // Čas, kdy kalendář začíná zobrazovat (v denním zobrazení)
    slotMaxTime: '16:00:00', // Čas, kdy kalendář přestane zobrazovat (v denním zobrazení)
    hiddenDays: [0, 6], // Skryje neděli (0) a sobotu (6)
    headerToolbar: {
        left: '',
        center: '',
        right: '',
    },
};
