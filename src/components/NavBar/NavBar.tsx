import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useMeQuery } from "../../hooks/queries/users/useMeQuery";
import { Button, Link } from "@material-ui/core";
import { useRouter } from "next/router";
import { discardAccessToken } from "../../utils/auth/discardAccessToken";

export default function NavBar() {
  const classes = useStyles();
  const { isLoading: isLoading, isError, data } = useMeQuery();
  const isUserLoggedIn = (!isLoading || !isError) && data;

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link href="/raid-posts" color="inherit" underline="none">
              GW2LFG
            </Link>
          </Typography>
          {isUserLoggedIn ? <LoggedInMenu /> : <NotLoggedInMenu />}
        </Toolbar>
      </AppBar>
    </div>
  );
}

// Renders Login and Register buttons
function NotLoggedInMenu() {
  return (
    <div>
      <Button href="/login" color="inherit">
        Login
      </Button>
      <Button href="/register" color="inherit">
        Register
      </Button>
    </div>
  );
}

// Renders openable / closable menu with 'My account' and 'Logout' options
function LoggedInMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  const logoutAndReload = () => {
    discardAccessToken();
    router.reload();
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logoutAndReload}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

// CSS for NavBar component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);
