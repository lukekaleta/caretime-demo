import { Paper } from '@/components/Paper';
import { Grid, Skeleton, Typography } from '@mui/material';
import React from 'react';

const ClientDetailLoading: React.FC = () => {
    return (
        <Paper>
            <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6">
                        <Skeleton width="50%" />
                    </Typography>
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                    <Skeleton height={40} />
                </Grid>

                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                <Skeleton width="50%" />
                            </Typography>
                            <Skeleton height={40} />
                            <Skeleton height={40} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                <Skeleton width="50%" />
                            </Typography>
                            <Skeleton height={40} />
                            <Skeleton height={40} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6">
                                <Skeleton width="50%" />
                            </Typography>
                            <Skeleton height={40} />
                            <Skeleton height={40} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ClientDetailLoading;