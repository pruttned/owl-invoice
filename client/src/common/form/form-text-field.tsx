import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import { FormFieldBaseProps } from './form-field-base-props';
import { get } from 'lodash';

interface FormTextFieldProps extends FormFieldBaseProps {
    multiline?: boolean;
    rows?: string | number;
}

const FormTextField = (props: FormTextFieldProps) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={props.name}
            render={({ field, form }: any) => {
                const error = get(form.errors, props.name);
                const touched = get(form.touched, props.name);
                return (
                    <TextField
                        {...field}
                        label={props.label}
                        variant="outlined"
                        multiline={props.multiline}
                        rows={props.rows}
                        fullWidth={props.fullWidth}
                        error={
                            Boolean(error && touched)
                        }
                        helperText={
                            error &&
                            touched &&
                            String(error)
                        }
                        className={props.className}
                    />
                )
            }}
        />
    );
};

export default FormTextField;