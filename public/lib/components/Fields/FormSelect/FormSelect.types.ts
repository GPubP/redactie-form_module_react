import { FormValues, InputFieldProps } from '@redactie/form-renderer-module';
import { FieldProps } from 'formik';

export interface FormSelectValue {
	identifier: string;
}

export interface FormSelectFieldProps extends Omit<InputFieldProps, 'fieldProps'> {
	fieldProps: FieldProps<FormSelectValue, FormValues>;
}
