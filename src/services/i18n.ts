import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationCSCommon from '@/locales/cs/common.json';
import translationCSRegister from '@/locales/cs/register.json';
import translationCSClients from '@/locales/cs/clients.json';
import translationCSUser from '@/locales/cs/user.json';
import translationCSDoctors from '@/locales/cs/doctors.json';
import translationCSRoles from '@/locales/cs/roles.json';
import translationCSCalendar from '@/locales/cs/calendar.json';
import translationCSServices from '@/locales/cs/services.json';
import translationCSAppoinemtment from '@/locales/cs/appointments.json'

import translationENCommon from '@/locales/en/common.json';
import translationENRegister from '@/locales/en/register.json';
import translationENClients from '@/locales/en/clients.json';
import translationENUser from '@/locales/en/user.json';
import translationENDoctors from '@/locales/en/doctors.json';
import translationENRoles from '@/locales/en/roles.json';
import translationENCalendar from '@/locales/en/calendar.json';
import translationENServices from '@/locales/en/services.json';
import translationENAppoinemtment from '@/locales/en/appointments.json'

const resources = {
    cs: {
        common: translationCSCommon,
        register: translationCSRegister,
        clients: translationCSClients,
        user: translationCSUser,
        doctors: translationCSDoctors,
        roles: translationCSRoles,
        calendar: translationCSCalendar,
        services: translationCSServices,
        appointments: translationCSAppoinemtment
    },
    en: {
        common: translationENCommon,
        register: translationENRegister,
        clients: translationENClients,
        user: translationENUser,
        doctors: translationENDoctors,
        roles: translationENRoles,
        calendar: translationENCalendar,
        services: translationENServices,
        appointments: translationENAppoinemtment
    },
};

i18n.use(initReactI18next)
    .use(LanguageDetector)
    .init({
        resources,
        fallbackLng: 'cs',
        detection: {
            order: ['queryString', 'cookie'],
            cache: ['cookie'],
        },
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
