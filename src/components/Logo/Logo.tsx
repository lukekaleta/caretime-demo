import { FC, useCallback } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@/enums/RouteNames';

interface LogoProps {
    variant?: 'color' | 'color-long' | 'light' | 'dark';
    width?: number;
    height?: number;
}

const Logo: FC<LogoProps> = ({ variant = 'color', height = 50, width }) => {
    const navigate = useNavigate();

    const logoSrc = `/assets/logo/logo-${variant}.svg`;

    const handleClick = useCallback(() => {
        navigate(RouteNames.Home);
    }, [navigate]);

    return (
        <Box
            component="img"
            src={logoSrc}
            alt={`${variant} logo`}
            sx={{
                width: width || 'auto',
                height: height,
                cursor: 'pointer',
            }}
            onClick={handleClick}
        />
    );
};

export default Logo;
