import { BoxProps } from '@mui/material/Box';
import { LayerOptionProps } from '../Layer';

export interface ModalOptionsProps extends LayerOptionProps {
    closeButton?: boolean;
    props?: BoxProps
}
