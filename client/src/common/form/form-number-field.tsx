import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import { FormFieldBaseProps } from './form-field-base-props';
import { get } from 'lodash';

interface FormNumberFieldProps extends FormFieldBaseProps {
}

const FormNumberField = (props: FormNumberFieldProps) => {
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
                        type="number"
                        {...field}
                        label={props.label}
                        variant="outlined"
                        error={
                            Boolean(error && touched)
                        }
                        helperText={
                            error &&
                            touched &&
                            String(error)
                        }
                        fullWidth={props.fullWidth}
                        className={props.className}
                    />
                )
            }}
        />
    );
};

export default FormNumberField;