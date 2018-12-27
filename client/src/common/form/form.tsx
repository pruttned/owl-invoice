import React from 'react';
import { Form as FormikForm, Formik, FormikProps } from 'formik';
import { Button } from '@material-ui/core';
import styles from './form.module.scss';

const Form = <T extends {}>(props: {
    submitText: string,
    initialValues: any, validationSchema?: any,
    children: (props: FormikProps<T>) => React.ReactNode
}) => {
    return (
        <div
            className={styles.root}>
            <Formik
                {...props}
                onSubmit={(values, { setSubmitting }) => {
                    //TODO: graphql mutation
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));

                        setSubmitting(false);
                    }, 400);
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
        </div>
    );
};

export default Form;