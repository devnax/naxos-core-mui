import React, { ReactElement } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Scrollbar from '../components/Scrollbar';

export interface ViewBoxProps extends StackProps {
    header?: ReactElement;
    footer?: ReactElement;
}

const ViewBox = ({ children, header, footer, ...rest }: ViewBoxProps) => {
    return (
        <Stack height="100%" {...rest}>
            {header}
            <Scrollbar style={{ flex: 1 }}>{children}</Scrollbar>
            {footer}
        </Stack>
    );
};

export default ViewBox;
