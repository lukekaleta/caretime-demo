import React, { FC, useEffect } from 'react';
import {
    Avatar,
    Box,
    MenuItem,
    Select,
    Skeleton,
    Typography,
} from '@mui/material';
import Icon from '@mdi/react';
import { mdiHospitalBuilding } from '@mdi/js';
import { styled, useTheme } from '@mui/material/styles';
import useOrganizationStore from '@/stores/organizationsStore';

const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 200,
}));

const ManageOrganization: FC = () => {
    const {
        loading: loadingOrganizations,
        organizations,
        selectedOrganization,
        selectOrganization,
        fetchOrganizations,
    } = useOrganizationStore();

    const theme = useTheme();
    const iconSize = 0.7;

    const handleChangeOrganization = (event: any) => {
        const selectedOrg = organizations.find(
            (org) => org.name === event.target.value
        );
        if (selectedOrg) {
            selectOrganization(selectedOrg);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    return (
        <Box sx={{ p: theme.spacing(1), mx: theme.spacing(1) }}>
            <StyledSelect
                value={selectedOrganization?.name || ''}
                onChange={handleChangeOrganization}
                fullWidth
                displayEmpty
                renderValue={() => (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ width: 30, height: 30 }}>
                            <Icon path={mdiHospitalBuilding} size={iconSize} />
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                            <Typography
                                variant="body1"
                                sx={{
                                    fontWeight:
                                        theme.typography.fontWeightMedium,
                                }}
                            >
                                {loadingOrganizations ? (
                                    <Skeleton width={100} />
                                ) : (
                                    selectedOrganization?.name
                                )}
                            </Typography>
                            <Typography variant="body2">
                                {selectedOrganization?.phone}
                            </Typography>
                        </Box>
                    </Box>
                )}
            >
                {organizations.map((org) => (
                    <MenuItem
                        key={org.id}
                        value={org.name}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: theme.spacing(1),
                        }}
                    >
                        <Avatar sx={{ width: 30, height: 30 }}>
                            <Icon path={mdiHospitalBuilding} size={iconSize} />
                        </Avatar>
                        <Box sx={{ ml: 1 }}>
                            <Typography
                                sx={{
                                    fontSize: 14,
                                    lineHeight: 1.2,
                                }}
                            >
                                {org.name}
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: 12,
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                {org.phone}
                            </Typography>
                        </Box>
                    </MenuItem>
                ))}
            </StyledSelect>
        </Box>
    );
};

export default ManageOrganization;
