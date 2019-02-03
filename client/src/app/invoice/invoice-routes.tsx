import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvoiceListPage from './pages/invoice-list-page';

const ClientRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/invoices" exact component={InvoiceListPage} />
        </Switch>
    </React.Fragment>
);

export default ClientRoutes;

