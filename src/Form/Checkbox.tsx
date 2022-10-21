import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import { FormTypes } from './useForm';
import { any, SchemaFactory } from '../Validex';
import Label from './Label';

type Value = string | number | boolean | null;
interface Item {
    label: string;
    value: Value;
}

type Props = Omit<CheckboxProps, 'form' | 'defaultValue'> & {
    form?: FormTypes<any>;
    schema?: (s: any) => typeof SchemaFactory;
    label?: string;
    name: string;
    title?: string;
    value: Value;
    defaultValue?: Value | Value[];
    items?: Item[];
    vertical?: boolean;
    disableError?: boolean;
    hide?: boolean;
    require?: boolean;
};

const Item = ({ form, name, value, label, items, defaultValue, ...props }: Props) => {
    const state = form?.get(name, items ? [] : null);

    const checked = items ? state.includes(value) : state === value;

    return (
        <FormControlLabel
            sx={{ userSelect: 'none' }}
            control={
                <MuiCheckbox
                    name={name}
                    value={value}
                    checked={checked}
                    onClick={() => {
                        if (items) {
                            let values = form?.get(name) || [];
                            if (values.includes(value)) {
                                values = values.filter((v: string) => v !== value);
                            } else {
                                values.push(value);
                            }
                            form?.set(name, values);
                        } else {
                            form?.set(name, form?.get(name) === value ? undefined : value);
                        }
                        form?.removeError(name);
                    }}
                    sx={{ p: 0.5 }}
                    {...props}
                />
            }
            label={label}
        />
    );
};

export default function Checkbox({ form, name, value, defaultValue, label, title, items, vertical, schema, disableError, hide, require, ...props }: Props) {
    React.useEffect(() => {
        if (!form?.get(name)) {
            if (defaultValue) {
                form?.set(name, defaultValue);
            } else {
                form?.set(name, null);
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

    return (
        <>
            {title && (
                <Box>
                    <Label require={require} error={!disableError && error ? true : false}>
                        {title}
                    </Label>
                    {error && (
                        <Label error={true} fontSize={13} fontWeight={400}>
                            {error}
                        </Label>
                    )}
                </Box>
            )}
            <FormControl sx={{ flexDirection: vertical ? 'row' : 'column', pl: 1 }}>
                <Item form={form} name={name} value={value} label={label} items={items} {...props} />
                {items && items.map((item) => <Item key={item.label + '_redio'} form={form} name={name} value={item.value} label={item.label} items={items} {...props} />)}
            </FormControl>
        </>
    );
}
