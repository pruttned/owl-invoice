import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { Client } from '../client';
import { object as yupObject, string as yupString } from 'yup';
import FormTextField from '../../../common/form/form-text-field';
import Form from '../../../common/form/form';

interface ClientFormProps {
    client: any
}

// interface ClientFormState {
//     client: Client
// }

const validationSchema = yupObject().shape({
    name: yupString()
        .required('name is required!'),
    address: yupString()
        .required('address is required!'),
})


class ClientForm extends Component<ClientFormProps, Client> {
    constructor(props: ClientFormProps) {
        super(props);
        this.state = { ...props.client };
    }

    render() {
        return (
            <Form
                initialValues={this.props.client}
                validationSchema={validationSchema}
                submitText="Save"
            >
                {() => (
                    <React.Fragment>
                        <FormTextField name="name" label="Name" />
                        <FormTextField name="address" label="Address" />
                    </React.Fragment>
                )}
            </Form>
        );
    }
}

export default ClientForm;