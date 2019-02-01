import React, { Component } from 'react';
import InvoiceRoutes from '../invoice-routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const ClientPage = () =>
    (
        <React.Fragment>
            <BreadcrumbsItem to="/">Invoices</BreadcrumbsItem>
            <InvoiceRoutes></InvoiceRoutes>
        </React.Fragment>
    );


export default ClientPage;