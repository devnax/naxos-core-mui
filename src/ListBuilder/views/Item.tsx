import React, { FC, useState } from 'react';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/CloseRounded';
import MoveIcon from '@mui/icons-material/OpenWithRounded';
import { ListItemProps } from '../types';
import EditIcon from '@mui/icons-material/ModeEditRounded';
import TextField from '@mui/material/TextField';
import DownIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import UpIcon from '@mui/icons-material/KeyboardArrowUpRounded';

const Item: FC<ListItemProps> = ({ title, collapse, sortable, render, onClose, onTitleEdit, onCollaps, ...StackProps }) => {
    const [open, setOpen] = useState(false);
    const [titleEdit, setTitleEdit] = useState(false);
    const [titleText, setTitleText] = useState(title);
    sortable = !(sortable === false);

    const _in = collapse || open;

    return (
        <Stack bgcolor="background.paper" p={1} borderRadius={2} {...StackProps} mb={0.5}>
            <Stack direction="row" justifyContent="space-berween" alignItems="center">
                <Stack flex={1} direction="row" alignItems="center" sx={{ userSelect: 'none' }}>
                    {sortable && (
                        <IconButton size="small" sx={{ cursor: 'move' }}>
                            <MoveIcon />
                        </IconButton>
                    )}
                    <Box pl={1} flex={1}>
                        {titleEdit && onTitleEdit && (
                            <TextField
                                size={'small'}
                                inputProps={{
                                    sx: { p: 0.5 }
                                }}
                                fullWidth
                                value={titleText}
                                onChange={(e: any) => {
                                    setTitleText(e.target.value);
                                }}
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        setTitleEdit(!titleEdit);
                                        onTitleEdit(titleText);
                                    }
                                }}
                            />
                        )}
                        {!titleEdit && (
                            <Typography
                                sx={{
                                    '&:hover button': {
                                        visibility: 'visible'
                                    }
                                }}
                            >
                                {title}
                                {onTitleEdit && !titleEdit && (
                                    <IconButton
                                        sx={{ visibility: 'hidden' }}
                                        size="small"
                                        onClick={() => {
                                            setTitleEdit(!titleEdit);
                                        }}
                                    >
                                        <EditIcon sx={{ fontSize: 14 }} />
                                    </IconButton>
                                )}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                <Box>
                    {onClose && (
                        <IconButton
                            size="small"
                            onClick={() => {
                                onClose();
                            }}
                        >
                            <CloseIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    )}
                    {_in && (
                        <IconButton
                            size="small"
                            onClick={() => {
                                if (!collapse) {
                                    setOpen(!open);
                                } else {
                                    onCollaps && onCollaps();
                                }
                            }}
                        >
                            <UpIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    )}
                    {!_in && (
                        <IconButton
                            size="small"
                            onClick={() => {
                                if (!collapse) {
                                    setOpen(!open);
                                } else {
                                    onCollaps && onCollaps();
                                }
                            }}
                        >
                            <DownIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    )}
                </Box>
            </Stack>
            <Collapse in={_in} timeout="auto" unmountOnExit>
                {render}
            </Collapse>
        </Stack>
    );
};

export default Item;
