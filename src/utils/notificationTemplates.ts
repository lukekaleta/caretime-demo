import { NotificationStatus } from '@/enums/NotificationStatus';

interface NotificationTemplate {
    title: string;
    message: string;
    status: NotificationStatus;
    link?: string;
}

const notificationTemplates: Record<string, NotificationTemplate> = {
    reservationCreated: {
        title: 'Rezervace byla vytvořena',
        message: 'Prosím, vyčkejte na potvrzení rezervace lékařem.',
        status: NotificationStatus.info,
        link: '/reservations',
    },
    reservationConfirmed: {
        title: 'Rezervace byla potvrzena',
        message: 'Vaše rezervace byla lékařem potvrzena.',
        status: NotificationStatus.success,
        link: '/reservations',
    },
    reservationCancelled: {
        title: 'Rezervace byla zrušena',
        message: 'Vaše rezervace byla lékařem zrušena.',
        status: NotificationStatus.warning,
        link: '/reservations',
    },
    newReservationForDoctor: {
        title: 'Nová rezervace pacienta',
        message:
            'Byla vytvořena nová rezervace, prosím potvrďte termín co nejdříve.',
        status: NotificationStatus.info,
        link: '/doctor/reservations',
    },
};
/**
 * Vrátí předdefinovanou notifikaci na základě šablony.
 * @param templateName Název šablony
 * @param overrides Možnost přepsání některých vlastností šablony (např. zprávy)
 * @returns Vygenerovaná notifikace
 */
export const getNotification = (
    templateName: keyof typeof notificationTemplates,
    overrides?: Partial<NotificationTemplate>
): NotificationTemplate => {
    const template = notificationTemplates[templateName];
    return {
        ...template,
        ...overrides,
    };
};
