import React, { Component } from 'react';
import { Supplier } from '../supplier';
import { object as yupObject, string as yupString } from 'yup';
import FormTextField from '../../../common/form/form-text-field';
import Form from '../../../common/form/form';
import FormRow from '../../../common/form/form-row';
import FormPage from '../../../common/page/form-page';
import { DocumentNode } from 'graphql';
import { pick } from 'lodash';
import iban from 'iban';

interface SupplierFormProps {
    supplier: any;
    mutation: DocumentNode;
    successMessage: string;
    onSuccess?: (resp: any) => void;
    invalidateQueryCache?: boolean;
    menuRender?: (closeMenu: () => void) => JSX.Element[];
}

const validationSchema = yupObject().shape({
    name: yupString()
        .required('name is required!'),
    address: yupString()
        .required('address is required!'),
    taxId: yupString()
        .required('taxId is required!'),
    businessId: yupString()
        .required('businessId is required!'),
    vatNumber: yupString(),
    register: yupString()
        .required('register is required!'),
    iban: yupString()
        .required('IBAN is required!')
        .test('iban', 'invalid IBAN', value => iban.isValid(value)),
    bank: yupString()
        .required('bank is required!'),
    phoneNumber: yupString()
        .required('phoneNumber is required!'),
    email: yupString()
        .required('email is required!')
        .email('provide valid email address'),
})


class SupplierForm extends Component<SupplierFormProps, Supplier> {
    render() {
        return (
            <FormPage menuRender={this.props.menuRender}>
                <Form
                    initialValues={this.props.supplier}
                    validationSchema={validationSchema}
                    submitText="Save"
                    mutation={this.props.mutation}
                    formToModel={(form: Supplier) => pick(form, [
                        'name',
                        'address',
                        'taxId',
                        'businessId',
                        'vatNumber',
                        'register',
                        'iban',
                        'bank',
                        'phoneNumber',
                        'email'
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
                            <FormRow>
                                <FormTextField name="register" label="Register" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="iban" label="IBAN" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="bank" label="Bank" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="phoneNumber" label="Phone number" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormTextField name="email" label="Email" fullWidth />
                            </FormRow>
                        </React.Fragment>
                    )}
                </Form>
            </FormPage>
        );
    }
}
export default SupplierForm;