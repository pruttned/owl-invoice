import React from 'react';
import { Route } from 'react-router-dom';
import InvoiceListPage from './app/invoice/pages/invoice-list-page';
import ClientListPage from './app/client/pages/client-list-page';
import ClientEditPage from './app/client/pages/client-edit-page';

const AppRoutes = () => {
    return (
        <React.Fragment>
            <Route path="/" exact component={InvoiceListPage} />
            <Route path="/clients/" exact component={ClientListPage} />
            <Route path="/clients/:id" component={ClientEditPage} />
        </React.Fragment>
    );
};

export default AppRoutes;

