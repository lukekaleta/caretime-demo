import React from 'react';
import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';

const StyledPaper = styled(MuiPaper)<{ sx?: SxProps<Theme> }>(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0],
}));

interface PaperProps {
    children: React.ReactNode;
    sx?: SxProps<Theme>;
}

const Paper: React.FC<PaperProps> = ({ children, sx }) => {
    return <StyledPaper sx={sx}>{children}</StyledPaper>;
};

export default Paper;
