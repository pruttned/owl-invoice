import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvoiceListPage from './app/invoice/pages/invoice-list-page';
import ClientPage from './app/client/pages/client-page';
import InvoicePage from './app/invoice/pages/invoice-page';

const AppRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/" exact component={InvoicePage} />
            <Route path="/clients" component={ClientPage} />
        </Switch>
    </React.Fragment>
);

export default AppRoutes;

