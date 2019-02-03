import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import InvoiceListPage from './app/invoice/pages/invoice-list-page';
import ClientPage from './app/client/pages/client-page';
import InvoicePage from './app/invoice/pages/invoice-page';
import SupplierPage from './app/supplier/pages/supplier-page';

const AppRoutes = () => (
    <React.Fragment>
        <Switch>
            <Redirect from='/' exact to='/invoices' />
            <Route path="/invoices" component={InvoicePage} />
            <Route path="/clients" component={ClientPage} />
            <Route path="/supplier" component={SupplierPage} />
        </Switch>
    </React.Fragment>
);

export default AppRoutes;

