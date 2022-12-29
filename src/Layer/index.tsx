import * as React from 'react';
import { withStore } from 'state-range';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { AnimatePresence } from 'framer-motion';
import AnimateBox from '../AnimateBox';
import BlurBox from '../BlurBox';
import Handler from './Handler';
import { LayerOptionProps, PublicLayerType, LayerItemProps } from './types';

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

const Item: React.FC<LayerItemProps> = ({ layer, index }) => {
    const theme = useTheme();
    const { content, opacity, zIndex, closeButton, props, animation, onOpen, onClose, onClickLayer, blur, gradient, bgImage } = layer;

    React.useEffect(() => {
        onOpen && onOpen();
        return () => {
            onClose && onClose();
        };
    }, []);

    return (
        <>
            {bgImage && (
                <BlurBox
                    position="fixed"
                    top={0}
                    left={0}
                    bottom={0}
                    right={0}
                    zIndex={(zIndex || 1301) + index}
                    overflow="hidden"
                    bgImage={bgImage}
                    sx={{ opacity: opacity !== undefined ? opacity : 1 }}
                />
            )}

            <BlurBox
                blurBoxProps={{
                    overflow: 'hidden'
                }}
                blur={blur}
                gradient={gradient}
                position="fixed"
                top={0}
                left={0}
                bottom={0}
                right={0}
                zIndex={(zIndex || 1501) + index}
                overflow="hidden"
                bgcolor={!(bgImage || blur || gradient) ? alpha(theme.palette.background.default, opacity === undefined ? 1 : opacity) : 'transparent'}
            ></BlurBox>
            <Box
                position="fixed"
                top={0}
                left={0}
                bottom={0}
                right={0}
                zIndex={(zIndex || 1501) + index}
                overflow="hidden"
                onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    onClickLayer && onClickLayer(e);
                    props?.onClick && props.onClick(e);
                }}
            >
                {closeButton && <CloseButtonView />}
                <AnimateBox type={animation || 'zoomOver'} style={{ height: '100%' }}>
                    {content}
                </AnimateBox>
            </Box>
        </>
    );
};

const View = () => {
    const layers = Handler.find({ active: true });
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
