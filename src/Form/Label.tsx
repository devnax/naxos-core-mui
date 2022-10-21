import Typography, { TypographyProps } from '@mui/material/Typography';
import React, { ElementType, HTMLAttributes } from 'react';

type T = TypographyProps<ElementType<HTMLAttributes<HTMLLabelElement>>>;

type Props = T & {
    require?: boolean;
    error?: boolean;
};

const Label = ({ children, require, error, ...props }: Props) => {
    return (
        <Typography
            component="label"
            mb={0.5}
            fontSize={15}
            fontWeight={500}
            sx={{
                color: error ? 'error.main' : 'inherit',
                display: 'block',
                userSelect: 'none',
                ...(props.sx || {})
            }}
            {...(props as any)}
        >
            {children}{' '}
            {require && (
                <Typography sx={{ display: 'inline-block', fontSize: 13 }} color="red">
                    *
                </Typography>
            )}
        </Typography>
    );
};

export default Label;
