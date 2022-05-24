# Interface: FormSelectFieldProps

## Hierarchy

- `Omit`<`InputFieldProps`, ``"fieldProps"``\>

  ↳ **`FormSelectFieldProps`**

## Table of contents

### Properties

- [fieldHelperProps](../wiki/FormSelectFieldProps#fieldhelperprops-1)
- [fieldProps](../wiki/FormSelectFieldProps#fieldprops-1)
- [fieldSchema](../wiki/FormSelectFieldProps#fieldschema-1)

## Properties

### fieldHelperProps

• **fieldHelperProps**: `FieldHelperProps`<`any`\>

FieldHelperProps
helper functions which you can use to imperatively change the value, error value or touched status for the field in question

#### Inherited from

Omit.fieldHelperProps

#### Defined in

node_modules/@redactie/form-renderer-module/dist/lib/services/fieldRegistry/fieldRegistry.types.d.ts:22

___

### fieldProps

• **fieldProps**: `FieldProps`<[`FormSelectValue`](../wiki/FormSelectValue), `FormikValues`\>

#### Defined in

public/lib/components/Fields/FormSelect/FormSelect.types.ts:9

___

### fieldSchema

• **fieldSchema**: `FieldSchema`

Fieldschema
This is a partial of FormSchema
But it only holds the schema information for a field

#### Inherited from

Omit.fieldSchema

#### Defined in

node_modules/@redactie/form-renderer-module/dist/lib/services/fieldRegistry/fieldRegistry.types.d.ts:17
