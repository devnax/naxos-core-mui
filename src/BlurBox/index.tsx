import React, { ReactElement, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';

interface Props extends BoxProps {
    children?: ReactElement | ReactNode;
    blur?: number;
    gradient?: [string, string];
    bgImage?: string;
    blurBoxProps?: BoxProps;
}

const BlurBox = ({ children, blur, gradient, bgImage, blurBoxProps, ...props }: Props) => {
    let blurStyle: any = {};

    const isBlur = blur !== undefined;
    let bgProps: any = {};

    if (gradient || bgImage) {
        bgProps.backgroundRepeat = 'no-repeat';
        bgProps.backgroundSize = 'cover';
        bgProps.backgroundPosition = 'center';

        if (bgImage) {
            bgProps.backgroundImage = `url(${bgImage})`;
        }
        if (gradient) {
            bgProps.backgroundImage = `linear-gradient(0deg, ${gradient[0]} 39%, ${gradient[1]} 100%) ${bgProps.backgroundImage ? ',' + bgProps.backgroundImage : ''}`;
        }
    }

    if (isBlur) {
        blurStyle.backdropFilter = `blur(${blur}px)`;
    }

    return (
        <Box
            {...props}
            sx={{
                height: '100%',
                width: '100%',
                ...bgProps,
                ...(props?.sx || {})
            }}
        >
            <Box
                {...blurBoxProps}
                sx={{
                    width: '100%',
                    height: '100%',
                    ...blurStyle,
                    ...(blurBoxProps?.sx || {})
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default BlurBox;
