export enum RouteNames {
    Login = '/login',
    ResetPassword = '/reset-password',
    Register = '/register',
    Unauthorized = '/unauthorized',

    Home = '/',
    About = '/about',
    Feedback = '/feedback',

    AppSettings = '/app/settings',

    CreateAppointment = '/appointment/create',
    CreateAppointmentId = '/appointment/create/:id',

    Doctors = '/doctors',
    DoctorCalendar = '/doctor/calendar',
    DoctorCalendarId = '/doctor/calendar/:id',
    DoctorOpeningHoursManager = '/doctor/opening-hours/manager',
    DoctorOpeningHoursManagerId = '/doctor/opening-hours/manager/:id',

    ServicesManager = '/services/manager',
    ServicesManagerId = '/services/manager/:id',

    Clients = '/clients',
    ClientDetail = '/client/detail',
    ClientDetailId = '/client/detail/:id',
    ClientManager = '/client/manager',
    ClientManagerId = '/client/manager/:id',
    ClientsManageRegistered = '/clients/manage/registered',

    Organizations = '/organizations',

    Users = '/users',
    UserAccount = '/user/account',
    UserProfile = '/user/profile',
    UserSettings = '/user/settings',
    UserCalendar = '/user/calendar',

    Roles = '/roles',
    RoleManager = '/role/manager',

    Permissions = '/permissions',

    NotificationsCenter = 'notifications-center',
}
