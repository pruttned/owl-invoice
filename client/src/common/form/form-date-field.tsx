import React from 'react';
import { Field } from 'formik';
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import { FormFieldBaseProps } from './form-field-base-props';

interface FormDateFieldProps extends FormFieldBaseProps {
}

const FormDateField = (props: FormDateFieldProps) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={props.name}
            render={({ field, form }: any) => (
                <InlineDatePicker
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
                    onlyCalendar
                    format="DD.MM.YYYY"
                    onError={(_, error) => form.setFieldError(field.name, error)}
                    onChange={date => form.setFieldValue(field.name, date, true)}
                    fullWidth={props.fullWidth}
                    className={props.className}
                />
            )}
        />

    );
};

export default FormDateField;