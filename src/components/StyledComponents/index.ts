import { IconButton, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledListItem = styled(ListItem)(({ theme }) => ({
    marginBottom: 0,
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
        backgroundColor: theme.palette.grey[100],
    },
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
    padding: 0,
    color: theme.palette.secondary.main,
    '&:hover': {
        backgroundColor: 'transparent',
    },
}));
