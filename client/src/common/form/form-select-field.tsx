import React from 'react';
import { Field } from 'formik';
import { Select, FormControl, InputLabel, OutlinedInput, MenuItem } from '@material-ui/core';
import { FormFieldBaseProps } from './form-field-base-props';

interface FormNumberFieldProps extends FormFieldBaseProps {
    items: any[];
    itemValue: string;
    itemLabel: string;
}

const FormSelectField = (props: FormNumberFieldProps) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={props.name}
            render={({ field, form }: any) => (
                <FormControl variant="outlined"
                    fullWidth={props.fullWidth}
                    className={props.className}
                >
                    <InputLabel>{props.label}</InputLabel>
                    <Select
                        value={field.value}
                        onChange={event => form.setFieldValue(field.name, event.target.value, true)}
                        input={
                            <OutlinedInput
                                labelWidth={42/*TODO:https://material-ui.com/demos/selects/   -- there is some ref from InputLabel*/}
                                name={field.name}
                            />
                        }
                    >
                        {props.items.map(item => (
                            <MenuItem value={item[props.itemValue]} key={item[props.itemValue]}>{item[props.itemLabel]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default FormSelectField;