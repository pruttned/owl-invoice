import React, { Component } from 'react';
import { Fab, Card, CardContent, CardActions, Button, Typography } from '@material-ui/core';
import * as yup from 'yup';
import Form from '../../../common/form/form';
import FormRow from '../../../common/form/form-row';
import FormPage from '../../../common/page/form-page';
import FormDateField from '../../../common/form/form-date-field';
import FormTextField from '../../../common/form/form-text-field';
import FormNumberField from '../../../common/form/form-number-field';
import { FieldArray } from 'formik';
import { DocumentNode } from 'graphql';
import Decimal from 'decimal.js';
import FormSelectField from '../../../common/form/form-select-field';
import { pick } from 'lodash';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import styles from './invoice-form.module.scss';

interface InvoiceViewModel {
    id?: string;
    issueDate: Date;
    deliveryDate: Date,
    dueDate: Date;
    client: string;
    items: InvoiceItemViewModel[];
}

interface InvoiceItemViewModel {
    text: string;
    unitCount: Decimal;
    unitPrice: Decimal;
}

interface ClientViewModel {
    id: string;
    name: string;
}

interface InvoiceFormProps {
    invoice: InvoiceViewModel;
    clients: ClientViewModel[];
    mutation: DocumentNode;
    successMessage: string;
    onSuccess?: (resp: any) => void;
    invalidateQueryCache?: boolean;
    menuRender?: (closeMenu: () => void) => JSX.Element[];
}

const validationSchema = yup.object().shape({
    issueDate: yup.date().required('issue date is required!'),
    deliveryDate: yup.date().required('delivery date is required!'),
    dueDate: yup.date().required('due date is required!'),
    client: yup.string().required('client is required!'),
    items: yup.array().of(yup.object().shape({
        text: yup.string().required('text is required!'),
        unitPrice: yup.number().typeError('unit price must a number')
            .moreThan(0, 'unit price must greater than zero')
            .required('unit price is required'),
        unitCount: yup.number().typeError('unit count must a number')
            .moreThan(0, 'unit count must greater than zero')
            .required('unit count is required'),
    })).min(1, 'at least one item is required!').required()
})

class InvoiceForm extends Component<InvoiceFormProps> {

    private toFormValues(invoice: InvoiceViewModel) {
        return {
            ...invoice,
            items: invoice.items && invoice.items.map(item => ({
                ...item,
                unitPrice: item.unitPrice.toNumber(),
                unitCount: item.unitCount.toNumber()
            })) || []
        };
    }

    private fromFormValues(formValues: InvoiceViewModel): any {
        return {
            ...pick(formValues, 'id', 'client'),
            issueDate: formValues.issueDate.toISOString().substr(0, 10),
            deliveryDate: formValues.deliveryDate.toISOString().substr(0, 10),
            dueDate: formValues.dueDate.toISOString().substr(0, 10),
            items: formValues.items.map((item) => ({
                ...pick(item, 'text'),
                unitPrice: new Decimal(item.unitPrice),
                unitCount: new Decimal(item.unitCount)
            }))
        };
    }

    render() {
        return (
            <FormPage menuRender={this.props.menuRender}>
                <Form
                    initialValues={this.toFormValues(this.props.invoice)}
                    validationSchema={validationSchema}
                    submitText="Save"
                    formToModel={this.fromFormValues}
                    mutation={this.props.mutation}
                    successMessage={this.props.successMessage}
                    onSuccess={this.props.onSuccess}
                    invalidateQueryCache={this.props.invalidateQueryCache}
                >
                    {(formikProps: any) => (
                        <React.Fragment>
                            {/* component props: {JSON.stringify(this.props.invoice)}
                            <br></br>
                            formik props: {JSON.stringify(formikProps.values)} */}

                            {formikProps.values.id && (
                                <FormRow>
                                    <div>Number: {formikProps.values.id}</div>
                                </FormRow>
                            )}
                            <FormRow>
                                <FormSelectField name="client" label="Client" items={this.props.clients} itemValue="id" itemLabel="name" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormDateField name="issueDate" label="Issue date" fullWidth />
                            </FormRow>
                            <FormRow>
                                <FormDateField name="deliveryDate" label="Delivery date" fullWidth />
                            </FormRow>                            
                            <FormRow>
                                <FormDateField name="dueDate" label="Due date" fullWidth />
                            </FormRow>

                            <Typography component="h2" variant="h5">
                                Items
                            </Typography>

                            <FieldArray
                                name="items"
                                render={arrayHelpers => (
                                    <div>
                                        {formikProps.values.items.map((item: any, index: any) => (
                                            <FormRow key={index}>
                                                <Card className={styles.itemCard}>
                                                    <CardContent>
                                                        <FormRow fullWidth>
                                                            <FormTextField name={`items[${index}].text`} label="Text" fullWidth />
                                                        </FormRow>
                                                        <FormRow>
                                                            <FormNumberField name={`items[${index}].unitPrice`} label="Unit price" className={styles.itemField} />
                                                            <FormNumberField name={`items[${index}].unitCount`} label="Unit count" className={styles.itemField} />
                                                        </FormRow>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button size="small" onClick={() => arrayHelpers.remove(index)}>Remove</Button>
                                                    </CardActions>
                                                </Card>

                                            </FormRow>
                                        ))}
                                        <FormRow>
                                            <div className={styles.itemAddRow}>
                                                <Fab color='primary' onClick={() => arrayHelpers.push({ text: '', unitPrice: '', unitCount: 1 })}>
                                                    <AddIcon />
                                                </Fab>
                                            </div>
                                        </FormRow>
                                    </div>
                                )}
                            />
                        </React.Fragment>
                    )}
                </Form>
            </FormPage>
        );
    }
}

export default InvoiceForm;