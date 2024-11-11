import React, { useCallback, useEffect } from 'react';
import {
    Box,
    Button,
    Drawer,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import useRolesStore from '@/stores/rolesStore';
import useDialogStore from '@/stores/dialogStore';
import { IRoleData } from '@/interfaces/Role';
import { useTranslation } from 'react-i18next';

const RoleDrawer: React.FC = () => {
    const { t } = useTranslation('common');
    const {
        roleDrawer,
        setRoleDrawer,
        selectedRole,
        addRole,
        updateRole,
        setSelectedRole,
        deleteRole,
    } = useRolesStore();
    const { openDialog, closeDialog } = useDialogStore();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IRoleData>({
        defaultValues: {
            name: '',
            description: '',
            permissions: [],
        },
    });

    useEffect(() => {
        if (selectedRole) {
            setValue('name', selectedRole.name);
            setValue('description', selectedRole.description || '');
            setValue('permissions', selectedRole.permissions || []);
        } else {
            reset({
                name: '',
                description: '',
                permissions: [],
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
        setRoleDrawer(false);
    };

    const handleDelete = useCallback(() => {
        openDialog(
            'Opravdu chcete odstranit tuto roli?',
            'Tuto akci nelze vrátit zpět. Role bude trvale odstraněna.',
            () => {
                if (selectedRole) {
                    deleteRole(selectedRole.id);
                }
                setRoleDrawer(false);
                closeDialog();
            }
        );
    }, [selectedRole, deleteRole, setRoleDrawer, openDialog, closeDialog]);

    const handleClose = () => {
        setRoleDrawer(false);
        if (!roleDrawer) {
            setTimeout(() => {
                setSelectedRole(null);
                reset();
            }, 1000);
        }
    };

    return (
        <Drawer anchor="right" open={roleDrawer} onClose={handleClose}>
            <Box sx={{ width: 400, padding: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <Typography variant="h6">
                        {selectedRole ? 'Upravit roli' : 'Přidat novou roli'}
                    </Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Název role"
                                        value={t(field.name) as String}
                                        fullWidth
                                        required
                                        error={!!errors.name}
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
                            <Controller
                                name="permissions"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="Oprávnění (oddělte čárkou)"
                                        fullWidth
                                        placeholder="admin,edit,delete"
                                        error={!!errors.permissions}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                    >
                                        {selectedRole
                                            ? 'Upravit roli'
                                            : 'Přidat roli'}
                                    </Button>
                                </Grid>
                                {selectedRole && (
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={handleDelete}
                                            variant="outlined"
                                            color="error"
                                            fullWidth
                                        >
                                            Odstranit roli
                                        </Button>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Drawer>
    );
};

export default RoleDrawer;
