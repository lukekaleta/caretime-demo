import { ChangeEvent, FC, useCallback, useEffect, useMemo } from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    colors,
    Divider,
    IconButton,
    Input,
    Tooltip,
    Typography,
} from '@mui/material';
import useFileUploadStore from '@/stores/fileUploadStore';
import useUserStore from '@/stores/userStore';
import { Button } from '@/components/Button';
import Icon from '@mdi/react';
import { mdiCheckDecagram, mdiPencil, mdiTrashCan } from '@mdi/js';
import { theme } from '@/theme/index';
import useAuthStore from '@/stores/authStore';

const AvatarManager: FC = () => {
    const {
        selectedFile,
        setSelectedFile,
        profilePicture,
        setAvatarUrl,
        uploadAvatar,
        loading,
        uploadProgress,
        removeAvatar,
    } = useFileUploadStore();
    const { userData, fetchUserData } = useUserStore();
    const { user } = useAuthStore();

    const currentAvatarUrl = useMemo(
        () => userData?.profilePicture || null,
        [userData]
    );

    useEffect(() => {
        setAvatarUrl(currentAvatarUrl);
    }, [currentAvatarUrl, setAvatarUrl]);

    const handleFileChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files?.[0] || null;
            setSelectedFile(file);
        },
        [setSelectedFile]
    );

    const handleUpload = useCallback(async () => {
        if (selectedFile && user) {
            await uploadAvatar(selectedFile);
            await fetchUserData(user.uid);
        }
    }, [selectedFile, uploadAvatar, fetchUserData, user]);

    const handleRemoveAvatar = useCallback(async () => {
        if (user) {
            await removeAvatar();
            await fetchUserData(user.uid);
        }
    }, [removeAvatar, fetchUserData, user]);

    return (
        <Card
            sx={{
                boxShadow: 'none',
                border: '1px solid',
                borderColor: 'grey.300',
            }}
        >
            <CardHeader
                title="Profilový obrázek"
                titleTypographyProps={{ variant: 'h6' }}
            />
            <Divider />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    position: 'relative',
                }}
            >
                <Box sx={{ position: 'relative', my: 4 }}>
                    <Avatar
                        alt="Profilový obrázek"
                        src={profilePicture || ''}
                        sx={{ width: 150, height: 150 }}
                    />

                    <Tooltip title="Odstranit obrázek">
                        <IconButton
                            onClick={handleRemoveAvatar}
                            sx={{
                                position: 'absolute',
                                top: -5,
                                left: -5,
                                backgroundColor: theme.palette.white.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.grey['100'],
                                },
                            }}
                        >
                            <Icon
                                path={mdiTrashCan}
                                size={1}
                                color={theme.palette.error.main}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Upravit obrázek">
                        <IconButton
                            component="label"
                            htmlFor="upload-avatar-file"
                            sx={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                backgroundColor: theme.palette.white.main,
                                '&:hover': {
                                    backgroundColor: theme.palette.grey['100'],
                                },
                            }}
                        >
                            <Icon
                                path={mdiPencil}
                                size={1}
                                color={theme.palette.warning.main}
                            />
                            <Input
                                id="upload-avatar-file"
                                type="file"
                                inputProps={{ accept: 'image/*' }}
                                onChange={handleFileChange}
                                sx={{ display: 'none' }}
                            />
                        </IconButton>
                    </Tooltip>

                    <Tooltip
                        title={
                            user?.emailVerified
                                ? 'Váš účet je ověřen'
                                : 'Váš účet není ověřen'
                        }
                    >
                        <Box
                            sx={{
                                backgroundColor: theme.palette.white.main,
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                position: 'absolute',
                                bottom: -5,
                                right: -5,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Icon
                                path={mdiCheckDecagram}
                                size={1}
                                color={
                                    user?.emailVerified
                                        ? colors.blue['500']
                                        : colors.grey['600']
                                }
                            />
                        </Box>
                    </Tooltip>
                </Box>

                <Typography
                    variant="body2"
                    sx={{
                        mb: 4,
                        textAlign: 'center',
                        color: theme.palette.grey['500'],
                    }}
                >
                    Maximální velikost nahrávaného obrázku je 1 MB. Povoleny
                    jsou pouze soubory typu JPEG, PNG a GIF.
                </Typography>

                {loading ? (
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 3,
                        }}
                    >
                        <CircularProgress size={24} />
                        <Typography variant="body2" sx={{ ml: 2 }}>
                            {`Nahrávání: ${Math.round(uploadProgress)}%`}
                        </Typography>
                    </Box>
                ) : (
                    <Button
                        size="small"
                        variant="outlined"
                        color="primary"
                        onClick={handleUpload}
                        disabled={!selectedFile}
                        sx={{ mb: 3 }}
                    >
                        Nahrát avatar
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default AvatarManager;
