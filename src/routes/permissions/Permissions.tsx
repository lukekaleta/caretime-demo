import { PermissionDrawer } from '@/components/Drawers';
import { Paper } from '@/components/Paper';
import dataGridConfig from '@/config/dataGridConfig';
import { PermissionData } from '@/interfaces/_depracated/Permissions';
import usePermissionsStore from '@/stores/permissionsStore';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect } from 'react';

const Permissions: FC = () => {
    const {
        loading,
        permissions,
        fetchPermissions,
        setPermissionDrawer,
        setSelectedPermission,
    } = usePermissionsStore();

    const handleOpenDrawer = useCallback(
        (permission?: PermissionData) => {
            if (permission) {
                setSelectedPermission(permission);
            } else {
                setSelectedPermission(null);
            }
            setPermissionDrawer(true);
        },
        [setPermissionDrawer, setSelectedPermission]
    );

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Název', width: 300 },
        { field: 'description', headerName: 'Popis', flex: 1 },
    ];

    return (
        <Paper>
            <Box>
                <PermissionDrawer />

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => handleOpenDrawer()}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>

                <DataGrid
                    rows={permissions || []}
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

export default Permissions;
