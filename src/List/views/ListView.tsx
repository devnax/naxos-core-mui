import * as React from 'react';
import Box from '@mui/material/Box';
import { ListViewProps, ListItemStoreProps, ID } from '../types';
import { withStore } from 'state-range';
import Handler from '../Handler';
import List, { ListProps } from '@mui/material/List';
import ItemRender from './ItemRender';

interface ListPropsTypes extends ListProps {
    listId: ID;
    active?: ID;
    dept: number;
    items: ListItemStoreProps[];
    button?: boolean;
    onItemClick?: Function;
}

const ListRender = (props: ListPropsTypes) => {
    const { onItemClick, button, active, dept, listId, items, ...listProps } = props;

    return (
        <List dense {...listProps} sx={{ ml: dept, p: 0, ...(listProps?.sx || {}) }}>
            {items.map((item) => {
                const childs = Handler.getChilds(listId, item.id);
                let isActive = active === item.id;

                if (!isActive && childs.length) {
                    const child = Handler.findFirst({ id: active }); // maybe child
                    if (child && child.parentId === item.id) {
                        isActive = true;
                    }
                }

                return (
                    <Box key={item?._id}>
                        <ItemRender
                            onClick={() => {
                                onItemClick && onItemClick(item);
                            }}
                            collaps={childs.length ? true : false}
                            dept={dept}
                            active={isActive}
                            {...item}
                        />

                        {childs.length && isActive ? <ListRender onItemClick={onItemClick} button={button} active={active} dept={dept + 1} listId={listId} items={childs} {...listProps} /> : ''}
                    </Box>
                );
            })}
        </List>
    );
};

const ListView = ({ onItemClick, active, listId, ...ListProps }: ListViewProps) => {
    const listItems = Handler.getItems(listId);
    if (!listItems.length) {
        return <></>;
    }

    return (
        <Box>
            <ListRender onItemClick={onItemClick} active={active} dept={0} listId={listId} items={listItems} {...ListProps} />
        </Box>
    );
};

export default withStore(ListView);
