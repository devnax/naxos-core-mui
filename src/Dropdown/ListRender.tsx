import React, { FC } from 'react';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DropdownArrayType } from './types';

interface Props {
    items: DropdownArrayType[];
}

const ListRender: FC<Props> = ({ items }) => {
    return (
        <List
            sx={{
                borderRadius: 2,
                boxShadow: 5,
                bgcolor: 'background.paper',
                p: 0.5
            }}
            onContextMenu={(e: any) => {
                e.preventDefault();
            }}
        >
            {items.map(({ title, label, icon, divider, onClick, onClose, ...rest }: DropdownArrayType, idx: number) => {
                return (
                    <Box key={idx}>
                        <ListItem button onClick={(e: any) => onClick && onClick(e)} {...rest}>
                            {icon && <ListItemIcon>{icon}</ListItemIcon>}
                            <ListItemText>
                                <Box display="flex" justifyContent="space-between" alignItems="center" fontSize={14} fontWeight={500}>
                                    <Box>{title}</Box>
                                    {label && <Box>{label}</Box>}
                                </Box>
                            </ListItemText>
                        </ListItem>
                        {divider && <Divider />}
                    </Box>
                );
            })}
        </List>
    );
};

export default ListRender;
