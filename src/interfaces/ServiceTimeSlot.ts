export interface IServiceTimeSlot {
    startTime: string; // Začátek časového slotu (např. "08:00")
    endTime: string; // Konec časového slotu (např. "10:00")
    daysOfWeek: never[]; // Dny v týdnu, kdy je služba dostupná (0 - neděle, 6 - sobota)
}
