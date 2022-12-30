import React from 'react';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export interface AuthCardProps {
    image?: string;
    title?: string;
}

const AuthCard = ({ image, title }: AuthCardProps) => {
    return (
        <Stack spacing={2} alignItems="center">
            <Avatar
                src={image}
                sx={{
                    width: 70,
                    height: 70
                }}
            />
            {
                title && <Typography variant="h3" fontSize={17}>
                    {title}
                </Typography>
            }
        </Stack>
    );
};

export default AuthCard;
