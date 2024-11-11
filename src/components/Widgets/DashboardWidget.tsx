import { IWidget } from '@/interfaces/Widget';
import { theme } from '@/theme/index';
import Icon from '@mdi/react';
import { Box, PaletteColor, Paper, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { FC } from 'react';

const getGradient = (color: "primary" | "secondary" | "warning" | "success"): string => {
    switch (color) {
        case 'primary':
            return 'linear-gradient(135deg, #e0eafc, #cfdef3)';
        case 'secondary':
            return 'linear-gradient(135deg, #fde2e4, #f9b4c2)';
        case 'success':
            return 'linear-gradient(135deg, #e0f7e9, #baf3c0)';
        case 'warning':
            return 'linear-gradient(135deg, #fff5e1, #ffdab9)';
        default:
            console.warn(`Unknown color: ${color}, applying default gradient.`);
            return 'linear-gradient(135deg, #e0eafc, #cfdef3)'; // Default gradient
    }
};

const getTextColor = (color: keyof typeof theme.palette): string => {
    const paletteColor = theme.palette[color];
    if (typeof paletteColor === 'object' && 'main' in paletteColor) {
        return paletteColor.main;
    }
    return theme.palette.text.primary;
};

const StyledPaper = styled(Paper, {
    shouldForwardProp: (prop) => prop !== '_bgColor',
})<{ _bgColor: keyof typeof theme.palette }>(
    ({ theme, _bgColor }) => ({
        padding: theme.spacing(3),
        background: getGradient(_bgColor as "primary" | "secondary" | "warning" | "success"),
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.5s',
        '&:hover': {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
    })
);

interface DashboardWidgetProps extends IWidget {
}

const DashboardWidget: FC<DashboardWidgetProps> = ({ title, value, icon, bgColor }) => {
    const textColor = getTextColor(bgColor);

    return (
        <StyledPaper _bgColor={bgColor}>
            <Box display="flex" flexDirection="column" justifyContent="space-between" height="100%">
                <Box display="flex" justifyContent="space-between">
                    <Icon
                        path={icon}
                        size={1.4}
                        color={
                            typeof theme.palette[bgColor] === 'object' && 'main' in theme.palette[bgColor]
                                ? (theme.palette[bgColor] as PaletteColor).main
                                : theme.palette.text.primary
                        }
                    />
                </Box>

                <Box mt={3}>
                    <Typography variant="h6" color={textColor}>
                        {title}
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" color={textColor}>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </StyledPaper>
    );
};

export default DashboardWidget;