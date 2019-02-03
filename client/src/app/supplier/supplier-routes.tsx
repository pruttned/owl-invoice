import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SupplierEditPage from './pages/supplier-edit-page';

const SupplierRoutes = () => (
    <React.Fragment>
        <Switch>
            <Route path="/supplier" exact component={SupplierEditPage} />
        </Switch>
    </React.Fragment>
);

export default SupplierRoutes;

