import { FC, useCallback } from 'react';
import {
    Avatar,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    TextField,
} from '@mui/material';
import { Paper } from '@/components/Paper';
import { Card } from '@/components/Card';
import { Controller, useForm } from 'react-hook-form';
import useUsersStore from '@/stores/usersStore';
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { useTranslation } from 'react-i18next';
import { capitalizeFirstLetter, formatBirthNumber } from '@/utils/index';
import { Button } from '@/components/Button';
import { IUserData } from '@/interfaces/UserData';

interface FormData {
    lastName: string;
}

const ClientAddSelectUser: FC = () => {
    const { t } = useTranslation('clients');
    const {
        filteredUsers,
        isFetchingFilteredUsers,
        fetchFilteredUsers,
        setSelectedUser,
        selectedUser,
    } = useUsersStore();
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormData>();

    const handleSearch = useCallback(
        async (data: FormData) => {
            await fetchFilteredUsers({
                field: 'lastName',
                value: capitalizeFirstLetter(data.lastName),
            });
        },
        [fetchFilteredUsers]
    );

    const handleSelectUser = useCallback(
        (user: IUserData) => {
            setSelectedUser(user);
        },
        [setSelectedUser]
    );

    const handleDeselectUser = useCallback(() => {
        setSelectedUser(null);
    }, [setSelectedUser]);

    return (
        <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={5}>
                    <Card title={t('Search user')} withHeaderDivider>
                        <form onSubmit={handleSubmit(handleSearch)}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: String(
                                                t('Surname is required')
                                            ),
                                            minLength: {
                                                value: 3,
                                                message: t(
                                                    'Enter at least 3 characters'
                                                ),
                                            },
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label={String(
                                                    t('Enter user surname')
                                                )}
                                                variant="outlined"
                                                fullWidth
                                                error={!!errors.lastName}
                                                helperText={
                                                    errors.lastName?.message
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                type="submit"
                                                                disabled={
                                                                    isFetchingFilteredUsers
                                                                }
                                                            >
                                                                {isFetchingFilteredUsers ? (
                                                                    <CircularProgress
                                                                        size={
                                                                            24
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <Icon
                                                                        path={
                                                                            mdiMagnify
                                                                        }
                                                                        size={1}
                                                                    />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
                <Grid item xs={12} md={7}>
                    <Card title={t('List of users')} withHeaderDivider>
                        <List
                            sx={{
                                width: '100%',
                            }}
                        >
                            {filteredUsers.map((user) => {
                                const isSelected = selectedUser?.id === user.id;

                                return (
                                    <ListItem key={user.id}>
                                        <ListItemAvatar>
                                            <Avatar
                                                src={user?.profilePicture}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            sx={{ flexGrow: 1 }}
                                            primary={`${user.firstName} ${user.lastName}`}
                                            secondary={formatBirthNumber(
                                                user.birthNumber
                                            )}
                                        />
                                        <ListItemIcon>
                                            <Button
                                                size="small"
                                                variant="text"
                                                color={
                                                    isSelected
                                                        ? 'error'
                                                        : 'success'
                                                }
                                                onClick={
                                                    isSelected
                                                        ? () =>
                                                              handleDeselectUser()
                                                        : () =>
                                                              handleSelectUser(
                                                                  user
                                                              )
                                                }
                                            >
                                                <>
                                                    {isSelected
                                                        ? t('Deselect')
                                                        : t('Select')}
                                                </>
                                            </Button>
                                        </ListItemIcon>
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ClientAddSelectUser;
