import { AppointmentConfirmation, DateAndTimeSelection, ReviewAndConfirm, ServiceSelection } from '@/components/Appointment';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Paper } from '@/components/Paper';
import { WorkingHours } from '@/components/WorkingHours';
import AppointmentStatus from '@/enums/AppointmentStatus';
import { IService } from '@/interfaces/Service';
import useAppointmentsStore from '@/stores/appointmentsStore';
import useAuthStore from '@/stores/authStore';
import useDoctorStore from '@/stores/doctorStore';
import useNotificationStore from '@/stores/notificationsStore';
import useServicesStore from '@/stores/serviceStore';
import useUserStore from '@/stores/userStore';
import { convertDayjsToTimestamp } from '@/utils/_deprecated/time';
import { getNotification } from '@/utils/notificationTemplates';
import { Avatar, Box, Grid, Step, StepLabel, Stepper } from '@mui/material';
import dayjs from 'dayjs';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

const steps = [
    'Vyberte důvod návštěvy',
    'Vyberte datum a čas',
    'Přehled a potvrzení',
];

interface ICreateAppointmentState {
    isAppointmentConfirmed: boolean;
    activeStep: number;
    selectedServiceId: string | null;
    selectedService: IService | null;
    selectedDate: dayjs.Dayjs | null;
    selectedTime: string;
}

const CreateAppointment: FC = () => {
    const { t: tAppoinemts } = useTranslation('appointments')
    const { id: doctorId } = useParams<{ id: string }>();
    const { user } = useAuthStore();
    const { userData } = useUserStore();
    const { doctorDetail, fetchDoctorDetail, isFetchingDoctorDetail } =
        useDoctorStore();
    const { services, fetchServices, isFetchingServices } = useServicesStore();
    const { fetchAppointments, createAppointment, isCreatingAppointment } =
        useAppointmentsStore();
    const { addNotification } = useNotificationStore()

    useEffect(() => {
        if (doctorId) {
            fetchDoctorDetail(doctorId);
            fetchServices(doctorId);
        }
    }, [doctorId, fetchDoctorDetail, fetchServices]);

    const [state, setState] = useState<ICreateAppointmentState>({
        isAppointmentConfirmed: false,
        activeStep: 0,
        selectedServiceId: null,
        selectedService: null,
        selectedDate: null,
        selectedTime: '',
    });

    const updateState = (newState: Partial<ICreateAppointmentState>) => {
        setState((prevState) => ({ ...prevState, ...newState }));
    };

    const handleNext = useCallback(() => {
        updateState({ activeStep: state.activeStep + 1 });
    }, [state.activeStep]);

    const handleBack = useCallback(() => {
        updateState({ activeStep: state.activeStep - 1 });
    }, [state.activeStep]);

    const handleServiceSelect = useCallback((service: IService) => {
        updateState({
            selectedServiceId: service?.id || null,
            selectedService: service || null,
        });
    }, []);

    const handleSelectDate = useCallback(
        async (selectedDate: dayjs.Dayjs | null) => {
            updateState({ selectedDate });
            const specificDay = selectedDate?.startOf('day').toDate();
            if (specificDay && doctorId) {
                await fetchAppointments(doctorId, 'doctorId', specificDay);
            }
        },
        [doctorId, fetchAppointments]
    );

    const handleSelectTime = useCallback((time: string) => {
        updateState({ selectedTime: time });
    }, []);

    const notificationClient = getNotification('reservationCreated');
    const notificationDoctor = getNotification('newReservationForDoctor')

    const handleCreateAppointment = useCallback(async () => {
        const { selectedService, selectedDate, selectedTime } = state;

        if (!selectedService || !selectedDate || !selectedTime || !user) return;

        const [hours, minutes] = selectedTime.split(':').map(Number);

        const startTimeDayjs = dayjs(selectedDate).hour(hours).minute(minutes);
        const duration = selectedService.defaultDuration || 0;
        const endTimeDayjs = startTimeDayjs.add(duration, 'minute');

        const startTime = convertDayjsToTimestamp(startTimeDayjs);
        const endTime = convertDayjsToTimestamp(endTimeDayjs);
        const createdAt = convertDayjsToTimestamp(dayjs())

        if (doctorId && state.selectedServiceId && userData) {
            const newAppointment = {
                clientId: user.uid,
                doctorId,
                clientFirstName: userData.firstName,
                clientLastName: userData.lastName,
                serviceId: state.selectedServiceId,
                serviceName: selectedService.name,
                status: AppointmentStatus.pending,
                start: startTime,
                end: endTime,
                createdAt: createdAt,
            };

            try {
                await createAppointment(newAppointment);
                await addNotification(userData.id, notificationClient.title, notificationClient.message, notificationClient.status, notificationClient.link);
                await addNotification(doctorId, notificationDoctor.title, notificationDoctor.message, notificationDoctor.status, notificationDoctor.link);
                setState((prevState) => ({
                    ...prevState,
                    isAppointmentConfirmed: true,
                    selectedServiceId: null,
                    selectedService: null,
                    selectedDate: null,
                    selectedTime: '',
                }));
            } catch (error) {
                console.error('Failed to create appointment:', error);
            }
        }
    }, [state, user, doctorId, userData, createAppointment]);

    const isLastStep = state.activeStep === steps.length - 1;

    return (
        <Paper>
            <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                    <Card
                        title={`
                            ${doctorDetail?.titleBefore} 
                            ${doctorDetail?.firstName} 
                            ${doctorDetail?.lastName} 
                            ${doctorDetail?.titleAfter}
                        `}
                        withHeaderDivider
                    >
                        <Box
                            display="flex"
                            alignItems="center"
                            width="100%"
                            justifyContent="center"
                        >
                            <Avatar
                                sx={{ width: 100, height: 100 }}
                                src={doctorDetail?.profilePicture}
                            />
                        </Box>

                        <Box sx={{ my: 2 }}>
                            {doctorDetail?.workingHours && <WorkingHours workingHours={doctorDetail.workingHours} />}
                        </Box>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card
                        title={tAppoinemts('Reservation')}
                        withHeaderDivider
                        footerPosition="right"
                        showFooter={!state.isAppointmentConfirmed}
                        footer={
                            <>
                                <Button
                                    disabled={state.activeStep === 0}
                                    onClick={handleBack}
                                >
                                    {tAppoinemts('Back')}
                                </Button>
                                <Button
                                    onClick={
                                        isLastStep
                                            ? handleCreateAppointment
                                            : handleNext
                                    }
                                    disabled={
                                        (state.activeStep === 0 && !state.selectedServiceId) ||
                                        (state.activeStep === 1 && (!state.selectedDate || !state.selectedTime)) ||
                                        isCreatingAppointment
                                    }
                                    variant="contained"
                                    color={isLastStep ? 'success' : 'primary'}
                                >
                                    {isLastStep ? tAppoinemts('Create a reservation') : tAppoinemts('Next')}
                                </Button>
                            </>
                        }>
                        <Stepper
                            activeStep={state.activeStep}
                            alternativeLabel
                            orientation="horizontal"
                        >
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box mt={4}>
                            {state.activeStep === 0 && (
                                <ServiceSelection
                                    services={services}
                                    selectedServiceId={state.selectedServiceId}
                                    handleServiceSelect={handleServiceSelect}
                                />
                            )}

                            {state.activeStep === 1 && (
                                <DateAndTimeSelection
                                    selectedService={state.selectedService}
                                    selectedDate={state.selectedDate}
                                    selectedTime={state.selectedTime}
                                    handleSelectDate={handleSelectDate}
                                    handleSelectTime={handleSelectTime}
                                />
                            )}

                            {state.activeStep === 2 ? (
                                state.isAppointmentConfirmed ? (
                                    <AppointmentConfirmation />
                                ) : (
                                    <ReviewAndConfirm
                                        selectedService={state.selectedService}
                                        selectedDate={state.selectedDate}
                                        selectedTime={state.selectedTime}
                                    />
                                )
                            ) : null}
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CreateAppointment;
