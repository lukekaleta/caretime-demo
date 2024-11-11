import { Paper } from "@/components/Paper";
import { IService } from "@/interfaces/Service";
import { Chip, Divider, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { useTranslation } from "react-i18next";

interface ReviewAndConfirmProps {
    selectedService: IService | null;
    selectedDate: dayjs.Dayjs | null;
    selectedTime: string;
}

const ReviewAndConfirm: FC<ReviewAndConfirmProps> = ({
    selectedService,
    selectedDate,
    selectedTime
}) => {
    const { t: tAppoinemts } = useTranslation('appointments')

    return (
        <Paper>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {tAppoinemts('Service name')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {selectedService?.name || tAppoinemts('Unknown service')}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {tAppoinemts('Service description')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {selectedService?.description || tAppoinemts('No description')}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2} alignItems="center">
                <Grid item>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {tAppoinemts('Date and time')}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        {selectedDate ? selectedDate.format('DD.MM.YYYY') : tAppoinemts('Not selected')} v {selectedTime || tAppoinemts('Not selected')}
                    </Typography>
                </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                {tAppoinemts('Duration')}
            </Typography>
            <Typography variant="body1" color="textSecondary">
                {selectedService?.defaultDuration || tAppoinemts('Not selected')} {tAppoinemts('Minutes')}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {selectedService?.price && (
                <>
                    <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                        {tAppoinemts('Service price')}
                    </Typography>
                    <Chip size="medium" variant="outlined" color="secondary" label={`${selectedService.price} Kč`} />
                </>
            )}
        </Paper>
    );
};

export default ReviewAndConfirm;