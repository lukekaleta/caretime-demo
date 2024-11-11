import { IPreference } from '@/interfaces/Preference';
import { IPerson } from '@/interfaces/Person';

export interface IUserData extends IPerson {
    id: string;
    profilePicture?: string;
    isActive: boolean;
    isEmailVerified?: boolean;
    preference?: IPreference;
    notifications?: Notification[];
}
