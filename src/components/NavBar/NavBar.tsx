import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { useMeQuery } from "../../hooks/queries/users/useMeQuery";
import { Link } from "@material-ui/core";
import { NotLoggedInMenu } from "./Menu/NotLoggedInMenu";
import { LoggedInMenu } from "./Menu/LoggedInMenu";

/**
 * Renders a fixed-to-top navigation bar
 */
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
          {isUserLoggedIn ? (
            <LoggedInMenu userId={data.id} />
          ) : (
            <NotLoggedInMenu />
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

/**
 * CSS for NavBar component
 */
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
