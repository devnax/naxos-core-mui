import React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import { withStore } from 'state-range';
import Handler from '../Handler';

type Props = BoxProps & {
    listId: string;
    activeId: string;
};

const ListPreview = ({ listId, activeId, ...rest }: Props) => {
    const item = Handler.getItem(listId, activeId);

    if (!item) {
        return <></>;
    }

    const Render = item.render;
    if (!Render) {
        return <></>;
    }

    return (
        <Box {...rest}>
            <Render listId={listId} id={activeId} />
        </Box>
    );
};

export default withStore(ListPreview, ({ listId, activeId }) => {
    const item = Handler.getItem(listId, activeId);
    return [item?._id];
});
