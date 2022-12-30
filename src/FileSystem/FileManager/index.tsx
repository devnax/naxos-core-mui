import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import ViewBox from '../../ViewBox';
import BasicTable from './Table';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/FormatListBulleted';
import GridIcon from '@mui/icons-material/GridView';
import GridItem from './GridItem';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

const FileManagerHeader = ({ onClick, grid }: any) => {
    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" p={1} px={2} borderBottom={1} borderColor="divider">
            <Stack spacing={0.5} direction="row" alignItems="center">
                <Button variant="text" color="primary">
                    Select All
                </Button>
                <IconButton>
                    <DeleteIcon />
                </IconButton>
            </Stack>
            <Stack>
                <IconButton
                    onClick={() => {
                        onClick(!grid);
                    }}
                >
                    {!grid ? <GridIcon /> : <ListIcon />}
                </IconButton>
            </Stack>
        </Stack>
    );
};

const FileManager = () => {
    const [grid, setGrid] = useState(false);

    return (
        <Stack>
            <ViewBox header={<FileManagerHeader grid={grid} onClick={(show: boolean) => setGrid(show)} />}>
                {grid ? (
                    <Stack direction="row" p={2} flexWrap="wrap">
                        <GridItem name="index.html" size={1212} active={true} />
                        <GridItem name="styles.css" size={1212} active={false} />
                        <GridItem name="script.js" size={1212} active={false} />
                        <GridItem name="styles.css" size={1212} active={false} />
                        <GridItem name="script.js" size={1212} active={false} />
                        <GridItem name="styles.css" size={1212} active={false} />
                        <GridItem name="script.js" size={1212} active={false} />
                        <GridItem name="styles.css" size={1212} active={false} />
                        <GridItem name="script.js" size={1212} active={false} />
                        <GridItem name="styles.css" size={1212} active={false} />
                        <GridItem name="script.js" size={1212} active={false} />
                    </Stack>
                ) : (
                    <BasicTable />
                )}
            </ViewBox>
        </Stack>
    );
};

export default FileManager;
