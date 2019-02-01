import React, { Component } from 'react';
import ClientRoutes from '../client-routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const ClientPage = () => (
    <React.Fragment>
        <BreadcrumbsItem to="/clients">Clients</BreadcrumbsItem>
        <ClientRoutes></ClientRoutes>
    </React.Fragment>
);


export default ClientPage;