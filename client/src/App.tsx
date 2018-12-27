import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import InvoiceListPage from './app/invoice/pages/invoice-list-page';
import ClientListPage from './app/client/pages/client-list-page';
import { AppBar, List, ListItem, ListItemText, Drawer, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import styles from './App.module.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#ffa726',
    },
  },
});

//TODO: extract
const drawer = (
  <List>
    <Link to="/">
      <ListItem button>
        <ListItemText primary="Invoices" />
      </ListItem>
    </Link>
    <Link to="/clients">
      <ListItem button>
        <ListItemText primary="Clients" />
      </ListItem>
    </Link>
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
                  Owl Invoice
              </Typography>
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
              {/* TODO: extract */}
              <Route path="/" exact component={InvoiceListPage} />
              <Route path="/clients/" component={ClientListPage} />
            </div>
          </div>
        </Router >
      </MuiThemeProvider>
    );
  }
}

export default App;
