import { RouteNames } from '@/enums/RouteNames';
import { MenuItem } from '@/types/index';
import {
    mdiAccount,
    mdiAccountGroup,
    mdiAccountMultipleOutline,
    mdiCalendar,
    mdiCogOutline,
    mdiDoctor,
    mdiHomeOutline,
    mdiLan,
    mdiSecurity,
    mdiShieldAccountOutline,
    mdiShieldLockOpenOutline,
} from '@mdi/js';
import * as AppPermissions from '@/enums/Permissions';

export const userNavigateMenuItems: MenuItem[] = [
    {
        id: RouteNames.UserProfile,
        href: RouteNames.UserProfile,
        name: 'Profil',
    },
    {
        id: RouteNames.UserAccount,
        href: RouteNames.UserAccount,
        name: 'Můj účet',
        divided: true,
    },
    {
        id: RouteNames.UserSettings,
        href: RouteNames.UserSettings,
        name: 'Nastavení uživatele',
    },
];

export const drawerTopNavigateNavigationItem: MenuItem[] = [
    {
        id: RouteNames.Home,
        href: RouteNames.Home,
        name: 'Domů',
        icon: mdiHomeOutline,
        allowedPermission: [AppPermissions.HomePermissions.CanSeeDashboard],
    },
    {
        id: RouteNames.Clients,
        href: RouteNames.Clients,
        name: 'Klienti',
        icon: mdiAccountMultipleOutline,
        allowedPermission: [AppPermissions.ClientsPermissions.CanSeeClients],
    },
    {
        id: RouteNames.Organizations,
        href: RouteNames.Organizations,
        name: 'Organizace',
        icon: mdiLan,
        allowedPermission: [
            AppPermissions.OrganizationsPermissions.CanSeeOrganizations,
        ],
    },
    {
        id: RouteNames.Doctors,
        href: RouteNames.Doctors,
        name: 'Lékaři',
        icon: mdiDoctor,
        allowedPermission: [AppPermissions.DoctorsPermissions.CanSeeDoctors],
    },
    {
        id: RouteNames.Users,
        href: RouteNames.Users,
        name: 'Uživatelé',
        icon: mdiAccountGroup,
        allowedPermission: [AppPermissions.UsersPermissions.CanSeeUsers],
    },
    {
        id: RouteNames.Roles,
        href: RouteNames.Roles,
        name: 'Role uživatelů',
        icon: mdiShieldAccountOutline,
        allowedPermission: [AppPermissions.RolesPermissions.CanSeeRoles],
    },
    {
        id: RouteNames.Permissions,
        href: RouteNames.Permissions,
        name: 'Přístupy rolí',
        icon: mdiShieldLockOpenOutline,
        allowedPermission: [
            AppPermissions.PermissionsPermissions.CanSeePermissions,
        ],
    },
];

export const userDrawerNavigateMenuItems: MenuItem[] = [
    {
        id: RouteNames.UserAccount,
        href: RouteNames.UserAccount,
        name: 'Account',
        icon: mdiSecurity,
    },
    {
        id: RouteNames.UserProfile,
        href: RouteNames.UserProfile,
        name: 'Profile',
        icon: mdiAccount,
    },
    {
        id: RouteNames.UserSettings,
        href: RouteNames.UserSettings,
        name: 'Settings',
        icon: mdiCogOutline,
    },
    {
        id: RouteNames.UserCalendar,
        href: RouteNames.UserCalendar,
        name: 'My calendar',
        icon: mdiCalendar,
    },
];
