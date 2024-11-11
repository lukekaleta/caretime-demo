import { FC } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

// Stylování tlačítka
const StyledButton = styled(Button)(({ theme }) => ({
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1.5, 2),
    fontWeight: theme.typography.fontWeightMedium,
    boxShadow: 'none',

    // Primary
    '&.MuiButton-containedPrimary': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedPrimary': {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        '&:hover': {
            borderColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark,
        },
    },
    '&.MuiButton-textPrimary': {
        color: theme.palette.primary.main,
        '&:hover': {
            color: theme.palette.primary.dark,
        },
    },

    // Secondary
    '&.MuiButton-containedSecondary': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedSecondary': {
        borderColor: theme.palette.secondary.main,
        color: theme.palette.secondary.main,
        '&:hover': {
            borderColor: theme.palette.secondary.dark,
            color: theme.palette.secondary.dark,
        },
    },
    '&.MuiButton-textSecondary': {
        color: theme.palette.secondary.main,
        '&:hover': {
            color: theme.palette.secondary.dark,
        },
    },

    // Error
    '&.MuiButton-containedError': {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.error.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.error.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedError': {
        borderColor: theme.palette.error.main,
        color: theme.palette.error.main,
        '&:hover': {
            borderColor: theme.palette.error.dark,
            color: theme.palette.error.dark,
        },
    },
    '&.MuiButton-textError': {
        color: theme.palette.error.main,
        '&:hover': {
            color: theme.palette.error.dark,
        },
    },

    // Warning
    '&.MuiButton-containedWarning': {
        backgroundColor: theme.palette.warning.light,
        color: theme.palette.warning.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.warning.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedWarning': {
        borderColor: theme.palette.warning.main,
        color: theme.palette.warning.main,
        '&:hover': {
            borderColor: theme.palette.warning.dark,
            color: theme.palette.warning.dark,
        },
    },
    '&.MuiButton-textWarning': {
        color: theme.palette.warning.main,
        '&:hover': {
            color: theme.palette.warning.dark,
        },
    },

    // Info
    '&.MuiButton-containedInfo': {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.info.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.info.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedInfo': {
        borderColor: theme.palette.info.main,
        color: theme.palette.info.main,
        '&:hover': {
            borderColor: theme.palette.info.dark,
            color: theme.palette.info.dark,
        },
    },
    '&.MuiButton-textInfo': {
        color: theme.palette.info.main,
        '&:hover': {
            color: theme.palette.info.dark,
        },
    },

    // Success
    '&.MuiButton-containedSuccess': {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.success.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.success.main,
            boxShadow: 'none',
        },
    },
    '&.MuiButton-outlinedSuccess': {
        borderColor: theme.palette.success.main,
        color: theme.palette.success.main,
        '&:hover': {
            borderColor: theme.palette.success.dark,
            color: theme.palette.success.dark,
        },
    },
    '&.MuiButton-textSuccess': {
        color: theme.palette.success.main,
        '&:hover': {
            color: theme.palette.success.dark,
        },
    },

    '&.MuiButton-contained:disabled': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[600],
    },
    '&.MuiButton-outlined:disabled': {
        backgroundColor: theme.palette.grey[50],
        borderColor: theme.palette.grey[600],
        color: theme.palette.grey[600],
    },
    '&.MuiButton-text:disabled': {
        color: theme.palette.grey[600], // Text color for disabled state
    },
}));

// Definice komponenty CustomButton
const CustomButton: FC<ButtonProps> = (props) => {
    return <StyledButton {...props} />;
};

export default CustomButton;
