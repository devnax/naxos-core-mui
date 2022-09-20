import React from 'react';
import { withStore } from 'state-range';
import { ListPreviewProps } from '../types';

const ListPreview = ({ handler, render, ...rest }: ListPreviewProps) => {
    const item = handler.getActiveItem();
    const Render = item?.render || render;

    if (!item || !Render) {
        return <></>;
    }

    return <Render {...item} />;
};

export default withStore(ListPreview, ({ handler }) => {
    const item = handler.getActiveItem();
    return [item?._id];
});
