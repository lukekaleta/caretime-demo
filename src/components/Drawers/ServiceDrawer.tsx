import { Button } from '@/components/Button';
import { IService } from '@/interfaces/Service';
import useDialogStore from '@/stores/dialogStore';
import useDrawersStore from '@/stores/drawersStore';
import useServicesStore from '@/stores/serviceStore';
import { convertDayjsToTimestamp, convertTimestamp } from '@/utils/_deprecated/time';
import { mdiClose } from '@mdi/js';
import Icon from '@mdi/react';
import {
    Chip,
    Divider,
    Drawer,
    FormGroup,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from '@mui/material';
import { ClearIcon, LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import React, { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

interface IFormData extends IService { }

const ServiceDrawer: React.FC = () => {
    const { t: tCommon } = useTranslation('common');
    const { t: tServices } = useTranslation('services');
    const { id: doctorId } = useParams<{ id: string }>();

    const { openDialog, closeDialog } = useDialogStore();
    const { setProcedureDetailDrawer, procedureDetailDrawer } =
        useDrawersStore();
    const {
        selectedService,
        updateService,
        deleteService,
        isUpdatedService,
        isDeletingService,
        isAddingService,
        addService,
    } = useServicesStore();

    const daysOfWeek = [
        { id: 1, label: tCommon('Monday') },
        { id: 2, label: tCommon('Tuesday') },
        { id: 3, label: tCommon('Wednesday') },
        { id: 4, label: tCommon('Thursday') },
        { id: 5, label: tCommon('Friday') },
    ];

    const { control, handleSubmit, reset, setValue, watch } =
        useForm<IFormData>({
            defaultValues: {
                name: '',
                description: '',
                defaultDuration: 30,
                price: 0,
                days: []
            },
        });

    useEffect(() => {
        if (selectedService) {
            reset({
                name: selectedService.name,
                description: selectedService.description,
                defaultDuration: selectedService.defaultDuration,
                price: selectedService.price,
                startTime: selectedService?.startTime && convertTimestamp(selectedService.startTime),
                endTime: selectedService?.endTime && convertTimestamp(selectedService.endTime),
                days: selectedService.days || [],
            });
        } else {
            reset({
                name: '',
                description: '',
                defaultDuration: 30,
                price: 0,
                days: []
            });
        }
    }, [selectedService, reset]);

    const toggleDay = useCallback(
        (dayId: number) => {
            const currentDays = watch('days') || [];
            const newDays = currentDays.includes(dayId)
                ? currentDays.filter((d) => d !== dayId)
                : [...currentDays, dayId];
            setValue('days', newDays);
        },
        [watch, setValue]
    );

    const handleClose = useCallback(() => {
        setProcedureDetailDrawer(false);
        reset();
    }, [reset, setProcedureDetailDrawer]);

    const onSubmit = useCallback(
        async (data: IFormData) => {
            const updatedData = {
                ...data,
                startTime: convertDayjsToTimestamp(data.startTime),
                endTime: convertDayjsToTimestamp(data.endTime),
            };

            if (selectedService?.id && doctorId) {
                await updateService(selectedService.id, updatedData, doctorId).then(() => {
                    reset();
                });
            } else if (doctorId) {
                await addService(updatedData, doctorId).then(() => {
                    reset();
                });
            }
        },
        [selectedService, addService, updateService, doctorId, reset]
    );

    const handleDelete = useCallback(async () => {
        if (selectedService && doctorId) {
            openDialog(
                tServices('Confirm delete'),
                tServices('Delete warning'),
                async () => {
                    selectedService.id &&
                        (await deleteService(selectedService.id, doctorId).then(
                            () => {
                                handleClose();
                                closeDialog();
                                reset();
                            }
                        ));
                },
                undefined,
                isDeletingService
            );
        }
    }, [deleteService, selectedService, doctorId, handleClose, reset, isDeletingService]);

    return (
        <Drawer
            anchor="right"
            open={procedureDetailDrawer}
            onClose={handleClose}
            sx={{ width: 450 }}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: 450,
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <Icon path={mdiClose} size={1} />
                    </IconButton>
                    <Typography variant="h6" sx={{ p: 2 }}>
                        {selectedService
                            ? tServices('Edit service')
                            : tServices('Add service')}
                    </Typography>
                    <Divider />
                    <Grid
                        container
                        spacing={2}
                        sx={{
                            p: 2,
                            flexGrow: 1,
                            overflowY: 'auto',
                            alignContent: 'flex-start',
                        }}
                    >
                        <Grid item xs={12}>
                            <Controller
                                name="name"
                                control={control}
                                rules={{
                                    required: tServices(
                                        'Service name is required'
                                    ),
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label={tServices('Service name')}
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={
                                            fieldState.error
                                                ? fieldState.error.message
                                                : null
                                        }
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
                                        label={tServices('Service description')}
                                        fullWidth
                                        multiline
                                        rows={2}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="defaultDuration"
                                control={control}
                                rules={{
                                    required: tServices(
                                        'Service duration is required'
                                    ),
                                }}
                                render={({ field, fieldState }) => (
                                    <TextField
                                        {...field}
                                        label={tServices('Service duration')}
                                        type="number"
                                        fullWidth
                                        error={!!fieldState.error}
                                        helperText={
                                            fieldState.error
                                                ? fieldState.error.message
                                                : null
                                        }
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="price"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label={tServices('Price')}
                                        type="number"
                                        fullWidth
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormGroup row>
                                {daysOfWeek.map((day) => (
                                    <Chip
                                        key={day.id}
                                        label={day.label}
                                        onClick={() => toggleDay(day.id)}
                                        color={
                                            watch('days')?.includes(day.id)
                                                ? 'secondary'
                                                : 'default'
                                        }
                                        variant={
                                            watch('days')?.includes(day.id)
                                                ? 'filled'
                                                : 'outlined'
                                        }
                                        sx={{ margin: '5px' }}
                                    />
                                ))}
                            </FormGroup>
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="startTime"
                                control={control}
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        label={tServices('Start time')}
                                        ampm={false}
                                        minutesStep={5}
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                                InputProps: {
                                                    endAdornment: (
                                                        <>
                                                            {field.value && (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={() => field.onChange(null)}
                                                                        edge="end"
                                                                    >
                                                                        <ClearIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )}
                                                        </>
                                                    ),
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Controller
                                name="endTime"
                                control={control}
                                render={({ field }) => (
                                    <TimePicker
                                        {...field}
                                        label={tServices('End time')}
                                        ampm={false}
                                        minutesStep={5}
                                        slotProps={{
                                            textField: {
                                                variant: 'outlined',
                                                InputProps: {
                                                    endAdornment: (
                                                        <>
                                                            {field.value && (
                                                                <InputAdornment position="end">
                                                                    <IconButton
                                                                        onClick={() => field.onChange(null)}
                                                                        edge="end"
                                                                    >
                                                                        <ClearIcon />
                                                                    </IconButton>
                                                                </InputAdornment>
                                                            )}
                                                        </>
                                                    ),
                                                },
                                            },
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <Divider sx={{ mt: 'auto' }} />
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isUpdatedService || isAddingService}
                            >
                                {selectedService
                                    ? tServices('Edit service')
                                    : tServices('Add service')}
                            </Button>
                        </Grid>
                        {selectedService && (
                            <Grid item xs={12}>
                                <Button
                                    onClick={handleDelete}
                                    variant="outlined"
                                    color="error"
                                    fullWidth
                                >
                                    {tServices('Delete service')}
                                </Button>
                            </Grid>
                        )}
                    </Grid>
                </LocalizationProvider>
            </form>
        </Drawer>
    );
};

export default ServiceDrawer;
