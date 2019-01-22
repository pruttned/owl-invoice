import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';

const FormTextField = ({ name, label, multiline, rows }: { name: string, label: string, multiline?: boolean, rows?: string | number }) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={name}
            render={({ field, form }: any) => (
                <TextField
                    {...field}
                    label={label}
                    variant="outlined"
                    multiline={multiline}
                    rows={rows}
                    error={
                        Boolean(form.errors[name] && form.touched[name])
                    }
                    helperText={
                        form.errors[name] &&
                        form.touched[name] &&
                        String(form.errors[name])
                    }
                />
            )}
        />
    );
};

export default FormTextField;