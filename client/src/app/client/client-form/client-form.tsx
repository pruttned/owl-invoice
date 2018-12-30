import React, { Component } from 'react';
import { Client } from '../client';
import { object as yupObject, string as yupString } from 'yup';
import FormTextField from '../../../common/form/form-text-field';
import Form from '../../../common/form/form';
import FormRow from '../../../common/form/form-row';
import FormPage from '../../../common/page/form-page';
import { DocumentNode } from 'graphql';
import { pick } from 'lodash';

interface ClientFormProps {
    client: any;
    mutation: DocumentNode;
    successMessage: string;
}

const validationSchema = yupObject().shape({
    name: yupString()
        .required('name is required!'),
    address: yupString()
        .required('address is required!'),
})

class ClientForm extends Component<ClientFormProps, Client> {
    render() {
        return (
            <FormPage>
                <Form
                    initialValues={this.props.client}
                    validationSchema={validationSchema}
                    submitText="Save"
                    mutation={this.props.mutation}
                    formToModel={(form: Client) => pick(form, [
                        'id',
                        'name',
                        'address',
                        'taxId',
                        'businessId',
                        'vatNumber',
                        'color',
                        'initials',
                    ])}
                    successMessage={this.props.successMessage}
                >
                    {() => (
                        <React.Fragment>
                            <FormRow>
                                <FormTextField name="name" label="Name" />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="address" label="Address" />
                            </FormRow>
                        </React.Fragment>
                    )}
                </Form>
            </FormPage>
        );
    }
}

export default ClientForm;