import { IPerson } from '@/interfaces/Person';

export interface IRegister extends IPerson {
    id: string;
    isActive: boolean;
    password?: string;
    confirmPassword?: string;
}
