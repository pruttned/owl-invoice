import React from 'react';
import { TextField } from '@material-ui/core';
import { Field } from 'formik';

const FormNumberField = ({ name, label }: { name: string, label: string }) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={name}
            render={({ field, form }: any) => (
                <TextField
                    type="number"
                    {...field}
                    label={label}
                    variant="outlined"
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

export default FormNumberField;