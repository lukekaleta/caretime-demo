import { RouteNames } from '@/enums/RouteNames';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';
import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    allowedRoles: string[];
    children: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
    allowedRoles,
    children,
}) => {
    const location = useLocation();
    const { userData } = useUserStore()
    const { user, isListenForAuthChanges } = useAuthStore();
    const { hasPermission } = useUserStore();

    if (isListenForAuthChanges && !user) {
        return (
            <Navigate
                to={RouteNames.Login}
                state={{ from: location }}
                replace
            />
        );
    }

    const userHasPermission = allowedRoles.some((role) => hasPermission(role));

    if (userData?.permissions && !userHasPermission) {
        return (
            <Navigate
                to={RouteNames.Unauthorized}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
};

export default ProtectedRoute;
