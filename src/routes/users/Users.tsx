import React, { useCallback, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Chip } from '@mui/material';
import useUsersStore from '@/stores/usersStore';
import Icon from '@mdi/react';
import { mdiCheck, mdiClose } from '@mdi/js';
import dataGridConfig from '@/config/dataGridConfig';
import UserDetailDrawer from '@/components/Drawers/UserDetailDrawer';
import useDrawersStore from '@/stores/drawersStore';
import { formatBirthNumber, parseBirthNumber } from '@/utils/index';
import { formatIsoDate } from '@/utils/datetime';
import { useTranslation } from 'react-i18next';
import { IUserData } from '@/interfaces/UserData';
import { Paper } from '@/components/Paper';

const Users: React.FC = () => {
    const { t } = useTranslation('roles');
    const { users, isFetchingUsers, fetchUsers, setSelectedUser } =
        useUsersStore();
    const { setUserDetailDrawerOpen } = useDrawersStore();

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const handleOpenDrawer = useCallback(
        (userData?: IUserData) => {
            if (userData) {
                setSelectedUser(userData);
            } else {
                setSelectedUser(null);
            }
            setUserDetailDrawerOpen(true);
        },
        [setUserDetailDrawerOpen, setSelectedUser]
    );

    const columns: GridColDef[] = [
        {
            field: 'lastName',
            headerName: 'Příjmení a jméno',
            flex: 1,
            minWidth: 230,
            renderCell: (params) =>
                `${params.row?.titleBefore || ''} ${params.row.lastName} ${params.row.firstName} ${params.row?.titleAfter || ''}`,
        },
        {
            field: 'email',
            headerName: 'E-mail',
            width: 220,
        },
        {
            field: 'birthDate',
            headerName: 'Datum narození',
            width: 130,
            renderCell: (params) => {
                const birthNumber = parseBirthNumber(
                    String(params.row.birthNumber)
                );
                return birthNumber ? formatIsoDate(birthNumber) : 'Nevyplněno';
            },
        },
        {
            field: 'birthNumber',
            headerName: 'Rodné číslo',
            width: 130,
            renderCell: (params) => {
                const birthNumber = String(params.row.birthNumber);
                return params.row.birthNumber
                    ? formatBirthNumber(birthNumber)
                    : 'Nevyplněno';
            },
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 150,
            renderCell: (params) => {
                const roleName = t(params.row.roleId);
                return (
                    <Chip
                        color="secondary"
                        label={roleName}
                        variant="outlined"
                        size="small"
                    />
                );
            },
        },
        {
            field: 'isEmailVerified',
            headerName: 'Účet',
            width: 120,
            renderCell: (params) => (
                <Chip
                    icon={
                        <Icon
                            path={
                                params.row.isEmailVerified ? mdiCheck : mdiClose
                            }
                            size={0.6}
                        />
                    }
                    color={params.row.isEmailVerified ? 'success' : 'error'}
                    label={params.row.isEmailVerified ? 'Ověřený' : 'Neověřený'}
                    variant="outlined"
                    size="small"
                />
            ),
        },
        {
            field: 'isActive',
            headerName: 'Stav účtu',
            width: 120,
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
    ];

    return (
        <Paper>
            <UserDetailDrawer />

            <Box>
                <DataGrid
                    rows={users}
                    columns={columns}
                    loading={isFetchingUsers}
                    onRowClick={(params) => handleOpenDrawer(params.row)}
                    initialState={dataGridConfig.initialState}
                    pageSizeOptions={dataGridConfig.pageSizeOptions}
                    sx={dataGridConfig.styles}
                />
            </Box>
        </Paper>
    );
};

export default Users;
