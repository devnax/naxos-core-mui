import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { withStore } from 'state-range';
import CircularProgress from '@mui/material/CircularProgress';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import FinderHandler from '../handlers/FinderHandler';
import Dropdown from '../../Dropdown';
import Checkbox from '@mui/material/Checkbox';
import CallbackStock from '../handlers/CallbackStock';
import Subscriber from '../handlers/Subscriber';
import timerAction from 'timer-action';

const SearchBox = () => {
    const hasCallback = CallbackStock.hasCallback();
    const searchText = FinderHandler.searchText();
    const settings = FinderHandler.settings();
    let isFilterable = settings.filterable || settings.filterable === undefined;

    if (!(Subscriber.findAll().length > 1)) {
        isFilterable = false;
    }

    return (
        <Box p={1}>
            <TextField
                autoFocus
                value={searchText || ''}
                onChange={(e: any) => {
                    FinderHandler.searchText(e.target.value);
                    FinderHandler.currentPage(0);

                    if (e.target.value.trim()) {
                        timerAction('FINDER_FIND', async () => FinderHandler.startFinding());
                    } else {
                        FinderHandler.setFoundedData([]);
                    }
                }}
                spellCheck={false}
                fullWidth
                placeholder={settings.placeholder || 'Find'}
                inputProps={{ sx: { p: 1.5 } }}
                InputProps={{
                    autoComplete: 'off',
                    sx: { fontSize: { sm: 20, xs: 16 } },
                    startAdornment: <InputAdornment position="start">{hasCallback ? <CircularProgress size={24} /> : <SearchRoundedIcon />}</InputAdornment>,
                    endAdornment: (
                        <>
                            {isFilterable ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        size="small"
                                        onClick={(e: any) => {
                                            const target = e.currentTarget;
                                            const formate = () => {
                                                const subscribers: any[] = Subscriber.findAll();
                                                return [
                                                    ...subscribers.map((item) => {
                                                        return {
                                                            title: item.id,
                                                            icon: (
                                                                <Box pr={1}>
                                                                    <Checkbox checked={item.checked} sx={{ p: 0 }} size="small" color="primary" />
                                                                </Box>
                                                            ),
                                                            onClick: () => {
                                                                Subscriber.update({ checked: !item.checked }, item._id);
                                                                if (Subscriber.findFirst({ checked: true })) {
                                                                    FinderHandler.checkedAll(false);
                                                                } else {
                                                                    FinderHandler.checkedAll(true);
                                                                }
                                                                Dropdown.show(target, formate(), { placement: 'bottom-end' });
                                                            }
                                                        };
                                                    })
                                                ];
                                            };
                                            Dropdown.show(e.currentTarget, formate(), { placement: 'bottom-end' });
                                        }}
                                    >
                                        <FilterListRoundedIcon />
                                    </IconButton>
                                </InputAdornment>
                            ) : (
                                ''
                            )}
                        </>
                    )
                }}
            />
        </Box>
    );
};

export default withStore(SearchBox);
