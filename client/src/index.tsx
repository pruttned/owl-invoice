import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.scss';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';

const link = createHttpLink({
    uri: 'http://localhost:3001/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

ReactDOM.render(
    <React.Fragment>
        <ApolloProvider client={client}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
                action={[
                    <Button key="dismiss" size="small">
                        Dismiss
                    </Button>
                ]}>
                <App />
            </SnackbarProvider>
        </ApolloProvider>
    </React.Fragment>
    ,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
