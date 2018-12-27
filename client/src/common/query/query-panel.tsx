import React from 'react';
import { Query, OperationVariables } from 'react-apollo';
import { CircularProgress, Typography } from '@material-ui/core';
import { DocumentNode } from 'graphql';
import styles from './query-panel.module.scss';
import { Error as ErrorIcon } from '@material-ui/icons';

interface QueryProps<TData = any, TVariables = OperationVariables> {
    children: (data: TData) => React.ReactNode;
    query: DocumentNode;
    variables?: TVariables;
    displayName?: string;
}

const QueryPanel = <TData extends any = {}, TVariables extends OperationVariables = {}>(props: QueryProps<TData, TVariables>) => (
    <Query<TData, TVariables> {...props}>
        {(res) => {
            if (res.error) return (
                <div className={styles.error}>
                    <div className={styles.errorIcon}>
                        <ErrorIcon color="error" />
                    </div>
                    <div>
                        <Typography color="error">Failed to load.</Typography>
                    </div>
                </div>
            );
            if (res.loading || !res.data) return <div className={styles.progress}><CircularProgress /></div>
            return props.children(res.data)
        }}
    </Query>
)

export default QueryPanel;

