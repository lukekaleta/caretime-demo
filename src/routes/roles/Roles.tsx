import React, { useCallback, useEffect } from 'react';
import { Box, Chip, Fab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useRolesStore from '@/stores/rolesStore';
import AddIcon from '@mui/icons-material/Add';
import RoleDrawer from '@/components/Drawers/RoleDrawer';
import { useNavigate } from 'react-router';
import { RouteNames } from '@/enums/RouteNames';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import dataGridConfig from '@/config/dataGridConfig';
import { IRoleData } from '@/interfaces/Role';
import { Paper } from '@/components/Paper';
import { useTranslation } from 'react-i18next';

const Roles: React.FC = () => {
    const { t } = useTranslation('roles');
    const { roles, fetchRoles, loading, setSelectedRole } = useRolesStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    const handleOpenDrawer = useCallback(
        (role?: IRoleData) => {
            if (role) {
                setSelectedRole(role);
            } else {
                setSelectedRole(null);
            }
            navigate(`${RouteNames.RoleManager}`);
        },
        [setSelectedRole]
    );

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Název',
            width: 150,
            renderCell: (params) => <>{t(params.row.id)}</>,
        },
        {
            field: 'isActive',
            headerName: 'Stav',
            width: 150,
            renderCell: (params) => (
                <Chip
                    icon={
                        <Icon
                            path={params.row.isActive ? mdiCheck : mdiClose}
                            size={0.6}
                        />
                    }
                    color={params.row.isActive ? 'success' : 'error'}
                    label={params.row.isActive ? 'Aktivní' : 'Neaktivní'}
                    variant="outlined"
                    size="small"
                />
            ),
        },
        { field: 'description', headerName: 'Popis role uživatele', flex: 1 },
    ];

    return (
        <Paper>
            <Box>
                <RoleDrawer />

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => handleOpenDrawer()}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>

                <DataGrid
                    rows={roles}
                    columns={columns}
                    loading={loading}
                    onRowClick={(params) => handleOpenDrawer(params.row)}
                    initialState={dataGridConfig.initialState}
                    pageSizeOptions={dataGridConfig.pageSizeOptions}
                    sx={dataGridConfig.styles}
                />
            </Box>
        </Paper>
    );
};

export default Roles;
