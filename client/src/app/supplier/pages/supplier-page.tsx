import React, { Component } from 'react';
import SupplierRoutes from '../supplier-routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const SupplierPage = () => (
    <React.Fragment>
        <BreadcrumbsItem to="/supplier">Supplier</BreadcrumbsItem>
        <SupplierRoutes></SupplierRoutes>
    </React.Fragment>
);


export default SupplierPage;