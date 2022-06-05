import React, { FC } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { DataProps } from '../types';
import { withStore } from 'state-range';
import Subscriber from '../handlers/Subscriber';
import CallbackStock from '../handlers/CallbackStock';
import { isDarkMode } from 'mui-themex';

interface Props {
    data: DataProps;
    subscirberID: string;
}

const FoundItem: FC<Props> = ({ data, subscirberID }) => {
    const { title, icon, description } = data;
    const subscriber = Subscriber.getByID(subscirberID);
    const props: any = {};
    const isDark = isDarkMode();

    if (subscriber?.onItemClick) {
        props.onClick = () => {
            if (typeof subscriber?.onItemClick === 'function') {
                subscriber?.onItemClick(data);
            }
        };
    }

    return (
        <ListItem button sx={{ borderRadius: 2, px: 2, minHeight: 40 }} {...props}>
            {icon && <ListItemAvatar sx={{ minWidth: 40 }}>{typeof icon === 'string' ? <Avatar sx={{ width: 25, height: 25, borderRadius: 0 }} src={icon} alt={icon} /> : icon}</ListItemAvatar>}
            <Box>
                <Typography variant="body1" color={isDark ? 'grey.200' : 'grey.900'}>
                    {title}
                </Typography>
                <Typography variant="body2" color={isDark ? 'grey.200' : 'grey.900'} fontSize={13}>
                    {description}
                </Typography>
            </Box>
        </ListItem>
    );
};

export default withStore(FoundItem, () => [CallbackStock.hasCallback()]);
