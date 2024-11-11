import { User } from 'firebase/auth';

import { ILogin } from '@/interfaces/Login';
import { IRegister } from '@/interfaces/Register';
import { IResetPassword } from '@/interfaces/ResetPassword';
import { IChangePassword } from '@/interfaces/ChangePassword';
import { IDeletePassword } from '@/interfaces/DeletePassword';

interface AuthState {
    isLoggingIn: boolean;
    isLoggingOut: boolean;
    isRegistering: boolean;
    isResettingPassword: boolean;
    isChangingPassword: boolean;
    isDeletingPassword: boolean;
    isSendingVerificationEmail: boolean;
    isListenForAuthChanges: boolean;

    user?: User;
    setUser: (data: User) => void;

    login: (data: ILogin) => Promise<void>;
    logout: () => Promise<void>;
    register: (data: IRegister) => Promise<void>;

    resetPassword: (data: IResetPassword) => Promise<void>;
    changePassword: (data: IChangePassword) => Promise<void>;
    deleteAccount: (data: IDeletePassword) => Promise<void>;
    sendVerificationEmail: () => Promise<void>;

    listenForAuthChanges: () => void;
}

export default AuthState;
