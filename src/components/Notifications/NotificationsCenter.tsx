import { Paper } from "@/components/Paper";
import useNotificationStore from "@/stores/notificationsStore";
import { mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { FC } from "react";
import NotificationList from "./NotificationList";

const NotificationsCenter: FC = () => {
    const { notifications } = useNotificationStore()

    return (
        <Container maxWidth="sm">
            <Paper>
                <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">
                        Upozornění
                    </Typography>
                    <IconButton>
                        <Icon path={mdiDotsHorizontal} size={1} />
                    </IconButton>
                </Box>

                <NotificationList notifications={notifications} />

            </Paper>
        </Container>
    )
}

export default NotificationsCenter