import { Button } from '@/components/Button';
import { ClientAddCreateClient, ClientAddEnterData, ClientAddSelectUser } from '@/components/Clients';
import { Paper } from '@/components/Paper';
import UserStatus from '@/enums/UserStatus';
import { IClient } from '@/interfaces/Client';
import useClientStore from '@/stores/clientsStore';
import useUsersStore from '@/stores/usersStore';
import { Box, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { FC, useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../../components/Card';

const ClientManageRegistered: FC = () => {
    const { t } = useTranslation('clients');
    const [activeStep, setActiveStep] = useState(0);
    const { selectedUser, setSelectedUser, updateUser } = useUsersStore();
    const { addClientByUser, isAddingClientByUser } = useClientStore();

    const handleCreateClient = useCallback(async () => {
        const clientData: Partial<IClient> = {
            id: selectedUser?.id,
            birthNumber: selectedUser?.birthNumber,
            status: UserStatus.active,
            registrationDate: new Date(),
        };

        await addClientByUser(clientData);
    }, [selectedUser, updateUser, addClientByUser]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const steps = [
        t('Select registered user'),
        t('Enter data'),
        t('Review and confirm'),
    ];

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <ClientAddSelectUser />;
            case 1:
                return <ClientAddEnterData />;
            case 2:
                return <ClientAddCreateClient />;
            default:
                return null;
        }
    };

    useEffect(() => {
        setSelectedUser(null);
    }, [setSelectedUser]);

    return (
        <Paper>
            <Card
                footerPosition='right'
                footer={
                    <>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            <>{t('Back')}</>
                        </Button>

                        {activeStep === steps.length - 1 ? (
                            <Button
                                onClick={handleCreateClient}
                                disabled={isAddingClientByUser}
                                variant="contained"
                                size="large"
                            >
                                {t('Create a client')}
                            </Button>
                        ) : (
                            <Button
                                onClick={handleNext}
                                variant="contained"
                                size="large"
                                disabled={!selectedUser}
                            >
                                {t('Next')}
                            </Button>
                        )}
                    </>
                }>
                <Box sx={{ maxWidth: '80%', mx: 'auto', my: 4 }}>
                    <Stepper activeStep={activeStep} orientation="horizontal">
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {activeStep === steps.length ? (
                    <Box sx={{ mt: 3, mb: 2 }}>
                        <Typography>
                            Všechny kroky dokončeny - uživatel byl vytvořen!
                        </Typography>
                        <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                            Resetovat
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        {renderStepContent(activeStep)}
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                pt: 2,
                            }}
                        >

                        </Box>
                    </Box>
                )}
            </Card>
        </Paper>
    );
};

export default ClientManageRegistered;
