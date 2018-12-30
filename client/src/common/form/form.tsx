import React from 'react';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import styles from './form.module.scss';
import { Mutation } from 'react-apollo';
import { DocumentNode } from 'graphql';

//todo: cache refresh https://www.apollographql.com/docs/react/essentials/mutations.html - only for add - update is handled thanks to return of all fields

const Form = <T extends {}>(props: {
    submitText: string,
    initialValues: any, validationSchema?: any,
    children: (props: FormikProps<T>) => React.ReactNode,
    mutation: DocumentNode,
    formToModel: (form: T) => any
}) => {
    return (
        <div className={styles.root}>
            <Mutation mutation={props.mutation}>
                {postMutation => (
                    <Formik
                        {...props}
                        onSubmit={(values, { setSubmitting }) => {

                            let model = props.formToModel(values);

                            postMutation({ variables: { model } })
                                .then(() => setSubmitting(false))
                                .catch(() => setSubmitting(false));
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
                    </Formik>)}
            </Mutation>
        </div>
    );
};

export default Form;