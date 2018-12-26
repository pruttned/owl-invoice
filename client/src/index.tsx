import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { CssBaseline } from '@material-ui/core';

const link = createHttpLink({
    uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});


const SUPPLIER_QUERY = gql`
    query getSupplier {
        supplier {
            name
        }
    }
`;

interface Supplier {
    name: string,
    address: string,
    taxId: string,
    businessId: string,
    vatNumber: string,
    register: string,
    iban: string,
    bank: string,
    phoneNumber: string,
    email: string,
}

interface Variables {
};

interface Response {
    supplier: Supplier;
};


const withCharacter = graphql<{}, Response, Variables>(SUPPLIER_QUERY, {
    options: () => ({
    })
});

const Character = withCharacter(z => {
    if (z.data!.loading) return <div>Loading</div>;
    if (z.data!.error) return <h1>ERROR</h1>;
    return <div>{z.data!.supplier!.name}</div>;
});



ReactDOM.render(
    <React.Fragment>
        <CssBaseline />
        <ApolloProvider client={client}>
            <App />
            {/* <Character /> */}
        </ApolloProvider>
    </React.Fragment>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
