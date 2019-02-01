import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import { AppBar, List, ListItem, ListItemText, Drawer, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import styles from './App.module.scss';
import AppRoutes from './app-routes';
import MuiPickersUtilsProvider from 'material-ui-pickers/MuiPickersUtilsProvider';
import MomentUtils from '@date-io/moment';
import { BreadcrumbsProvider } from 'react-breadcrumbs-dynamic';
import Breadcrumbs from './common/breadcrumbs/breadcrumbs';

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
  { to: '/supplier', label: 'Supplier' } //tmp
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

interface AppState {
  mobileOpen: boolean;
}

class App extends Component<any, AppState> {
  state = {
    mobileOpen: false,
  };

  toggleDrawer = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    return (
      <BreadcrumbsProvider>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
          <MuiThemeProvider theme={theme}>
            <Router>
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
            </Router >
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </BreadcrumbsProvider>
    );
  }
}

export default App;
