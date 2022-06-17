import React from 'react';
import Box from '@mui/material/Box';
import { withStore } from 'state-range';
import Handler from '../Handler';
import MobileNav from './MobileNav';
import isMobile from '../isMobile';

const Content = ({ id }: { id: string }) => {
    const _isMobile = isMobile();

    const view = Handler.getView(id);
    if (!view) {
        return <></>;
    }
    const render = view?.render;

    return (
        <Box>
            {_isMobile && <MobileNav title={view.title} />}
            {render}
        </Box>
    );
};

export default withStore(Content);
