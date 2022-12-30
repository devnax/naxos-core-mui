import React from 'react';
import Stack from '@mui/material/Stack';
import Login from './LoginForm';
const Auth = () => {
    return (
        <Stack height="100%" width="100%" alignItems="center" justifyContent="center">
            <Login
                image="https://mui.com/static/images/avatar/2.jpg"
            />
        </Stack>
    );
};

export default Auth;
