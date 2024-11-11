import { RouteNames } from '@/enums/RouteNames';

import * as AppPermissions from '@/enums/Permissions';

const RoutePermissions = {
    [RouteNames.Home]: [AppPermissions.HomePermissions.CanSeeDashboard],
    [RouteNames.About]: [AppPermissions.AboutPermissions.CanSeeAbout],
    [RouteNames.Feedback]: [AppPermissions.FeedbackPermissions.CanSeeFeedback],
    [RouteNames.AppSettings]: [
        AppPermissions.AppSettingsPermissions.CanSeeAppSettings,
    ],
    [RouteNames.CreateAppointment]: [
        AppPermissions.AppointmentsPermissions.CanSeeCreateAppointment,
    ],
    [RouteNames.CreateAppointmentId]: [
        AppPermissions.AppointmentsPermissions.CanSeeCreateAppointment,
    ],
    [RouteNames.Doctors]: [AppPermissions.DoctorsPermissions.CanSeeDoctors],
    [RouteNames.DoctorCalendar]: [
        AppPermissions.DoctorsPermissions.CanSeeDoctorCalendar,
    ],
    [RouteNames.DoctorCalendarId]: [
        AppPermissions.DoctorsPermissions.CanSeeDoctorCalendar,
    ],
    [RouteNames.DoctorOpeningHoursManager]: [
        AppPermissions.DoctorsPermissions.CanSeeDoctorOpeningHours,
    ],
    [RouteNames.DoctorOpeningHoursManagerId]: [
        AppPermissions.DoctorsPermissions.CanSeeDoctorOpeningHours,
    ],
    [RouteNames.ServicesManager]: [
        AppPermissions.ServicesPermissions.CanSeeServicesManager,
    ],
    [RouteNames.ServicesManagerId]: [
        AppPermissions.ServicesPermissions.CanSeeServicesManager,
    ],
    [RouteNames.Clients]: [AppPermissions.ClientsPermissions.CanSeeClients],
    [RouteNames.ClientDetail]: [
        AppPermissions.ClientsPermissions.CanSeeClientDetail,
    ],
    [RouteNames.ClientDetailId]: [
        AppPermissions.ClientsPermissions.CanSeeClientDetail,
    ],
    [RouteNames.ClientManager]: [
        AppPermissions.ClientsPermissions.CanSeeClientManager,
    ],
    [RouteNames.ClientManagerId]: [
        AppPermissions.ClientsPermissions.CanSeeClientManager,
    ],
    [RouteNames.ClientsManageRegistered]: [
        AppPermissions.ClientsPermissions.CanSeeClientManageRegistered,
    ],
    [RouteNames.Organizations]: [
        AppPermissions.OrganizationsPermissions.CanSeeOrganizations,
    ],
    [RouteNames.Users]: [AppPermissions.UsersPermissions.CanSeeUsers],
    [RouteNames.UserAccount]: [
        AppPermissions.UserPermissions.CanSeeUserAccount,
    ],
    [RouteNames.UserProfile]: [
        AppPermissions.UserPermissions.CanSeeUserProfile,
    ],
    [RouteNames.UserSettings]: [
        AppPermissions.UserPermissions.CanSeeUserSettings,
    ],
    [RouteNames.UserCalendar]: [
        AppPermissions.UserPermissions.CanSeeUserCalendar,
    ],
    [RouteNames.Roles]: [AppPermissions.RolesPermissions.CanSeeRoles],
    [RouteNames.RoleManager]: [
        AppPermissions.RolesPermissions.CanSeeRoleManages,
    ],
    [RouteNames.Permissions]: [
        AppPermissions.PermissionsPermissions.CanSeePermissions,
    ],
    [RouteNames.NotificationsCenter]: [
        AppPermissions.NotificationsPermissions.CanSeeNotificationsCenter,
    ],
};

export default RoutePermissions;
