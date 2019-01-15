import React, { Component, ReactEventHandler } from 'react';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import styles from './form.module.scss';
import { Mutation, MutationFn } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import { AppContext, AppContextValue } from '../../app/app-store/app-context';

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
                if (this.props.onSuccess) {
                    if (this.props.invalidateQueryCache) {
                        context.appStore.invalidateQueryCache();
                    }
                    this.props.onSuccess(resp);
                }
                setSubmitting(false);
                this.setState({ isSubmiting: false });
            })
            .catch(() => {
                this.props.enqueueSnackbar('Failed to process request', {
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



// import React, { Component } from 'react';
// import { Button, Snackbar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
// import styles from './mutation-dialog.module.scss';
// import { Mutation } from 'react-apollo';
// import { DocumentNode } from 'graphql';
// import { withSnackbar, InjectedNotistackProps } from 'notistack';
// import { ModalProps } from '@material-ui/core/Modal';
// import { AppContext, AppContextValue } from '../../app/app-store/app-context';

// export interface MutationDialogChildrenProps {
//     postMutation: (model: any) => Promise<any>;
//     loading: boolean;
// }
// interface MutationDialogProps extends InjectedNotistackProps, ModalProps {
//     mutation: DocumentNode;
//     successMessage: string;
//     onSuccess?: (resp: any) => void;
//     invalidateQueryCache?: boolean;
//     dialogTitle: JSX.Element[] | JSX.Element;
//     children: (props: MutationDialogChildrenProps) => React.ReactNode;
// }

// const MutationDialog = (props: MutationDialogProps) => {
//     const { dialogTitle, successMessage, onSuccess, invalidateQueryCache, mutation, onPresentSnackbar, enqueueSnackbar, ...rest } = props;
//     return (
//         <div className={styles.root}>
//             <AppContext.Consumer>
//                 {(context: AppContextValue) => (
//                     <Mutation mutation={mutation}>
//                         {(postMutation, { loading, error }) => (
//                             <Dialog  {...rest, open:loading||res.open}> nejak treba zabranit zavretiu pokial je loading
//                                 <DialogTitle>{dialogTitle}</DialogTitle>
//                                 <Mutation mutation={mutation}>
//                                     {(postMutation, { loading, error }) => {
//                                         let postMutationWrapped = (model: any) => {
//                                             return postMutation({ variables: { model } })
//                                                 .then(resp => {
//                                                     this.props.enqueueSnackbar(successMessage, {
//                                                         variant: 'success',
//                                                     });
//                                                     if (onSuccess) {
//                                                         if (invalidateQueryCache) {
//                                                             context.appStore.invalidateQueryCache();
//                                                         }
//                                                         onSuccess(resp);
//                                                     }
//                                                 })
//                                                 .catch(() => {
//                                                     this.props.enqueueSnackbar('Failed to process request', {
//                                                         variant: 'error',
//                                                     });
//                                                 });
//                                         }
//                                         return (
//                                             <React.Fragment>
//                                                 {this.props.children({ postMutation: postMutationWrapped, loading })}
//                                             </React.Fragment>
//                                         )
//                                     }}
//                                 </Mutation>
//                             </Dialog>
//                         )}
//                     </Mutation>
//                 )}
//             </AppContext.Consumer>
//         </div>
//     );
// };

// export default withSnackbar(MutationDialog);