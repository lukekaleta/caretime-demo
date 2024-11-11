import { ServiceDrawer } from '@/components/Drawers';
import { Paper } from '@/components/Paper';
import dataGridConfig from '@/config/dataGridConfig';
import { IService } from '@/interfaces/Service';
import useDrawersStore from '@/stores/drawersStore';
import useProcedureStore from '@/stores/serviceStore';
import { formatCurrency } from '@/utils/index';
import { mdiClockOutline } from '@mdi/js';
import Icon from '@mdi/react';
import AddIcon from '@mui/icons-material/Add';
import { Box, Chip, Fab, Tooltip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FC, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Services: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { setProcedureDetailDrawer } = useDrawersStore();
    const { isFetchingServices, services, fetchServices, setSelectedService } =
        useProcedureStore();

    const handleOpenDrawer = useCallback(
        (service?: IService) => {
            if (service) {
                setSelectedService(service);
            } else {
                setSelectedService(null);
            }
            setProcedureDetailDrawer(true);
        },
        [setProcedureDetailDrawer, setSelectedService]
    );

    useEffect(() => {
        if (id) {
            fetchServices(id);
        }
    }, [fetchServices]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Název procedury', width: 250 },
        {
            field: 'price',
            headerName: 'Cena',
            width: 120,
            renderCell: (params) => formatCurrency(params.row.price),
        },
        {
            field: 'defaultDuration',
            headerName: 'Doba trvání',
            width: 100,

            renderCell: (params) => (
                <Chip
                    icon={<Icon path={mdiClockOutline} size={0.6} />}
                    variant="outlined"
                    color="secondary"
                    label={params.row.defaultDuration}
                />
            ),
        },
        { field: 'description', headerName: 'Popis', flex: 1 },
    ];

    return (
        <Paper>
            <Box>
                <ServiceDrawer />

                <Tooltip title="Přidat proceduru">
                    <Fab
                        color="primary"
                        aria-label="add"
                        onClick={() => handleOpenDrawer()}
                        sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    >
                        <AddIcon />
                    </Fab>
                </Tooltip>

                <DataGrid
                    rows={services}
                    columns={columns}
                    loading={isFetchingServices}
                    onRowClick={(params) => handleOpenDrawer(params.row)}
                    initialState={dataGridConfig.initialState}
                    pageSizeOptions={dataGridConfig.pageSizeOptions}
                    sx={dataGridConfig.styles}
                />
            </Box>
        </Paper>
    );
};

export default Services;
