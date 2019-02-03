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
                        Boolean(form.errors[props.name] && form.touched[props.name])
                    }
                    helperText={
                        form.errors[props.name] &&
                        form.touched[props.name] &&
                        String(form.errors[props.name])
                    }
                    fullWidth={props.fullWidth}
                    className={props.className}
                />
            )}
        />
    );
};

export default FormNumberField;