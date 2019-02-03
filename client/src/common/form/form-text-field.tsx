import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import { FormFieldBaseProps } from './form-field-base-props';

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
            render={({ field, form }: any) => (
                <TextField
                    {...field}
                    label={props.label}
                    variant="outlined"
                    multiline={props.multiline}
                    rows={props.rows}
                    fullWidth={props.fullWidth}
                    error={
                        Boolean(form.errors[name] && form.touched[name])
                    }
                    helperText={
                        form.errors[name] &&
                        form.touched[name] &&
                        String(form.errors[name])
                    }
                    className={props.className}
                />
            )}
        />
    );
};

export default FormTextField;