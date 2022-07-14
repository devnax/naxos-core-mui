import React from 'react';
import Box from '@mui/material/Box';
import { withStore } from 'state-range';
import { ListPreviewProps } from '../types'

const ListPreview = ({ handler, ...rest }: ListPreviewProps) => {
    const item = handler.getActiveItem();

    if (!item || !item.render) {
        return <></>;
    }

    const Render = item.render;

    return (
        <Box {...rest}>
            <Render id={item.id} />
        </Box>
    );
};

export default withStore(ListPreview, ({ handler }) => {
    const item = handler.getActiveItem();
    return [item?._id];
});
