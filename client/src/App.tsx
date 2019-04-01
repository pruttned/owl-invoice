import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { AppBar, List, ListItem, ListItemText, Drawer, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider, CircularProgress } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import styles from './App.module.scss';
import AppRoutes from './app-routes';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from '@date-io/moment';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Breadcrumbs from './common/breadcrumbs/breadcrumbs';
import { Mutation } from 'react-apollo';
import { REPO_PULL_MUTATION } from './app/repo/repo-queries';
import { MutationOnMount } from './common/mutation/mutation-on-mount';
import { ApolloError } from 'apollo-client';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import { notification } from './common/notification/notification';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#2979ff',
    },
    text: {
      primary: '#464646'
    }
  },
});

const drawerItems = [
  { to: '/invoices', label: 'Invoices' },
  { to: '/clients', label: 'Clients' },
  { to: '/supplier', label: 'Supplier' }
]

const drawer = (
  <List>
    {drawerItems.map(item => (
      <NavLink key={item.to} to={item.to} activeClassName={styles.drawerItemActive}>
        <ListItem button>
          <ListItemText primary={<div className={styles.drawerItemLabel}>{item.label}</div>} />
        </ListItem>
      </NavLink >
    ))}
  </List>
);

interface AppProps extends InjectedNotistackProps {
}

interface AppState {
  mobileOpen: boolean;
  repoRefreshDone: boolean;
}

class App extends Component<AppProps, AppState> {
  state = {
    mobileOpen: false,
    repoRefreshDone: false
  };

  toggleDrawer = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  onInitLoadError = (err: any) => {
    this.props.enqueueSnackbar(notification.toErrorMessage(err), {
      variant: 'error',
    });
  }

  render() {
    return (
      <BreadcrumbsProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <MuiThemeProvider theme={theme}>
            <MutationOnMount mutation={REPO_PULL_MUTATION} onError={this.onInitLoadError}>
              {(_, { loading }) =>
                loading ? this.renderInitLoad() : this.renderApp()
              }
            </MutationOnMount>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </BreadcrumbsProvider >
    );
  }

  private renderInitLoad() {
    return (
      <div className={styles.initProgress}>
        <div><CircularProgress /></div>
        <div>Pulling from repository</div>
      </div>
    );
  }

  private renderApp() {
    return (<Router>
      <div className={styles.root}>
        <AppBar position="fixed" className={styles.appBar}>
          <Toolbar>
            <IconButton
              className={styles.menuButton}
              color="inherit"
              aria-label="Open drawer"
              onClick={this.toggleDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              <Breadcrumbs />
            </Typography>
            <div className={styles.menuRight}>
              <div id="appBarMenu">
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <nav>
          <div className={styles.drawerMobile}>
            <Drawer
              className={styles.drawer}
              variant="temporary"
              anchor="left"
              open={this.state.mobileOpen}
              onClose={this.toggleDrawer}
              classes={{
                paper: styles.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </div>
          <div className={styles.drawerDesktop}>
            <Drawer
              className={styles.drawer}
              classes={{
                paper: styles.drawerPaper,
              }}
              variant="permanent"
              open>
              {drawer}
            </Drawer>
          </div>
        </nav>
        <div className={styles.mainContent}>
          <AppRoutes />
        </div>
      </div>
    </Router >);
  }
}

export default withSnackbar(App);
