import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './index.scss';

import App from './App';
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SnackbarProvider } from 'notistack';
import { Button } from '@material-ui/core';
import { AppContext } from './app/app-store/app-context';
import { AppStore } from './app/app-store/app-store';

const link = createHttpLink({
    uri: '/graphql'
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link
});

ReactDOM.render(
    <React.Fragment>
        <ApolloProvider client={client}>
            <AppContext.Provider value={{ appStore: new AppStore(client) }}>
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
            </AppContext.Provider>
        </ApolloProvider>
    </React.Fragment>
    ,
    document.getElementById('root'));

