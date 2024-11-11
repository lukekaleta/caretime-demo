import { Paper } from "@/components/Paper";
import { theme } from "@/theme/index";
import { Box, ListItemIcon, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { FC, Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";

const NewsWidget: FC = () => {
    return (
        <Paper>
            <Box display="flex" flexDirection="column">
                <Typography variant="h6">
                    Novinky
                </Typography>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.primary.main
                                    }}
                                    to="/">
                                    Brunch this weekend?
                                </Link>
                            }
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </Fragment>
                            }
                        />
                        <ListItemIcon>
                            <Typography variant="caption">Před 2 dny</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <Divider variant="inset" component="li" />

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.primary.main
                                    }}
                                    to="/">
                                    Brunch this weekend?
                                </Link>
                            }
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </Fragment>
                            }
                        />
                        <ListItemIcon>
                            <Typography variant="caption">Před 2 dny</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <Divider variant="inset" component="li" />

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.primary.main
                                    }}
                                    to="/">
                                    Brunch this weekend?
                                </Link>
                            }
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </Fragment>
                            }
                        />
                        <ListItemIcon>
                            <Typography variant="caption">Před 2 dny</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <Divider variant="inset" component="li" />

                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" variant="rounded" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Link
                                    style={{
                                        textDecoration: 'none',
                                        color: theme.palette.primary.main
                                    }}
                                    to="/">
                                    Brunch this weekend?
                                </Link>
                            }
                            secondary={
                                <Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        sx={{ color: 'text.primary', display: 'inline' }}
                                    >
                                        Ali Connors
                                    </Typography>
                                    {" — I'll be in your neighborhood doing errands this…"}
                                </Fragment>
                            }
                        />
                        <ListItemIcon>
                            <Typography variant="caption">Před 2 dny</Typography>
                        </ListItemIcon>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>

                <Box display="flex" justifyContent="flex-end">
                    <Button variant="text" size="small">
                        Zobrazit vše
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}

export default NewsWidget