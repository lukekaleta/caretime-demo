import 'react-i18next';
import { TFunction } from 'i18next';

declare module 'react-i18next' {
    interface UseTranslationResponse {
        t: TFunction;
    }
}
