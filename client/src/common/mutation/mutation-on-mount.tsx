// based on https://github.com/apollographql/react-apollo/issues/1939#issuecomment-416131124

import React from 'react';
import { Mutation, MutationProps, OperationVariables, MutationFn } from 'react-apollo';

interface DoMountProps<TData extends any = {}, TVariables extends OperationVariables = {}> {
    mutate: MutationFn<TData, TVariables>;
}
class DoMutation<TData extends any = {}, TVariables extends OperationVariables = {}> extends React.Component<DoMountProps<TData, TVariables>> {
    componentDidMount() {
        const { mutate } = this.props as any;
        mutate();
    };

    render() {
        return null;
    };
};

interface MutationOnMountState {
    didMount: boolean
}

export class MutationOnMount<TData extends any = {}, TVariables extends OperationVariables = {}> extends React.Component<MutationProps<TData, TVariables>, MutationOnMountState> {
    state = {
        didMount: false
    }
    componentDidMount() {
        this.setState({
            didMount: true
        });
    };
    render() {
        const { children, ...other } = this.props;
        return (
            <Mutation
                {...other}
            >
                {(mutate, res) => {
                    res.loading = res.loading || !this.state.didMount;
                    return (
                        <React.Fragment>
                            <DoMutation mutate={mutate} />
                            {children && children(mutate, res)}
                        </React.Fragment>
                    )
                }}
            </Mutation>
        )
    }
};