import React, { useCallback } from 'react';
import { Box, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/enums/RouteNames';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Paper } from '@/components/Paper';
import { Button } from '@/components/Button';

const Unauthorized: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const goBack = useCallback(() => {
        navigate(-1);
    }, [navigate]);

    const goToHome = useCallback(() => {
        navigate(RouteNames.Home);
    }, [navigate]);

    return (
        <Paper
            sx={{
                p: 4,
                mt: 8,
                maxWidth: 600,
                margin: 'auto',
                textAlign: 'center',
            }}
        >
            <Box sx={{ fontSize: 60, color: theme.palette.error.main }}>
                <WarningAmberIcon sx={{ fontSize: 'inherit' }} />
            </Box>
            <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
                Neautorizovaný přístup
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                Omlouváme se, ale nemáte oprávnění k zobrazení této stránky.
                Pokud si myslíte, že se jedná o chybu, kontaktujte prosím
                správce.
            </Typography>
            <Button
                variant="outlined"
                color="primary"
                onClick={goBack}
                sx={{ mr: 2 }}
            >
                Vrátit se zpět
            </Button>
            <Button variant="contained" color="primary" onClick={goToHome}>
                Přejít na hlavní stránku
            </Button>
        </Paper>
    );
};

export default Unauthorized;
