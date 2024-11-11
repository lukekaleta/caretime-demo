import React, { FC, useCallback, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    CircularProgress,
    Divider,
    Drawer,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemText,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import useDrawersStore from '@/stores/drawersStore';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import { Button } from '@/components/Button';
import { theme } from '@/theme/index';
import { formatBirthNumber, parseBirthNumber } from '@/utils/index';
import { formatIsoDate } from '@/utils/datetime';
import { useTranslation } from 'react-i18next';
import useUserStore from '@/stores/userStore';
import useUsersStore from '@/stores/usersStore';
import useRolesStore from '@/stores/rolesStore';
import useDialogStore from '@/stores/dialogStore';

interface FormValues {
    roleId: string;
}

const UserDetailDrawer: FC = () => {
    const { t } = useTranslation('roles');
    const { userDetailDrawer, setUserDetailDrawerOpen } = useDrawersStore();
    const { activeRoles, fetchRoles } = useRolesStore();
    const {
        updateUserRole,
        deactivateUser,
        activateUser,
        isUpdatingUserRole,
        isActivatingUser,
        isDeactivatingUser,
    } = useUserStore();
    const { fetchUsers, selectedUser } = useUsersStore();
    const { openDialog, closeDialog } = useDialogStore();
    const { handleSubmit, control, setValue } = useForm<FormValues>({
        defaultValues: {
            roleId: selectedUser?.id,
        },
    });

    const birthNumber = formatBirthNumber(String(selectedUser?.birthNumber));
    const birthDate = parseBirthNumber(String(selectedUser?.birthNumber));

    const handleCloseDrawer = useCallback(async () => {
        setUserDetailDrawerOpen(false);
        await fetchUsers();
    }, [setUserDetailDrawerOpen, fetchUsers]);

    const handleSave = useCallback(
        async (data: FormValues) => {
            await updateUserRole(selectedUser?.id || '', data.roleId);
        },
        [selectedUser, updateUserRole]
    );

    const handleCloseDialog = useCallback(async () => {
        closeDialog();
        await handleCloseDrawer();
    }, [fetchUsers, closeDialog]);

    const handleDeactivateUser = useCallback(async () => {
        const userId = selectedUser && selectedUser.id;

        if (userId) {
            if (selectedUser?.isActive) {
                openDialog(
                    'Deaktivace uživatele',
                    'Deaktivací tohoto uživatele mu znemožníte přihlášení do aplikace a ztratí možnost spravovat své rezervace.',
                    () => {
                        deactivateUser(userId);
                        handleCloseDialog();
                        fetchUsers();
                    }
                );
            } else {
                openDialog(
                    'Aktivace uživatele',
                    'Aktivací tohoto uživatele mu umožníte znovu se přihlásit do aplikace a spravovat své rezervace.',
                    () => {
                        activateUser(userId);
                        handleCloseDialog();
                        fetchUsers();
                    }
                );
            }
        }
    }, [
        openDialog,
        selectedUser,
        deactivateUser,
        activateUser,
        fetchUsers,
        closeDialog,
    ]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    useEffect(() => {
        if (selectedUser && selectedUser.roleId) {
            setValue('roleId', selectedUser.roleId);
        }
    }, [selectedUser, setValue]);

    return (
        <Drawer
            anchor="right"
            open={userDetailDrawer}
            onClose={handleCloseDrawer}
            sx={{ width: 400 }}
        >
            <Box
                sx={{
                    width: 400,
                    padding: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <form
                    onSubmit={handleSubmit(handleSave)}
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2,
                        }}
                    >
                        <Typography variant="h5">
                            {`${selectedUser?.firstName} ${selectedUser?.lastName}`}
                        </Typography>
                        <IconButton onClick={handleCloseDrawer}>
                            <Icon path={mdiClose} size={1} />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* User status chips */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-evenly',
                        }}
                    >
                        <Chip
                            sx={{ mr: 2 }}
                            color={
                                selectedUser?.isEmailVerified
                                    ? 'success'
                                    : 'error'
                            }
                            variant="filled"
                            label={
                                selectedUser?.isEmailVerified
                                    ? 'Ověřený'
                                    : 'Neověřený'
                            }
                            icon={
                                <Icon
                                    path={
                                        selectedUser?.isEmailVerified
                                            ? mdiCheck
                                            : mdiClose
                                    }
                                    size={1}
                                />
                            }
                        />

                        <Chip
                            color={selectedUser?.isActive ? 'success' : 'error'}
                            variant="filled"
                            label={
                                selectedUser?.isActive ? 'Aktivní' : 'Neaktivní'
                            }
                            icon={
                                <Icon
                                    path={
                                        selectedUser?.isActive
                                            ? mdiCheck
                                            : mdiClose
                                    }
                                    size={1}
                                />
                            }
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    {/* User details */}
                    <Card
                        sx={{
                            mb: 3,
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: theme.palette.grey['300'],
                        }}
                    >
                        <CardContent sx={{ padding: theme.spacing(1) }}>
                            <List>
                                <ListItem>
                                    <ListItemText
                                        primary="Datum narození:"
                                        secondary={
                                            birthDate &&
                                            formatIsoDate(birthDate)
                                        }
                                        secondaryTypographyProps={{
                                            fontWeight: 'bold',
                                            variant: 'body1',
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Rodné číslo:"
                                        secondary={birthNumber}
                                        secondaryTypographyProps={{
                                            fontWeight: 'bold',
                                            variant: 'body1',
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="Telefon:"
                                        secondary={selectedUser?.phoneNumber}
                                        secondaryTypographyProps={{
                                            fontWeight: 'bold',
                                            variant: 'body1',
                                        }}
                                    />
                                </ListItem>
                                <ListItem>
                                    <ListItemText
                                        primary="E-mail:"
                                        secondary={selectedUser?.email}
                                        secondaryTypographyProps={{
                                            fontWeight: 'bold',
                                            variant: 'body1',
                                        }}
                                    />
                                </ListItem>
                            </List>
                        </CardContent>
                    </Card>

                    {/* Role selection form */}
                    <Card
                        sx={{
                            boxShadow: 'none',
                            border: '1px solid',
                            borderColor: theme.palette.grey['300'],
                        }}
                    >
                        <CardHeader
                            title="Role uživatele"
                            titleTypographyProps={{ variant: 'body1' }}
                        />
                        <Divider />
                        <CardContent>
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="role-select-label">
                                    Role uživatele
                                </InputLabel>
                                <Controller
                                    name="roleId"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            labelId="role-select-label"
                                            {...field}
                                            label="Role uživatele"
                                        >
                                            {activeRoles.map((role) => (
                                                <MenuItem
                                                    key={role.id}
                                                    value={role.id}
                                                >
                                                    <>{t(role.id)}</>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                />
                            </FormControl>
                        </CardContent>
                    </Card>

                    {/* Deactivate button */}
                    <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={isUpdatingUserRole}
                                    fullWidth
                                >
                                    {isUpdatingUserRole ? (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: theme.palette.grey[
                                                    '500'
                                                ],
                                            }}
                                        />
                                    ) : (
                                        'Uložit změny'
                                    )}
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    onClick={handleDeactivateUser}
                                    disabled={
                                        isActivatingUser || isDeactivatingUser
                                    }
                                    variant="text"
                                    color={
                                        selectedUser?.isActive
                                            ? 'error'
                                            : 'success'
                                    }
                                    size="small"
                                >
                                    {isActivatingUser || isDeactivatingUser ? (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                color: theme.palette.grey[50],
                                            }}
                                        />
                                    ) : selectedUser?.isActive ? (
                                        'Deaktivovat účet'
                                    ) : (
                                        'Aktivovat účet'
                                    )}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
};

export default UserDetailDrawer;
