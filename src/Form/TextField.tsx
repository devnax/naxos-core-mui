import React, { FC } from 'react';
import Input, { TextFieldProps as TP } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormTypes } from './useForm';
import Label from './Label';
import { any, SchemaFactory } from '../Validex';

export type TextFieldProps = TP & {
    form?: FormTypes<any>;
    name: string;
    defaultValue?: TP['value'];
    require?: boolean;
    schema?: (s: any) => typeof SchemaFactory;
    disableError?: boolean;
    hide?: boolean;
};

const TextField: FC<TextFieldProps> = ({ form, name, require, label, defaultValue, schema, disableError, hide, ...props }) => {
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

    if (disableError !== false && error) {
        props.helperText = error;
        props.error = error ? true : false;
        props.onFocus = () => form?.removeError(name);
    }

    return (
        <Box>
            {label && (
                <Label error={!disableError && error ? true : false} require={require} htmlFor={props.id || name}>
                    {label}
                </Label>
            )}
            <Input
                fullWidth
                spellCheck={false}
                size="small"
                value={form?.get(name, '')}
                onChange={(e: any) => {
                    form?.set(name, e.target.value);
                }}
                name={name}
                id={props.id || name}
                {...props}
            />
        </Box>
    );
};

export default TextField;
