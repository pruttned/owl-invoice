import React, { Component, ReactEventHandler } from 'react';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Mutation, MutationFn } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import { AppContext, AppContextValue } from '../../app/app-store/app-context';
import { notification } from '../notification/notification';

interface SubmitDialogProps extends InjectedNotistackProps {
    submitText: string;
    initialValues: any;
    validationSchema?: any;
    children: (props: FormikProps<any>) => React.ReactNode;
    mutation: DocumentNode;
    formToModel: (form: any) => any;
    successMessage: string;
    onSuccess?: (resp: any) => void;
    invalidateQueryCache?: boolean;
    open: boolean;
    title: string;
    onClose: () => void;
}

interface SubmitDialogState {
    isSubmiting: boolean;
}

class SubmitDialog extends Component<SubmitDialogProps, SubmitDialogState>{
    state = {
        isSubmiting: false,
    };

    close = () => {
        if (!this.state.isSubmiting && this.props.onClose) {
            this.props.onClose!();
        }
    };

    submit = (context: AppContextValue, postMutation: MutationFn<any>, values: any, setSubmitting: (isSubmitting: boolean) => void) => {
        this.setState({ isSubmiting: true });
        let model = this.props.formToModel(values);

        postMutation({ variables: { model } }) //TODO: extract from form.tsx
            .then(resp => {
                this.props.enqueueSnackbar(this.props.successMessage, {
                    variant: 'success',
                });
                if (this.props.invalidateQueryCache) {
                    context.appStore.invalidateQueryCache();
                }
                if (this.props.onSuccess) {
                    this.props.onSuccess(resp);
                }
                setSubmitting(false);
                this.setState({ isSubmiting: false });
                this.close();
            })
            .catch(err => {
                this.props.enqueueSnackbar(notification.toErrorMessage(err), {
                    variant: 'error',
                });
                setSubmitting(false);
                this.setState({ isSubmiting: false });
            });
    };

    render() {
        return (
            <AppContext.Consumer>
                {(context: AppContextValue) => (
                    <Mutation mutation={this.props.mutation}>
                        {(postMutation, { loading, error }) => (
                            <Dialog open={this.props.open} onClose={this.close}>
                                <DialogTitle>{this.props.title}</DialogTitle>
                                <Formik
                                    {...this.props}
                                    onSubmit={(values, { setSubmitting }) => this.submit(context, postMutation, values, setSubmitting)}
                                >
                                    {(formikProps) => (
                                        <FormikForm>
                                            <DialogContent>
                                                {this.props.children(formikProps)}
                                            </DialogContent>
                                            <DialogActions>
                                                <Button color="primary" autoFocus disabled={formikProps.isSubmitting} onClick={this.close}>
                                                    Cancel
                                                </Button>
                                                <Button type="submit" variant="contained" color="primary" disabled={formikProps.isSubmitting}>
                                                    {this.props.submitText}
                                                </Button>
                                            </DialogActions>

                                        </FormikForm>
                                    )}
                                </Formik>
                            </Dialog>)}
                    </Mutation>
                )}
            </AppContext.Consumer>
        );
    }
}

export default withSnackbar(SubmitDialog);