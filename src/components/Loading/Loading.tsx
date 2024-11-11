import React, { FC } from 'react';
import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Logo } from '../Logo';

const Loading: FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundColor: '#f1f5f9',
                padding: theme.spacing(4),
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    padding: theme.spacing(6),
                    textAlign: 'center',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'auto',
                    width: '100%',
                    maxWidth: 400,
                }}
            >
                <Box sx={{ mb: theme.spacing(4) }}>
                    <Logo height={60} />
                </Box>

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: theme.typography.fontWeightBold,
                        color: theme.palette.primary.main,
                        mb: theme.spacing(2),
                    }}
                >
                    Načítám data...
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: theme.palette.text.secondary,
                        mb: theme.spacing(4),
                    }}
                >
                    Chvíli strpení, prosím.
                </Typography>

                <CircularProgress
                    size={80}
                    sx={{ color: theme.palette.primary.main }}
                />

                <Typography
                    variant="caption"
                    sx={{
                        mt: theme.spacing(4),
                        color: theme.palette.text.disabled,
                    }}
                >
                    Tento proces může chvíli trvat, děkujeme za trpělivost.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Loading;
