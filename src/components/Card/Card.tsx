import {
    Avatar,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Card as MuiCard,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { SxProps, Theme } from '@mui/system';
import React from 'react';

const StyledCard = styled(MuiCard)<{ sx?: SxProps<Theme> }>(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[0],
    border: `1px solid ${theme.palette.grey[300]}`,
    transition: 'box-shadow 0.5s ease-in-out',

    '&:hover': {
        boxShadow: theme.shadows[1],
    },
}));

interface CardProps {
    title?: string;
    subtitle?: string;
    avatar?: React.ReactNode;
    action?: React.ReactNode;
    children: React.ReactNode;
    footer?: React.ReactNode;
    sx?: SxProps<Theme>;
    withHeaderDivider?: boolean;
    withFooterDivider?: boolean;
    footerPosition?: 'left' | 'center' | 'right';
    showFooter?: boolean;
}

const Card: React.FC<CardProps> = ({
    title,
    subtitle,
    avatar,
    action,
    children,
    footer,
    sx,
    withHeaderDivider = false,
    withFooterDivider = true,
    footerPosition = 'left',
    showFooter = true,
}) => {
    const getFooterAlignment = () => {
        switch (footerPosition) {
            case 'center':
                return 'center';
            case 'right':
                return 'flex-end';
            default:
                return 'flex-start';
        }
    };

    return (
        <StyledCard sx={sx}>
            {(title || subtitle || avatar || action) && (
                <>
                    <CardHeader
                        title={title}
                        subheader={subtitle}
                        avatar={avatar ? <Avatar>{avatar}</Avatar> : null}
                        action={action ? action : null}
                    />
                    {withHeaderDivider && <Divider />}
                </>
            )}
            <CardContent>{children}</CardContent>
            {footer && showFooter && (
                <>
                    {withFooterDivider && <Divider />}
                    <CardActions sx={{ justifyContent: getFooterAlignment() }}>
                        {footer}
                    </CardActions>
                </>
            )}
        </StyledCard>
    );
};

export default Card;