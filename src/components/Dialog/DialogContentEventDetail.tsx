import {
    mdiCheckboxMarkedCircleOutline,
    mdiClockOutline,
    mdiNoteOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface DialogContentEventDetailProps {
    title: string;
    start: Timestamp | null;
    end?: Timestamp | null;
    status: string;
    note?: string;
    clientName: string;
    durationText: string;
}

const DialogContentEventDetail: React.FC<DialogContentEventDetailProps> = ({
    start,
    end,
    status,
    note,
    durationText,
}) => {
    const { t } = useTranslation('calendar');

    return (
        <Box p={3}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center">
                        <Icon path={mdiClockOutline} size={1} />
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            sx={{ fontWeight: 'bold', marginLeft: 1 }}
                        >
                            {t('start') as String}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                        Datum start
                    </Typography>
                </Grid>

                {end && (
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" alignItems="center">
                            <Icon path={mdiClockOutline} size={1} />
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                sx={{ fontWeight: 'bold', marginLeft: 1 }}
                            >
                                {t('end') as String}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary">
                            Datum end
                        </Typography>
                    </Grid>
                )}

                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center">
                        <Icon path={mdiCheckboxMarkedCircleOutline} size={1} />
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            sx={{ fontWeight: 'bold', marginLeft: 1 }}
                        >
                            {t('status') as String}
                        </Typography>
                    </Box>
                    <Chip
                        label={t(status) as String}
                        color={
                            status === 'confirmed'
                                ? 'success'
                                : status === 'cancelled'
                                    ? 'error'
                                    : 'default'
                        }
                        variant="outlined"
                        sx={{ mt: 1 }}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box display="flex" alignItems="center">
                        <Icon path={mdiClockOutline} size={1} />
                        <Typography
                            variant="body1"
                            color="textPrimary"
                            sx={{ fontWeight: 'bold', marginLeft: 1 }}
                        >
                            {t('duration') as String}
                        </Typography>
                    </Box>
                    <Typography variant="body1" color="textSecondary">
                        {durationText}
                    </Typography>
                </Grid>

                {note && (
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Icon path={mdiNoteOutline} size={1} />
                            <Typography
                                variant="body1"
                                color="textPrimary"
                                sx={{ fontWeight: 'bold', marginLeft: 1 }}
                            >
                                {t('note') as String}
                            </Typography>
                        </Box>
                        <Typography variant="body1" color="textSecondary">
                            {note}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
};

export default DialogContentEventDetail;
