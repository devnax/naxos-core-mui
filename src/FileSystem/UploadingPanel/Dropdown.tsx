import React from 'react';
import Stack from '@mui/material/Stack';
import ProgressFileItem from '../components/ProgressFileItem';

const Dropdown = () => {
    return (
        <Stack bgcolor="background.paper" width={300} borderRadius={2} boxShadow={5} p={3} py={4} spacing={2}>
            <ProgressFileItem name="asdf.png" progress={100} size={9999} />
            <ProgressFileItem name="2.js" progress={90} size={99990} />
            <ProgressFileItem name="12.pdf" progress={50} size={90999} />
            <ProgressFileItem name="09.doc" progress={10} size={99099} />
        </Stack>
    );
};

export default Dropdown;
