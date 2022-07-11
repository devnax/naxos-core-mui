import React from 'react';
import Nav from './Nav';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import WidgetItem from './Item';
import { withStore } from 'state-range';
import Handler from '../handler';

const Widgets = () => {
    const items = Handler.getWidgets();

    return (
        <Stack>
            <Nav />
            <Grid container>
                {items.map((item) => {
                    return (
                        <Grid key={item._id} p={2} item xs={12} sm={6} md={4} lg={3}>
                            <WidgetItem {...item} />
                        </Grid>
                    );
                })}
            </Grid>
        </Stack>
    );
};

export default withStore(Widgets);
