import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import { object as yupObject, string as yupString } from 'yup';
import FormTextField from '../../../common/form/form-text-field';
import Form from '../../../common/form/form';
import FormRow from '../../../common/form/form-row';
import FormPage from '../../../common/page/form-page';
import { Invoice } from '../invoice';

interface InvoiceFormProps {
    invoice: Invoice
}

const validationSchema = yupObject().shape({
    name: yupString()
        .required('name is required!'),
    address: yupString()
        .required('address is required!'),
})

class InvoiceForm extends Component<InvoiceFormProps> {
    render() {
        return (
            <FormPage>
                <Form
                    initialValues={this.props.invoice}
                    validationSchema={validationSchema}
                    submitText="Save"
                >
                    {() => (
                        <React.Fragment>
                            <div>Number:{this.props.invoice.number}</div>
                            <FormRow>
                                {/* <FormTextField name="name" label="Name" /> */}
                            </FormRow>
                        </React.Fragment>
                    )}
                </Form>
            </FormPage>
        );
    }
}

export default InvoiceForm;