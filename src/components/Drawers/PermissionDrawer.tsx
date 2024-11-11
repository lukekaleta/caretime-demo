import React, { useEffect } from 'react';
import {
    Box,
    Divider,
    Drawer,
    Grid,
    IconButton,
    TextField,
    Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import usePermissionsStore from '@/stores/permissionsStore';
import { PermissionData } from '@/interfaces/_depracated/Permissions';
import { Button } from '@/components/Button';

const PermissionDrawer: React.FC = () => {
    const {
        permissionDrawer,
        setPermissionDrawer,
        selectedPermission,
        addPermission,
        updatePermission,
        setSelectedPermission,
    } = usePermissionsStore();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<PermissionData>({
        defaultValues: {
            name: '',
            description: '',
        },
    });

    useEffect(() => {
        if (selectedPermission) {
            setValue('name', selectedPermission.name);
            setValue('description', selectedPermission.description || '');
        } else {
            reset({
                name: '',
                description: '',
            });
        }
    }, [selectedPermission, setValue, reset]);

    const onSubmit = (data: PermissionData) => {
        if (selectedPermission) {
            updatePermission(selectedPermission.id, data);
        } else {
            addPermission(data);
        }
        reset();
        setSelectedPermission(null);
        setPermissionDrawer(false);
    };

    const handleClose = () => {
        setPermissionDrawer(false);
        setTimeout(() => {
            setSelectedPermission(null);
            reset();
        }, 500);
    };

    return (
        <Drawer
            anchor="right"
            open={permissionDrawer}
            onClose={handleClose}
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
                    onSubmit={handleSubmit(onSubmit)}
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
                            {selectedPermission
                                ? 'Upravit oprávnění'
                                : 'Přidat nové oprávnění'}
                        </Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    <Box sx={{ mt: 2 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Controller
                                    name="name"
                                    control={control}
                                    rules={{
                                        required: 'Název oprávnění je povinný',
                                    }}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Název oprávnění"
                                            fullWidth
                                            error={!!errors.name}
                                            helperText={errors.name?.message}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Popis oprávnění"
                                            multiline
                                            rows={4}
                                            fullWidth
                                        />
                                    )}
                                />
                            </Grid>
                        </Grid>
                    </Box>

                    <Box sx={{ mt: 'auto', pt: 2 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            {selectedPermission
                                ? 'Uložit oprávnění'
                                : 'Přidat oprávnění'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
};

export default PermissionDrawer;
