import React from 'react';
import { Route, Switch } from 'react-router-dom';
import clientListPage from './pages/client-list-page';
import clientCreatePage from './pages/client-create-page';
import clientEditPage from './pages/client-edit-page';

const ClientRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/clients/" exact component={clientListPage} />
            <Route path="/clients/new" exact component={clientCreatePage} />
            <Route path="/clients/:id" exact component={clientEditPage} />
        </Switch>
    </React.Fragment>
);

export default ClientRoutes;

