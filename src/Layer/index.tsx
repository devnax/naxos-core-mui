import React, { useEffect, FC, MouseEvent } from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import { withStore } from 'state-range';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AnimatePresence } from 'framer-motion';
import AnimateBox from '../libs/AnimateBox';
import Handler from './Handler';
import { LayerOptionProps, PublicLayerType, LayerItemProps, RowType } from './types';
export { LayerOptionProps };

const _publicLayer: PublicLayerType = {
    open: Handler.open.bind(Handler),
    close: Handler.close.bind(Handler),
    closeAll: Handler.closeAll.bind(Handler),
    isOpened: Handler.isOpened.bind(Handler)
};
export default _publicLayer;

const CloseButtonView = () => {
    return (
        <Box position="fixed" top={20} right={20} zIndex={1}>
            <IconButton
                onClick={() => {
                    Handler.close();
                }}
            >
                <CloseRoundedIcon />
            </IconButton>
        </Box>
    );
};

const Item: FC<LayerItemProps> = ({ layer, index }) => {
    const theme = useTheme();
    const { content, opacity, zIndex, closeButton, props, animation, onOpen, onClose, onClickLayer, blur, blurGradient, blurImage } = layer;

    useEffect(() => {
        onOpen && onOpen();
        return () => {
            onClose && onClose();
        };
    }, []);

    let _props: any = props || {};
    if (onClickLayer) {
        _props.onClick = (e: MouseEvent<HTMLDivElement>) => {
            onClickLayer && onClickLayer(e);
            props?.onClick && props.onClick(e);
        };
    }

    const isBlur = blur !== undefined;

    if (isBlur) {
        _props.sx = {
            backdropFilter: `blur(${blur}px)`
        };

        if (blurGradient) {
            _props.sx.backgroundImage = `linear-gradient(0deg, ${blurGradient[0]} 39%, ${blurGradient[1]} 100%)`;
        }
    }

    return (
        <>

            <Box
                position="fixed"
                top={0}
                left={0}
                bottom={0}
                right={0}
                zIndex={(zIndex || 1501) + index}
                // bgcolor={!blurImage && alpha(theme.palette.background.default, opacity === undefined ? 1 : opacity)}

                overflow="hidden"
                sx={{
                    backgroundImage: 'url(' + blurImage + ')',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover",
                    backgroundPosition: 'center',
                }}

            >
                {closeButton && <CloseButtonView />}
                <AnimateBox type={animation || 'zoomOver'} style={{ height: '100%' }}>
                    <Box
                        sx={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: -1,
                            opacity: opacity === undefined ? 1 : opacity,
                            width: '100%',
                            height: '100%',
                            backdropFilter: `blur(${blur}px)`
                        }}
                    >

                    </Box>
                    {content}
                </AnimateBox>
            </Box>
        </>
    );
};

const View = () => {
    const layers: (LayerOptionProps & RowType)[] = Handler.find({ active: true });

    return (
        <AnimatePresence>
            {layers.map((layer, idx) => (
                <Item key={layer._id} layer={layer} index={idx} />
            ))}
        </AnimatePresence>
    );
};

export const LayerView = withStore(View, () => {
    return [Handler.observeStoreData()];
});
