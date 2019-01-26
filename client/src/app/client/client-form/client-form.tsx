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
    onSuccess?: (resp: any) => void;
    invalidateQueryCache?: boolean;
    menuRender?: (closeMenu: () => void) => JSX.Element[];
}

const validationSchema = yupObject().shape({
    name: yupString()
        .required('name is required!'),
    color: yupString()
        .required('color is required!'),
    initials: yupString()
        .required('initials is required!'),
    address: yupString()
        .required('address is required!'),
    taxId: yupString()
        .required('taxId is required!'),
    businessId: yupString()
        .required('businessId is required!'),
    vatNumber: yupString()
        .required('vatNumber is required!'),
})

class ClientForm extends Component<ClientFormProps, Client> {
    render() {
        return (
            <FormPage menuRender={this.props.menuRender}>
                <Form
                    initialValues={this.props.client}
                    validationSchema={validationSchema}
                    submitText="Save"
                    mutation={this.props.mutation}
                    formToModel={(form: Client) => pick(form, [
                        'id',
                        'name',
                        'color',
                        'initials',
                        'address',
                        'taxId',
                        'businessId',
                        'vatNumber',
                    ])}
                    successMessage={this.props.successMessage}
                    onSuccess={this.props.onSuccess}
                    invalidateQueryCache={this.props.invalidateQueryCache}
                >
                    {() => (
                        <React.Fragment>
                            <FormRow>
                                <FormTextField name="name" label="Name" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="color" label="Color" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="initials" label="Initials" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="address" label="Address" fullWidth multiline rows="4" />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="taxId" label="Tax Id" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="businessId" label="Business Id" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="vatNumber" label="Vat Number" fullWidth />
                            </FormRow>
                        </React.Fragment>
                    )}
                </Form>
            </FormPage>
        );
    }
}
export default ClientForm;