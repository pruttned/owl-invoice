import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ClientListPage from './pages/client-list-page';
import ClientCreatePage from './pages/client-create-page';
import ClientEditPage from './pages/client-edit-page';
import ClientClonePage from './pages/client-clone-page';

const ClientRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/clients/" exact component={ClientListPage} />
            <Route path="/clients/new" exact component={ClientCreatePage} />
            <Route path="/clients/:id" exact component={ClientEditPage} />
            <Route path="/clients/:id/clone" exact component={ClientClonePage} />
        </Switch>
    </React.Fragment>
);

export default ClientRoutes;

