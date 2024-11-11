/*
 *   HOME
 * */
export enum HomePermissions {
    CanSeeDashboard = 'canSeeDashboard',
}

/*
 *   ABOUT
 * */
export enum AboutPermissions {
    CanSeeAbout = 'canSeeAbout',
}

/*
 *   FEEDBACK
 * */
export enum FeedbackPermissions {
    CanSeeFeedback = 'canSeeFeedback',
}

/*
 *   APP SETTINGS
 * */
export enum AppSettingsPermissions {
    CanSeeAppSettings = 'canSeeAppSettings',
}

export enum AppSettingsGeneralPermissions {
    CanAllowRegistrations = 'canAllowRegistrations',
    CanSetMaximumUsers = 'canSetMaximumUsers',
    CanSetMaximumClients = 'canSetMaximumClients',
    CanSetMaximumProviders = 'canSetMaximumProviders',
    CanSetMaximumManagers = 'canSetMaximumManagers',
    CanSetMaximumReceptions = 'canSetMaximumReceptions',
    CanSwitchLanguages = 'canSwitchLanguages',
    CanSwitchCurrency = 'canSwitchCurrency',
    CanAllowDarkMode = 'canAllowDarkMode',
    CanSetMaximumOfUploadingFiles = 'canSetMaximumOfUploadingFiles',
}

export enum AppSettingsSecurityPermissions {
    CanSetMaximumLengthOfPasswords = 'canSetMaximumLengthOfPasswords',
    CanAllowCapitalLetterOfPasswords = 'canAllowCapitalLetterOfPasswords',
    CanAllowSpecialCharacterOfPasswords = 'canAllowSpecialCharacterOfPasswords',
    CanAllowNumberOfPasswords = 'canAllowNumberOfPasswords',
}

export enum AppSettingsNotificationsPermissions {
    CanAllowGlobalNotifications = 'canAllowGlobalNotifications',
    CanAllowSendingEmails = 'canAllowSendingEmails',
    CanAllowSendingSms = 'canAllowSendingSms',
    CanAllowSendingPushNotifications = 'canAllowSendingPushNotifications',
}

/*
 *   APPOINTMENTS
 * */
export enum AppointmentsPermissions {
    CanSeeCreateAppointment = 'canSeeCreateAppointment',
}

/*
 *   DOCTORS
 * */
export enum DoctorsPermissions {
    CanSeeDoctors = 'canSeeDoctors',
    CanSeeDoctorCalendar = 'canSeeDoctorCalendar',
    CanSeeDoctorOpeningHours = 'canSeeDoctorOpeningHours',
}

/*
 *   SERVICES
 * */
export enum ServicesPermissions {
    CanSeeServicesManager = 'canSeeServicesManager',
}

/*
 *   CLIENTS
 * */
export enum ClientsPermissions {
    CanSeeClients = 'canSeeClients',
    CanSeeClientDetail = 'canSeeClientDetail',
    CanSeeClientManager = 'canSeeClientManager',
    CanSeeClientManageRegistered = 'canSeeClientManageRegistrations',
}

/*
 *   ORGANIZATIONS
 * */
export enum OrganizationsPermissions {
    CanSeeOrganizations = 'canSeeOrganizations',
}

/*
 *   USERS
 * */
export enum UsersPermissions {
    CanSeeUsers = 'canSeeUsers',
}

/*
 *   USER
 * */
export enum UserPermissions {
    CanSeeUserAccount = 'canSeeUserAccount',
    CanSeeUserProfile = 'canSeeUserProfile',
    CanSeeUserSettings = 'canSeeUserSettings',
    CanSeeUserCalendar = 'canSeeUserCalendar',
}

/*
 *   ROLES
 * */
export enum RolesPermissions {
    CanSeeRoles = 'canSeeRoles',
    CanSeeRoleManages = 'canSeeRoleManages',
}

/*
 *   PERMISSIONS
 * */
export enum PermissionsPermissions {
    CanSeePermissions = 'canSeePermissions',
}

/*
 *   NOTIFICATIONS
 * */
export enum NotificationsPermissions {
    CanSeeNotificationsCenter = 'canSeeNotificationsCenter',
}
