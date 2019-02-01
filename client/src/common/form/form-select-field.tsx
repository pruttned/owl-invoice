import React from 'react';
import { Field } from 'formik';
import { Select, FormControl, InputLabel, OutlinedInput, MenuItem } from '@material-ui/core';

const FormSelectField = ({ name, label, items, itemValue, itemLabel }: { name: string, label: string, items: any[], itemValue: string, itemLabel: string }) => {
    return (
        <Field
            validateOnBlur
            validateOnChange
            name={name}
            render={({ field, form }: any) => (
                <FormControl variant="outlined">
                    <InputLabel>{label}</InputLabel>
                    <Select
                        value={field.value}
                        onChange={event => form.setFieldValue(field.name, event.target.value, true)}
                        input={
                            <OutlinedInput
                                labelWidth={200/*TODO*/} 
                                name={field.name}
                            />
                        }
                    >
                        {items.map(item => (
                            <MenuItem value={item[itemValue]} key={item[itemValue]}>{item[itemLabel]}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    );
};

export default FormSelectField;