import React from 'react';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { Button, Snackbar } from '@material-ui/core';
import styles from './form.module.scss';
import { Mutation } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import { AppContext, AppContextValue } from '../../app/app-store/app-context';

//todo: cache refresh https://www.apollographql.com/docs/react/essentials/mutations.html - only for add - update is handled thanks to return of all fields

interface Props extends InjectedNotistackProps {
    submitText: string;
    initialValues: any, validationSchema?: any;
    children: (props: FormikProps<any>) => React.ReactNode;
    mutation: DocumentNode;
    formToModel: (form: any) => any;
    successMessage: string;
    onSuccess?: (resp: any) => void;
    invalidateQueryCache?: boolean;
}
const Form = (props: Props) => {
    return (
        <div className={styles.root}>
            <AppContext.Consumer>
                {(context: AppContextValue) => (
                    <Mutation mutation={props.mutation}>
                        {(postMutation, { loading, error }) => (
                            <React.Fragment>
                                <Formik
                                    {...props}
                                    onSubmit={(values, { setSubmitting }) => {

                                        let model = props.formToModel(values);

                                        postMutation({ variables: { model } })
                                            .then(resp => {
                                                setSubmitting(false);
                                                props.enqueueSnackbar(props.successMessage, {
                                                    variant: 'success',
                                                });
                                                if (props.onSuccess) {
                                                    if (props.invalidateQueryCache) {
                                                        context.appStore.invalidateQueryCache();
                                                    }
                                                    props.onSuccess(resp);
                                                }
                                            })
                                            .catch(() => {
                                                setSubmitting(false);
                                                props.enqueueSnackbar('Failed to process request', {
                                                    variant: 'error',
                                                });
                                            });
                                    }}
                                >
                                    {(formikProps) => (
                                        <FormikForm>
                                            {props.children(formikProps)}
                                            <div className={styles.buttonRow}>
                                                <Button type="submit" variant="contained" color="primary" disabled={formikProps.isSubmitting}>
                                                    {props.submitText}
                                                </Button>
                                            </div>
                                        </FormikForm>
                                    )}
                                </Formik>
                            </React.Fragment>)}
                    </Mutation>
                )}
            </AppContext.Consumer>
        </div>
    );
};

export default withSnackbar(Form);