import { IUserData } from '@/interfaces/UserData';

interface IUsersState {
    users: IUserData[];
    filteredUsers: IUserData[];
    selectedUser: IUserData | null;

    isFetchingUsers: boolean;
    isFetchingFilteredUsers: boolean;
    isUpdatingUser: boolean;

    fetchUsers: () => Promise<void>;
    fetchFilteredUsers: (filter: {
        field: string;
        value: string;
    }) => Promise<void>;

    setSelectedUser: (user: IUserData | null) => void;
    updateUser: (updatedUser: Partial<IUserData>) => Promise<void>;
    updateSelectedUser: (updatedUserData: Partial<IUserData>) => void;
}

export default IUsersState;
