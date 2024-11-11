import { IUserData } from '@/interfaces/UserData';

interface IUserState {
    userData?: IUserData;

    isFetchingUserData: boolean;
    isUpdatingUserData: boolean;
    isUpdatingUserRole: boolean;
    isDeactivatingUser: boolean;
    isActivatingUser: boolean;

    fetchUserData: (uid: string) => Promise<void>;
    hasPermission: (permission: string) => boolean | undefined;
    updateUserData: (
        uid: string,
        updatedData: Partial<IUserData>
    ) => Promise<void>;
    updateUserRole: (uid: string, roleId: string) => Promise<void>;
    deactivateUser: (uid: string) => Promise<void>;
    activateUser: (uid: string) => Promise<void>;
}

export default IUserState;
