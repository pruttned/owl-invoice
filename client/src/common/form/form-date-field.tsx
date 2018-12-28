import React from 'react';
import { Field } from 'formik';
import { InlineDatePicker } from "material-ui-pickers/DatePicker";

const FormDateField = ({ name, label }: { name: string, label: string }) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={name}
            render={({ field, form }: any) => (
                <InlineDatePicker
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
                    onlyCalendar
                    format="DD.MM.YYYY"
                    onError={(_, error) => form.setFieldError(field.name, error)}
                    onChange={date => form.setFieldValue(field.name, date, true)}
                />
            )}
        />

    );
};

export default FormDateField;