import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { IService } from '@/interfaces/Service';
import { theme } from '@/theme/index';
import { mdiCheck } from '@mdi/js';
import Icon from '@mdi/react';
import { Chip, Grid, Typography } from '@mui/material';
import { FC } from 'react';

interface ServiceSelectionProps {
    services: IService[];
    handleServiceSelect: (service: IService) => void;
    selectedServiceId: string | null;
}

const ServiceSelection: FC<ServiceSelectionProps> = ({
    services,
    handleServiceSelect,
    selectedServiceId,
}) => (
    <Grid container spacing={2}>
        {services.map((service) => (
            <Grid item xs={12} sm={6} xl={4} key={service.id}>
                <Card
                    sx={{
                        border:
                            selectedServiceId === service.id
                                ? `1px solid ${theme.palette.success.main}`
                                : '1px solid lightgray',
                    }}
                    footer={
                        selectedServiceId === service.id
                            ? (
                                <Button
                                    variant="text"
                                    color='success'
                                    size="small"
                                >
                                    <Icon path={mdiCheck} size={1} />
                                </Button>

                            )
                            : (
                                <Button
                                    variant="text"
                                    size="small"
                                    onClick={() => handleServiceSelect(service)}
                                >
                                    Vybrat
                                </Button>
                            )
                    }
                >
                    <Typography variant="h6">{service.name}</Typography>
                    <Typography variant="body2" sx={{ my: 2 }}>
                        {service.description}
                    </Typography>
                    <Chip
                        variant="outlined"
                        color="secondary"
                        label={`${service.price} Kč`}
                    />
                </Card>
            </Grid>
        ))}
    </Grid>
);

export default ServiceSelection;
