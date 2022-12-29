import BrowserScrollbar from 'react-browser-scrollbar';
import React, { ReactElement, ReactNode, UIEvent, HTMLAttributes } from 'react';
import { useTheme } from '@mui/material/styles';

type DivProps = HTMLAttributes<HTMLDivElement>;
export interface Props extends DivProps {
    children: ReactElement | ReactNode;
    autoHide?: boolean;
    thumbSize?: number;
    onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
    onScrollStop?: (e: UIEvent<HTMLDivElement>) => void;
    onScrollStart?: (e: UIEvent<HTMLDivElement>) => void;
}

const Scrollbar = ({ children, ...props }: Props) => {
    const theme = useTheme()
    return (
        <BrowserScrollbar darkMode={theme.palette.mode === 'dark'} {...props}>
            {children}
        </BrowserScrollbar>
    );
};

export default Scrollbar;
