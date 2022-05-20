import React, { FC } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { AlertProps } from './types';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Handler from './';

const AlertView: FC<AlertProps> = ({ type, title, content, icon, onClick, buttonText, centerContent }) => {
    const text: [string, string] = buttonText || ['OK', 'CANCEL'];
    return (
        <Stack borderRadius={2} boxShadow={5} bgcolor="background.paper" p={2} pb={1} justifyContent="space-between">
            <Stack direction={centerContent ? 'column' : 'row'} textAlign={centerContent ? 'center' : 'left'} gap={centerContent ? 0 : 1}>
                {icon && <Box>{icon}</Box>}
                <Box>
                    <Typography mb={0.4} variant="h6">
                        {title}
                    </Typography>
                    {content && (
                        <Typography variant="subtitle1" fontSize={15}>
                            {content}
                        </Typography>
                    )}
                </Box>
            </Stack>
            <Stack mt={1} direction="row" justifyContent="flex-end" gap={1}>
                <Button
                    variant="text"
                    color={type}
                    sx={{ fontSize: 13, fontWeight: 600 }}
                    onClick={() => {
                        onClick && onClick(false);
                        Handler.close();
                    }}
                >
                    {text[1]}
                </Button>
                <Button
                    variant="text"
                    color={type}
                    sx={{ fontSize: 13, fontWeight: 600 }}
                    onClick={() => {
                        onClick && onClick(true);
                        Handler.close();
                    }}
                >
                    {text[0]}
                </Button>
            </Stack>
        </Stack>
    );
};

export default AlertView;
