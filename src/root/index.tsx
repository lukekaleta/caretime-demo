import { Layout } from '@/components/Layout';
import { Loading } from '@/components/Loading';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { RouteNames } from '@/enums/RouteNames';
import RoutePermissions from '@/enums/RoutePermissions';
import { About } from '@/routes/about';
import { Appointment } from '@/routes/appointment';
import { Login, Register, ResetPassword } from '@/routes/authorization';
import {
    ClientDetail,
    ClientManageRegistered,
    ClientManager
} from '@/routes/client';
import { Clients } from '@/routes/clients';
import { Dashboard } from '@/routes/dashboard';
import { DoctorCalendar, DoctorOpeningHoursManager, Doctors } from '@/routes/doctor';
import { Feedback } from '@/routes/feedback';
import { NotFound } from '@/routes/not-found';
import { Organizations } from '@/routes/organizations';
import { Permissions } from '@/routes/permissions';
import { RoleManager, Roles } from '@/routes/roles';
import { Services } from '@/routes/services';
import { Unauthorized } from '@/routes/unauthorized';
import { UserAccount, UserCalendar, UserSettings } from '@/routes/user';
import { Users } from '@/routes/users';
import useAppSettingsStore from '@/stores/appSettingsStore';
import useAuthStore from '@/stores/authStore';
import useUserStore from '@/stores/userStore';
import { ThemeProvider } from '@mui/system';
import { FC, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppSettings } from 'routes/app-settings';
import { theme } from '../theme';
import { NotificationsCenter } from '@/components/Notifications';

const AppRoot: FC = () => {
    const { listenForAuthChanges, isListenForAuthChanges, user } =
        useAuthStore();
    const { settings, fetchSettings } = useAppSettingsStore();
    const { fetchUserData } = useUserStore()
    const listenInitialized = useRef(false);

    useEffect(() => {
        fetchSettings();

        if (!listenInitialized.current) {
            listenForAuthChanges();
            listenInitialized.current = true;
        }
    }, [fetchSettings, listenForAuthChanges]);

    useEffect(() => {
        if (user) {
            fetchUserData(user.uid);
        }
    }, [user, fetchUserData]);

    return (
        <ThemeProvider theme={theme}>
            {isListenForAuthChanges ? (
                <Loading />
            ) : (
                <Routes>
                    <Route path={RouteNames.Login} element={<Login />} />
                    <Route
                        path={RouteNames.ResetPassword}
                        element={<ResetPassword />}
                    />

                    {settings?.allowClientRegistration === 'allow' && (
                        <Route
                            path={RouteNames.Register}
                            element={<Register />}
                        />
                    )}

                    <Route element={<Layout />}>
                        {/* Application Routes */}
                        <Route
                            path={RouteNames.Unauthorized}
                            element={<Unauthorized />}
                        />
                        <Route
                            path={RouteNames.Home}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Home]
                                    }
                                >
                                    <Dashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.About}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.About]
                                    }
                                >
                                    <About />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.Feedback}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Feedback]
                                    }
                                >
                                    <Feedback />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.Doctors}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Doctors]
                                    }
                                >
                                    <Doctors />
                                </ProtectedRoute>
                            }
                        />

                        {/* Appointment */}
                        <Route
                            path={RouteNames.CreateAppointmentId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.CreateAppointmentId
                                        ]
                                    }
                                >
                                    <Appointment />
                                </ProtectedRoute>
                            }
                        />

                        {/* Doctor */}
                        <Route
                            path={RouteNames.ServicesManagerId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.ServicesManagerId
                                        ]
                                    }
                                >
                                    <Services />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.DoctorCalendarId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.DoctorCalendarId
                                        ]
                                    }
                                >
                                    <DoctorCalendar />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.DoctorOpeningHoursManagerId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.DoctorOpeningHoursManagerId
                                        ]
                                    }
                                >
                                    <DoctorOpeningHoursManager />
                                </ProtectedRoute>
                            }
                        />

                        {/* Organization Management */}
                        <Route
                            path={RouteNames.Clients}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Clients]
                                    }
                                >
                                    <Clients />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.ClientDetailId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.ClientDetailId
                                        ]
                                    }
                                >
                                    <ClientDetail />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.ClientManager}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.ClientManager
                                        ]
                                    }
                                >
                                    <ClientManager />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.ClientManagerId}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.ClientManagerId
                                        ]
                                    }
                                >
                                    <ClientManager />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.ClientsManageRegistered}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.ClientsManageRegistered
                                        ]
                                    }
                                >
                                    <ClientManageRegistered />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={RouteNames.Organizations}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.Organizations
                                        ]
                                    }
                                >
                                    <Organizations />
                                </ProtectedRoute>
                            }
                        />

                        {/* User Account */}
                        <Route
                            path={RouteNames.UserAccount}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.UserAccount]
                                    }
                                >
                                    <UserAccount />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.UserSettings}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.UserSettings
                                        ]
                                    }
                                >
                                    <UserSettings />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.UserCalendar}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[
                                        RouteNames.UserCalendar
                                        ]
                                    }
                                >
                                    <UserCalendar />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={RouteNames.Users}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Users]
                                    }
                                >
                                    <Users />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.Roles}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Roles]
                                    }
                                >
                                    <Roles />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path={RouteNames.RoleManager}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.RoleManager]
                                    }
                                >
                                    <RoleManager />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={RouteNames.Permissions}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.Permissions]
                                    }
                                >
                                    <Permissions />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={RouteNames.AppSettings}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.AppSettings]
                                    }
                                >
                                    <AppSettings />
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path={RouteNames.NotificationsCenter}
                            element={
                                <ProtectedRoute
                                    allowedRoles={
                                        RoutePermissions[RouteNames.NotificationsCenter]
                                    }
                                >
                                    <NotificationsCenter />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            )}
        </ThemeProvider>
    );
};

export default AppRoot;
