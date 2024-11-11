import Button from '@/components/Button/Button';
import { Card } from '@/components/Card';
import * as AppPermissions from '@/enums/Permissions';
import { RouteNames } from '@/enums/RouteNames';
import { IRoleData } from '@/interfaces/Role';
import useDialogStore from '@/stores/dialogStore';
import usePermissionsStore from '@/stores/permissionsStore';
import useRolesStore from '@/stores/rolesStore';
import { mdiArrowDown, mdiArrowUp, mdiCheck, mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import {
    Backdrop,
    Box,
    Checkbox,
    FormControlLabel,
    Grid,
    Paper,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    TextField,
    Typography,
} from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';

const RoleManager: React.FC = () => {
    const { t } = useTranslation('roles');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const { selectedRole, addRole, updateRole, setSelectedRole, deleteRole } =
        useRolesStore();
    const { permissions, fetchPermissions } = usePermissionsStore();
    const { openDialog, closeDialog } = useDialogStore();
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IRoleData>({
        defaultValues: {
            name: '',
            description: '',
            permissions: [],
            id: '',
            isActive: true,
        },
    });

    const selectedPermissions = watch('permissions') as string[];
    const roleName = useWatch({ control, name: 'name' });

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    useEffect(() => {
        if (roleName) {
            const generatedId = slugify(roleName, { lower: true });
            setValue('id', generatedId);
        }
    }, [roleName, setValue]);

    useEffect(() => {
        if (selectedRole) {
            setValue('name', selectedRole.name);
            setValue('description', selectedRole.description || '');
            setValue('permissions', selectedRole.permissions || []);
            setValue('id', selectedRole.id || '');
            setValue('isActive', selectedRole.isActive);
        } else {
            reset({
                name: '',
                description: '',
                permissions: [],
                id: '',
                isActive: true,
            });
        }
    }, [selectedRole, setValue, reset]);

    const onSubmit = (data: IRoleData) => {
        if (selectedRole) {
            updateRole(selectedRole.id, data);
        } else {
            addRole(data);
        }
        reset();
        setSelectedRole(null);
        navigate(RouteNames.Roles);
    };

    const handleDelete = useCallback(() => {
        openDialog(
            'Opravdu chcete odstranit tuto roli?',
            'Tuto akci nelze vrátit zpět. Role bude trvale odstraněna.',
            () => {
                if (selectedRole) {
                    deleteRole(selectedRole.id);
                }
                navigate(RouteNames.Roles);
                closeDialog();
            }
        );
    }, [selectedRole, deleteRole, openDialog, closeDialog, navigate]);

    const handlePermissionChange = (permissionId: string) => {
        const updatedPermissions = selectedPermissions.includes(permissionId)
            ? selectedPermissions.filter((perm) => perm !== permissionId)
            : [...selectedPermissions, permissionId];
        setValue('permissions', updatedPermissions);
    };

    return (
        <Paper sx={{ p: 4, boxShadow: 'none' }}>
            <form>
                <Grid container spacing={4}>
                    {/* Levá strana */}
                    <Grid item xs={12} md={4}>
                        <Card
                            withHeaderDivider
                            title={
                                selectedRole
                                    ? 'Upravit roli'
                                    : 'Přidat novou roli'
                            }
                        >
                            <Box sx={{ width: '100%' }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="id"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="ID role (automaticky generováno)"
                                                    fullWidth
                                                    disabled
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="name"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Název role"
                                                    fullWidth
                                                    required
                                                    error={!!errors.name}
                                                    disabled={
                                                        !!selectedRole?.name
                                                    }
                                                    helperText={
                                                        errors.name
                                                            ? 'Název role je povinný'
                                                            : ''
                                                    }
                                                />
                                            )}
                                            rules={{ required: true }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Controller
                                            name="description"
                                            control={control}
                                            render={({ field }) => (
                                                <TextField
                                                    {...field}
                                                    label="Popis role"
                                                    multiline
                                                    rows={4}
                                                    fullWidth
                                                />
                                            )}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={
                                                <Controller
                                                    name="isActive"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Checkbox
                                                            color="success"
                                                            {...field}
                                                            checked={
                                                                field.value
                                                            }
                                                        />
                                                    )}
                                                />
                                            }
                                            label="Aktivní role"
                                        />
                                    </Grid>
                                    {selectedRole && (
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body2"
                                                sx={{ mt: 2 }}
                                            >
                                                TODO: dodelat posledni zmeny
                                            </Typography>
                                        </Grid>
                                    )}
                                    {selectedRole && (
                                        <Grid item xs={12}>
                                            <Button
                                                onClick={handleDelete}
                                                variant="text"
                                                color="error"
                                                size="large"
                                                fullWidth
                                                sx={{ mt: 3 }}
                                            >
                                                Odstranit roli
                                            </Button>
                                        </Grid>
                                    )}
                                </Grid>
                            </Box>
                        </Card>
                    </Grid>
                    {/* Pravá strana */}
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení dashboard"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.HomePermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení o aplikaci"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.AboutPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení zpětná vazba"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.FeedbackPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení aplikace"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.AppSettingsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h6"
                                                sx={{ mb: 1 }}
                                            >
                                                Obecné nastavení
                                            </Typography>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                {Object.entries(
                                                    AppPermissions.AppSettingsGeneralPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h6"
                                                sx={{ mb: 1 }}
                                            >
                                                Nastavení zabezpečení
                                            </Typography>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                {Object.entries(
                                                    AppPermissions.AppSettingsSecurityPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Typography
                                                variant="h6"
                                                sx={{ mb: 1 }}
                                            >
                                                Nastavení notifikací
                                            </Typography>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                {Object.entries(
                                                    AppPermissions.AppSettingsNotificationsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení rezervací"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.AppointmentsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card title="Nastavení Lékař" withHeaderDivider>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.DoctorsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení služeb"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.ServicesPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení klientů"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazeni
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.ClientsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení organizací"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazení
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.OrganizationsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení uživatelů"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazení
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.UsersPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení uživatele"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazení
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.UserPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card title="Nastavení rolí" withHeaderDivider>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazení
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.RolesPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení oprávnění"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení zobrazení
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.PermissionsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>

                            <Grid item xs={12}>
                                <Card
                                    title="Nastavení oprávnění"
                                    withHeaderDivider
                                >
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                flexDirection="column"
                                            >
                                                <Typography
                                                    variant="h6"
                                                    sx={{ mb: 1 }}
                                                >
                                                    Nastavení notifikací
                                                </Typography>
                                                {Object.entries(
                                                    AppPermissions.NotificationsPermissions
                                                ).map(([key, value]) => (
                                                    <FormControlLabel
                                                        key={key}
                                                        control={
                                                            <Checkbox
                                                                size="small"
                                                                checked={selectedPermissions.includes(
                                                                    value
                                                                )}
                                                                onChange={() =>
                                                                    handlePermissionChange(
                                                                        value
                                                                    )
                                                                }
                                                            />
                                                        }
                                                        label={
                                                            t(value) as String
                                                        }
                                                    />
                                                ))}
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Backdrop open={open} />
                    <SpeedDial
                        onClose={handleClose}
                        onOpen={handleOpen}
                        open={open}
                        ariaLabel="Floating Action Menu"
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                        icon={
                            <SpeedDialIcon
                                color="primary"
                                icon={<Icon path={mdiArrowUp} size={1} />}
                                openIcon={<Icon path={mdiArrowDown} size={1} />}
                            />
                        }
                    >
                        <SpeedDialAction
                            onClick={handleSubmit(onSubmit)}
                            tooltipOpen
                            icon={<Icon path={mdiCheck} size={1} />}
                            tooltipTitle="Uložit"
                        />
                        <SpeedDialAction
                            onClick={handleDelete}
                            tooltipOpen
                            icon={<Icon path={mdiClose} size={1} />}
                            tooltipTitle="Odstranit"
                        />
                    </SpeedDial>
                </Grid>
            </form>
        </Paper>
    );
};

export default RoleManager;
