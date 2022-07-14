import * as React from 'react';
import { StoreProps } from '../types';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUpRounded';

interface ItemRenderProps extends StoreProps {
    active: boolean;
    button?: boolean;
    isChild: boolean;
    collaps: boolean;
    onClick: React.MouseEventHandler<HTMLLIElement>;
}

export default (props: ItemRenderProps) => {
    const { collaps, isChild, button, active, icon, title, label, heading, onClick, divider } = props;

    const btn: any = button === undefined || button ? true : false;

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
                onClick={onClick}
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
            {divider && <Divider />}
        </>
    );
};
