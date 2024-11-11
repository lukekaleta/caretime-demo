import React, { useCallback, useEffect } from 'react';
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
import useOrganizationStore from '@/stores/organizationsStore';
import { OrganizationsData } from '@/interfaces/_depracated/Organizations';
import useDialogStore from '@/stores/dialogStore';
import { Button } from '@/components/Button';

const OrganizationDrawer: React.FC = () => {
    const {
        organizationDrawer,
        setOrganizationDrawer,
        selectedOrganization,
        addOrganization,
        updateOrganization,
        setSelectedOrganization,
        deleteOrganization,
    } = useOrganizationStore();
    const { openDialog, closeDialog } = useDialogStore();

    const {
        control,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<OrganizationsData>({
        defaultValues: {
            name: '',
            phone: '',
            email: '',
            description: '',
        },
    });

    useEffect(() => {
        if (selectedOrganization) {
            setValue('name', selectedOrganization.name);
            setValue('phone', selectedOrganization.phone || '');
            setValue('email', selectedOrganization.email || '');
            setValue('description', selectedOrganization.description || '');
        } else {
            reset({
                name: '',
                phone: '',
                email: '',
                description: '',
            });
        }
    }, [selectedOrganization, setValue, reset]);

    const onSubmit = (data: OrganizationsData) => {
        if (selectedOrganization) {
            updateOrganization(selectedOrganization.id, data);
        } else {
            addOrganization(data);
        }
        reset();
        setSelectedOrganization(null);
        setOrganizationDrawer(false);
    };

    const handleDelete = useCallback(() => {
        openDialog(
            'Opravdu chcete odstranit tuto organizaci?',
            'Tuto akci nelze vrátit zpět. Organizace bude trvale odstraněna.',
            () => {
                if (selectedOrganization) {
                    deleteOrganization(selectedOrganization.id);
                }
                setOrganizationDrawer(false);
                closeDialog();
            }
        );
    }, [
        selectedOrganization,
        deleteOrganization,
        setOrganizationDrawer,
        openDialog,
        closeDialog,
    ]);

    const handleClose = () => {
        setOrganizationDrawer(false);
        if (!organizationDrawer) {
            setTimeout(() => {
                setSelectedOrganization(null);
                reset();
            }, 1000);
        }
    };

    return (
        <Drawer
            anchor="right"
            open={organizationDrawer}
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
                            {selectedOrganization
                                ? 'Upravit organizaci'
                                : 'Přidat novou organizaci'}
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
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Název organizace"
                                            fullWidth
                                            required
                                            error={!!errors.name}
                                            helperText={
                                                errors.name
                                                    ? 'Název organizace je povinný'
                                                    : ''
                                            }
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="phone"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Telefonní číslo"
                                            fullWidth
                                            required
                                            error={!!errors.phone}
                                            helperText={
                                                errors.phone
                                                    ? 'Telefonní číslo je povinné'
                                                    : ''
                                            }
                                        />
                                    )}
                                    rules={{ required: true }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="E-mail"
                                            type="email"
                                            fullWidth
                                            error={!!errors.email}
                                            helperText={
                                                errors.email
                                                    ? 'E-mail je povinný'
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
                                            label="Popis"
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
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    {selectedOrganization
                                        ? 'Upravit organizaci'
                                        : 'Přidat organizaci'}
                                </Button>
                            </Grid>
                            {selectedOrganization && (
                                <Grid item xs={12}>
                                    <Button
                                        onClick={handleDelete}
                                        variant="text"
                                        color="error"
                                        fullWidth
                                    >
                                        Odstranit organizaci
                                    </Button>
                                </Grid>
                            )}
                        </Grid>
                    </Box>
                </form>
            </Box>
        </Drawer>
    );
};

export default OrganizationDrawer;
