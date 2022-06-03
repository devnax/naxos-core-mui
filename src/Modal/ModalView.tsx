import React, { useRef, FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Layer from '../Layer';
import { ModalOptionsProps } from './types';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props extends ModalOptionsProps {
    content: ReactElement;
}

const CloseButtonView = () => {
    return (
        <Box position="absolute" top={2} right={2} zIndex={1}>
            <IconButton
                size="small"
                onClick={() => {
                    Layer.close();
                }}
            >
                <CloseRoundedIcon />
            </IconButton>
        </Box>
    );
};

const ModalView: FC<Props> = ({ content, props, closeButton }) => {
    const ref: any = useRef();
    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%" width="100%">
            <Box ref={ref} minWidth={400} {...props} position="relative">
                {(closeButton === undefined || closeButton) && <CloseButtonView />}
                {content}
            </Box>
        </Box>
    );
};

export default ModalView;
