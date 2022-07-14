import * as React from 'react';
import Box from '@mui/material/Box';
import { ListViewProps, StoreProps } from '../types';
import { withStore } from 'state-range';
import List from '@mui/material/List';
import ItemRender from './ItemRender';

interface ListPropsTypes extends ListViewProps {
    items: StoreProps[];
    dept: number;
}

const ListRender = (props: ListPropsTypes) => {
    const { handler, onItemClick, button, items, dept, autoChange, ...listProps } = props;

    return (
        <List dense {...listProps} sx={{ ml: dept, p: 0, ...(listProps?.sx || {}) }}>
            {items.map((item) => {
                const childs = handler.getChilds(item.id);

                return (
                    <Box key={item?._id}>
                        <ItemRender
                            onClick={() => {
                                onItemClick && onItemClick(item);
                                if (autoChange !== false) {
                                    handler.activeItem(item.id);
                                }
                                if (handler.onItemClick) {
                                    handler.onItemClick(item);
                                }
                            }}
                            collaps={childs.length ? true : false}
                            isChild={dept > 0}
                            active={item.active || false}
                            {...item}
                        />

                        {childs.length && item.active ? <ListRender {...props} dept={dept + 1} items={childs} /> : ''}
                    </Box>
                );
            })}
        </List>
    );
};

const ListView = (props: ListViewProps) => {
    const { handler, onItemClick } = props;
    const parents = handler.getParents();
    if (!parents.length) {
        return <></>;
    }

    return (
        <Box>
            <ListRender onItemClick={onItemClick} items={parents} dept={0} {...props} />
        </Box>
    );
};

export default withStore(ListView);
