import React, { FC, ReactElement, ReactNode } from 'react';
import { motion, MotionProps } from 'framer-motion';
import variants from './variants';

export type AnimationType = 'zoom' | 'zoomOver' | 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight';

interface Props extends MotionProps {
    children: ReactElement | ReactNode;
    type?: AnimationType | 'none';
}

const AnimateBox: FC<Props> = ({ children, type, ...props }) => {
    type = type || 'zoomOver';
    let _variants: any = variants.zoomOver;
    if (variants.hasOwnProperty(type)) {
        _variants = (variants as any)[type];
    }

    if (type === 'none') {
        _variants = {};
    }

    return (
        <motion.div initial="initial" animate="animate" exit="exit" variants={_variants} {...props}>
            {children}
        </motion.div>
    );
};

export default AnimateBox;
