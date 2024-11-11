import { OrganizationDrawer } from '@/components/Drawers';
import { Paper } from '@/components/Paper';
import dataGridConfig from '@/config/dataGridConfig';
import { OrganizationsData } from '@/interfaces/_depracated/Organizations';
import useOrganizationStore from '@/stores/organizationsStore';
import AddIcon from '@mui/icons-material/Add';
import { Box, Fab } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect } from 'react';

const Organizations: FC = () => {
    const {
        loading,
        organizations,
        fetchOrganizations,
        setSelectedOrganization,
        setOrganizationDrawer,
    } = useOrganizationStore();

    const handleOpenDrawer = useCallback(
        (organization?: OrganizationsData) => {
            if (organization) {
                setSelectedOrganization(organization);
            } else {
                setSelectedOrganization(null);
            }
            setOrganizationDrawer(true);
        },
        [setOrganizationDrawer, setSelectedOrganization]
    );

    useEffect(() => {
        fetchOrganizations();
    }, [fetchOrganizations]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Název', width: 200 },
        { field: 'phone', headerName: 'Telefon', width: 150 },
        { field: 'email', headerName: 'E-mail', width: 200 },
        { field: 'description', headerName: 'Popis', flex: 1 },
    ];

    return (
        <Paper>
            <Box>
                <OrganizationDrawer />

                <Fab
                    color="primary"
                    aria-label="add"
                    onClick={() => handleOpenDrawer()}
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                >
                    <AddIcon />
                </Fab>

                <DataGrid
                    rows={organizations || []}
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

export default Organizations;
