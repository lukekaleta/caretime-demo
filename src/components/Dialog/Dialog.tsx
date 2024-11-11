import React from 'react';
import {
    CircularProgress,
    Dialog as MuiDialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import useDialogStore from '@/stores/dialogStore';
import { Button } from '@/components/Button';
import { theme } from '@/theme/index';

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    fontWeight: theme.typography.fontWeightBold,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
}));

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
}));

interface GlobalDialogProps {
    minWidth?: string | number;
    hideCancelButton?: boolean;
    hideConfirmButton?: boolean;
    cancelButtonText?: string; // Přidání možnosti přejmenovat tlačítko "Zrušit"
}

const GlobalDialog: React.FC<GlobalDialogProps> = ({
    minWidth = '400px',
    hideCancelButton = false,
    hideConfirmButton = false,
    cancelButtonText = 'Zrušit', // Výchozí text pro tlačítko "Zrušit"
}) => {
    const {
        isOpen,
        dialogTitle,
        dialogContent,
        loading,
        onConfirm,
        closeDialog,
        onCancel,
        confirmButtonText = 'Potvrdit',
    } = useDialogStore();

    return (
        <MuiDialog
            open={isOpen}
            onClose={onCancel || closeDialog}
            PaperProps={{
                style: { minWidth: minWidth },
            }}
        >
            <StyledDialogTitle>{dialogTitle}</StyledDialogTitle>
            <Divider variant="middle" />
            <StyledDialogContent>
                <DialogContentText>{dialogContent}</DialogContentText>
            </StyledDialogContent>
            <Divider variant="middle" />
            <StyledDialogActions>
                {!hideCancelButton && (
                    <Button
                        onClick={onCancel || closeDialog}
                        variant="text"
                        color="error"
                        disabled={loading}
                    >
                        {cancelButtonText}
                    </Button>
                )}
                {!hideConfirmButton && (
                    <Button
                        onClick={onConfirm}
                        color="success"
                        variant="text"
                        disabled={loading}
                        autoFocus
                    >
                        {loading ? (
                            <CircularProgress
                                size={20}
                                sx={{ color: theme.palette.grey['500'] }}
                            />
                        ) : (
                            confirmButtonText
                        )}
                    </Button>
                )}
            </StyledDialogActions>
        </MuiDialog>
    );
};

export default GlobalDialog;
