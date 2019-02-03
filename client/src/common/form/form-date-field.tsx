import React from 'react';
import { Field } from 'formik';
import { InlineDatePicker } from "material-ui-pickers/DatePicker";
import { FormFieldBaseProps } from './form-field-base-props';
import { get } from 'lodash';

interface FormDateFieldProps extends FormFieldBaseProps {
}

const FormDateField = (props: FormDateFieldProps) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={props.name}
            render={({ field, form }: any) => {
                const error = get(form.errors, props.name);
                const touched = get(form.touched, props.name);
                return (
                    <InlineDatePicker
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
                        onlyCalendar
                        format="DD.MM.YYYY"
                        onError={(_, error) => form.setFieldError(field.name, error)}
                        onChange={date => form.setFieldValue(field.name, date, true)}
                        fullWidth={props.fullWidth}
                        className={props.className}
                    />
                )
            }}
        />

    );
};

export default FormDateField;