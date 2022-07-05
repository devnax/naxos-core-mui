import * as React from 'react';
import Box from '@mui/material/Box';
import { ListViewProps, ListItemStoreProps, ID } from '../types';
import { withStore } from 'state-range';
import Handler from '../Handler';

import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import List, { ListProps } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded';

interface ItemRenderProps extends ListItemStoreProps {
    active: boolean;
    button?: boolean;
    dept: number;
    collaps: boolean;
    onClick: Function;
}

const ItemRender = (props: ItemRenderProps) => {
    const { collaps, dept, button, active, icon, title, label, heading, onClick } = props;
    const btn: any = button === undefined || button ? true : false;
    const isChild = dept > 0;

    return (
        <>
            {typeof heading === 'string' ? (
                <Typography variant="h6" fontWeight={500} sx={{ opacity: 0.5 }} mt={2} mb={1}>
                    {heading}
                </Typography>
            ) : (
                heading
            )}
            <ListItem
                button={btn}
                onClick={() => onClick()}
                sx={{
                    borderRadius: 2,
                    p: 0.4,
                    px: 1,
                    bgcolor: isChild ? 'transparent!important' : 'inherit',
                    color: isChild && active ? 'primary.main' : 'inherit'
                }}
                selected={active}
            >
                {icon && (
                    <ListItemIcon
                        sx={{
                            minWidth: 35,
                            '& svg': {
                                fontSize: 23,
                                color: active ? 'primary.main' : 'inherit'
                            }
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                )}
                {title && (
                    <ListItemText>
                        <Typography component="div" variant="body1" fontSize={14.5} fontWeight={500}>
                            {title} {label && <Chip label={label} size="small" sx={{ m: 0, height: 18, '& span': { p: 0.6, fontSize: 12 } }} />}
                        </Typography>
                    </ListItemText>
                )}
                {collaps ? <>{active ? <ArrowUpIcon /> : <ArrowDownIcon />}</> : ''}
            </ListItem>
        </>
    );
};

interface ListPropsTypes extends ListProps {
    listId: ID;
    active?: ID;
    dept: number;
    items: ListItemStoreProps[];
    button?: boolean;
    onItemClick?: Function;
}

const ListRender = ({ onItemClick, button, active, dept, listId, items, ...listProps }: ListPropsTypes) => {
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
                                onItemClick && onItemClick(item.id);
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
