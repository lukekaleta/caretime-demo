export const calculateDateRange = (
    currentView: string,
    selectedDay: Date,
    selectedMonth: number,
    selectedYear: number
): { start: Date; end: Date } => {
    let start: Date, end: Date;

    switch (currentView) {
        case 'dayGridMonth':
            start = new Date(selectedYear, selectedMonth, 1);
            end = new Date(selectedYear, selectedMonth + 1, 0);
            break;
        case 'timeGridWeek':
            start = new Date(selectedDay);
            const dayOfWeek = start.getDay();
            start.setDate(start.getDate() - dayOfWeek);
            end = new Date(start);
            end.setDate(start.getDate() + 6);
            break;
        case 'timeGridDay':
            start = new Date(selectedDay);
            end = new Date(selectedDay);
            break;
        default:
            throw new Error('Unsupported calendar view');
    }

    return { start, end };
};
