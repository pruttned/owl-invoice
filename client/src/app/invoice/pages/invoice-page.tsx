import React, { Component } from 'react';
import InvoiceRoutes from '../invoice-routes';
import { BreadcrumbsItem } from 'react-breadcrumbs-dynamic';

const InvoicePage = () =>
    (
        <React.Fragment>
            <BreadcrumbsItem to="/invoices">Invoices</BreadcrumbsItem>
            <InvoiceRoutes></InvoiceRoutes>
        </React.Fragment>
    );


export default InvoicePage;