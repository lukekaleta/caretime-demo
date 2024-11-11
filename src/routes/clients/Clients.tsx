import React, { FC, useCallback, useEffect } from 'react';
import {
    Backdrop,
    Box,
    Chip,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router';
import { RouteNames } from '@/enums/RouteNames';
import useClientStore from '@/stores/clientsStore';
import { formatBirthNumber, parseBirthNumber } from '@/utils/index';
import { formatIsoDate } from '@/utils/datetime';
import dataGridConfig from '@/config/dataGridConfig';
import Icon from '@mdi/react';
import { mdiAccount, mdiAccountPlus, mdiPlus } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { Paper } from '@/components/Paper';

const Clients: FC = () => {
    const { t } = useTranslation('clients');
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);
    const handleClose = () => setOpen(false);
    const { clients, fetchClients, isFetchingClients } = useClientStore();
    const navigate = useNavigate();

    const handleClientDetailRedirect = useCallback(
        (id: string) => {
            navigate(`${RouteNames.ClientDetail}/${id}`);
        },
        [navigate]
    );

    const handleManageUnregistered = useCallback(() => {
        navigate(RouteNames.ClientManager);
    }, [navigate, RouteNames]);

    const handleManageRegistered = useCallback(() => {
        navigate(RouteNames.ClientsManageRegistered);
    }, [navigate, RouteNames]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    const columns: GridColDef[] = [
        {
            field: 'fullName',
            headerName: 'Příjmení a jméno',
            flex: 1,
            minWidth: 230,
            renderCell: (params) => (
                <Chip
                    color="secondary"
                    variant="outlined"
                    label={`${params.row.firstName} ${params.row.lastName}`}
                />
            ),
        },
        {
            field: 'phoneNumber',
            headerName: 'Telefon',
            width: 130,
            renderCell: (params) => params.row.phoneNumber,
        },
        {
            field: 'dateOfBirth',
            headerName: 'Datum narození',
            width: 150,
            renderCell: (params) => {
                const birthNumber = parseBirthNumber(params.row.birthNumber);
                return birthNumber && formatIsoDate(birthNumber);
            },
        },
        {
            field: 'birthNumber',
            headerName: 'Rodné číslo',
            renderCell: (params) => {
                const birthNumber = String(params.row.birthNumber);
                return formatBirthNumber(birthNumber);
            },
            width: 150,
        },
        {
            field: 'address',
            headerName: 'Město',
            width: 200,
            renderCell: (params) => `${params.row.address?.city || ''}`,
        },
    ];

    return (
        <Paper>
            <Box>
                <Backdrop open={open} sx={{ zIndex: 10 }} />
                <SpeedDial
                    onClose={handleClose}
                    onClick={handleOpen}
                    open={open}
                    ariaLabel="Floating Action Menu"
                    sx={{ position: 'fixed', bottom: 16, right: 16 }}
                    icon={
                        <SpeedDialIcon
                            icon={<Icon path={mdiPlus} size={1} />}
                        />
                    }
                >
                    <SpeedDialAction
                        onClick={handleManageRegistered}
                        tooltipOpen
                        icon={<Icon path={mdiAccountPlus} size={1} />}
                        tooltipTitle={t('Registered') as string}
                    />
                    <SpeedDialAction
                        onClick={handleManageUnregistered}
                        tooltipOpen
                        icon={<Icon path={mdiAccount} size={1} />}
                        tooltipTitle={t('Unregistered') as string}
                    />
                </SpeedDial>

                <DataGrid
                    rows={clients || []}
                    columns={columns}
                    loading={isFetchingClients}
                    onRowClick={(params) =>
                        handleClientDetailRedirect(params.row.id)
                    }
                    initialState={dataGridConfig.initialState}
                    pageSizeOptions={dataGridConfig.pageSizeOptions}
                    sx={dataGridConfig.styles}
                />
            </Box>
        </Paper>
    );
};

export default Clients;
