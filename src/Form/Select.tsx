import * as React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Label from './Label';
import { FormTypes } from './useForm';
import { any, SchemaFactory } from '../Validex';

export interface SelectItemProps {
    label: string;
    value: string | number;
}

type AutocompleteTypes = Omit<AutocompleteProps<SelectItemProps, any, any, any, any>, 'defaultValue'>;
export type SelectProps = Partial<AutocompleteTypes> & {
    label?: string;
    require?: boolean;
    name: string;
    options: SelectItemProps[];
    defaultValue?: SelectItemProps['value'] | SelectItemProps['value'][];
    form?: FormTypes<any>;
    schema?: (s: any) => typeof SchemaFactory;
    disableError?: boolean;
    hide?: boolean;
    inputProps?: TextFieldProps;
};

const Select = ({ form, label, require, name, defaultValue, placeholder, schema, disableError, options, hide, inputProps, ...props }: SelectProps) => {
    options = React.useMemo(() => {
        return options;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    React.useEffect(() => {
        if (defaultValue) {
            let val = null;
            if (props.multiple && Array.isArray(defaultValue)) {
                const filter = options.filter((opt) => defaultValue?.includes(opt.value as any));
                val = filter.map((opt) => opt.value);
            } else {
                const found = options.find((i) => i.value === (defaultValue as any));
                if (found) {
                    val = found.value;
                }
            }
            if (val && !form?.get(name)) {
                form?.set(name, val);
            }
        } else {
            if (!form?.get(name)) {
                form?.set(name, props.multiple ? [] : null);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    React.useEffect(() => {
        if (schema) {
            form?.setSchema(name, schema(any().field(name)));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form?.observe().data]);

    if (hide) {
        return <></>;
    }

    const error = form?.getError(name);
    const values = form?.get(name);
    let value: any = props.multiple ? [] : null;
    if (props.multiple) {
        value = values?.map((id: number) => options.find((opt) => opt.value === id)) || [];
    } else {
        value = options.find((opt) => opt.value === values) || null;
    }

    const inpProps: any = { ...(inputProps || {}) };
    if (disableError !== false && error) {
        inpProps.helperText = error;
        inpProps.error = error ? true : false;
        inpProps.onFocus = () => form?.removeError(name);
    }

    return (
        <Box>
            {label && (
                <Label error={!disableError && error ? true : false} require={require} htmlFor={props.id || name}>
                    {label}
                </Label>
            )}
            <Autocomplete
                loading={true}
                disableCloseOnSelect={props.multiple}
                limitTags={props.multiple ? 3 : -1}
                value={value as any}
                onChange={(_e: any, items: any) => {
                    let val: any = null;
                    if (props.multiple) {
                        val = items.map((i: any) => i.value);
                    } else {
                        val = items?.value;
                    }
                    form?.set(name, val);
                }}
                options={options}
                {...props}
                renderInput={(params) => <TextField {...params} size="small" {...inpProps} placeholder={(props.value || value)?.length ? '' : placeholder} />}
            />
        </Box>
    );
};

export default Select;
