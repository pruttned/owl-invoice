import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';
import { FormFieldBaseProps } from './form-field-base-props';

interface FormNumberFieldProps extends FormFieldBaseProps {
}

const FormNumberField = (props: FormNumberFieldProps) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={props.name}
            render={({ field, form }: any) => (
                <TextField
                    type="number"
                    {...field}
                    label={props.label}
                    variant="outlined"
                    error={
                        Boolean(form.errors[name] && form.touched[name])
                    }
                    helperText={
                        form.errors[name] &&
                        form.touched[name] &&
                        String(form.errors[name])
                    }
                    fullWidth={props.fullWidth}
                    className={props.className}
                />
            )}
        />
    );
};

export default FormNumberField;