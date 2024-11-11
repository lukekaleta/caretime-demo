import { Button } from "@/components/Button";
import { mdiBellOutline, mdiCellphoneText, mdiCheckCircleOutline, mdiEmailOutline } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const AppointmentConfirmation: FC = () => {
    const { t: tAppoinemts } = useTranslation('appointments')

    return (
        <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignContent="center"
            alignItems="center"
            sx={{ gap: 2 }}
        >
            <Icon path={mdiCheckCircleOutline} size={3} color="green" />
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                {tAppoinemts('The reservation has been created')}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
                {tAppoinemts('Your appointment with the doctor has been successfully received')}
            </Typography>
            <Typography variant="body2" color="error" sx={{ mb: 3 }}>
                {tAppoinemts('The reservation will be valid once confirmed by the doctor. You will be informed via email, SMS, or you can check the reservation status in the app')}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 3 }}>
                <Icon path={mdiEmailOutline} size={1.3} />
                <Icon path={mdiCellphoneText} size={1.3} />
                <Icon path={mdiBellOutline} size={1.3} />
            </Box>
            <Button variant="contained" color="primary">
                {tAppoinemts('Zobrazit moje rezervace')}
            </Button>
        </Box>
    );
};

export default AppointmentConfirmation;