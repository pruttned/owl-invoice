import React from 'react';
import { Route, Switch } from 'react-router-dom';
import InvoiceListPage from './app/invoice/pages/invoice-list-page';
import ClientListPage from './app/client/pages/client-list-page';
import ClientEditPage from './app/client/pages/client-edit-page';
import ClientCreatePage from './app/client/pages/client-create-page';
import InvoiceCreatePage from './app/invoice/pages/invoice-create-page';

const AppRoutes = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={InvoiceListPage} />
                <Route path="/clients/" exact component={ClientListPage} />
                <Route path="/clients/new" exact component={ClientCreatePage} />
                <Route path="/clients/:id" exact component={ClientEditPage} />

                <Route path="/invoices/" exact component={InvoiceListPage} />
                <Route path="/invoices/new" exact component={InvoiceCreatePage} />
                {/* <Route path="/invoices/:id" exact component={InvoiceEditPage} /> */}
            </Switch>
        </React.Fragment>
    );
};

export default AppRoutes;

