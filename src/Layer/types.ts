import { ReactElement, MouseEvent } from 'react';
import { BoxProps } from '@mui/material/Box';
import { AnimationType } from 'fmotion-variants';

export interface RowType {
    _id?: string;
    observe?: string;
    content?: ReactElement;
}

export type LayerOptionProps = {
    stable?: boolean;
    zIndex?: number;
    closeButton?: boolean;
    animation?: AnimationType | 'none';
    opacity?: number;
    props?: BoxProps;
    onOpen?: Function;
    onClose?: Function;
    onClickLayer?: (e: MouseEvent<HTMLDivElement>) => void;
    blur?: number;
    bgImage?: string;
    gradient?: [string, string];
};

export interface PublicLayerType {
    open: (id: string | number, content: ReactElement, options?: LayerOptionProps) => void;
    close: (id?: string) => void;
    closeAll: Function;
    isOpened: (id: string | number) => boolean;
}

export interface LayerItemProps {
    layer: StoreProps;
    index: number;
}

export interface StoreProps extends LayerOptionProps {
    id: string | number;
    content: ReactElement;
    active: boolean;
}
