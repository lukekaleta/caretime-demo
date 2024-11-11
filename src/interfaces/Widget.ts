import { theme } from '../theme';

export interface IWidget {
    title: string;
    value: string | number;
    icon: string;
    bgColor: keyof typeof theme.palette;
}
