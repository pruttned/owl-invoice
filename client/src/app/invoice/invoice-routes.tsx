import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvoiceListPage from './pages/invoice-list-page';
import InvoiceCreatePage from './pages/invoice-create-page';
import InvoiceEditPage from './pages/invoice-edit-page';

const InvoiceRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/invoices/" exact component={InvoiceListPage} />
            <Route path="/invoices/new" exact component={InvoiceCreatePage} />
            <Route path="/invoices/:id" exact component={InvoiceEditPage} />
        </Switch>
    </React.Fragment>
);

export default InvoiceRoutes;

