import * as React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab, { TabProps } from '@mui/material/Tab';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DataTableProps } from '../types';
import NavbarInfo from './NavbarInfo';
import Dropdown from '../../Dropdown';
import IconButton from '@mui/material/IconButton';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { withStore } from 'state-range';

const Navbar = (props: DataTableProps) => {
    let { handler, filterMenu } = props;
    const tabs = handler.getMeta('tabs');
    const searchBox = handler.getMeta('searchBox', true);

    if (typeof filterMenu === 'function') {
        const Menu: any = filterMenu;
        filterMenu = (<Menu />) as any;
    }

    return (
        <Box>
            <Stack justifyContent="space-between" alignItems="center" direction={{ xs: 'column', md: 'row' }} borderRadius={2}>
                <Box flex={1}>
                    {tabs && (
                        <Tabs
                            sx={{ minHeight: 'auto' }}
                            value={handler.getMeta('currentTab') || tabs[0].value}
                            onChange={(_e, currentTab) => {
                                handler.setMeta('currentTab', currentTab);

                                if (handler.onTabChange) {
                                    handler.onTabChange(currentTab);
                                }

                                if (handler.onStateChange) {
                                    handler.onStateChange();
                                }
                            }}
                        >
                            {tabs.map((tab: TabProps) => (
                                <Tab sx={{ color: 'grey.500', fontSize: 14, minWidth: 'auto', minHeight: 'auto', px: 2, py: 1 }} key={tab.value} {...tab} />
                            ))}
                        </Tabs>
                    )}
                </Box>
                <Stack p={1} direction="row" justifyContent="space-between" alignItems="center" gap={1}>
                    <Box>
                        {searchBox && (
                            <TextField
                                value={handler.getMeta('searchText', '')}
                                placeholder="Search..."
                                size="small"
                                InputProps={{
                                    sx: { bgcolor: 'background.paper', border: 0 },
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchRoundedIcon />
                                        </InputAdornment>
                                    )
                                }}
                                onChange={(e: any) => {
                                    handler.setMeta('searchText', e.target.value);
                                    if (handler.onSearch) {
                                        handler.onSearch(e.target.value);
                                    }
                                    if (handler.onStateChange) {
                                        handler.onStateChange();
                                    }
                                }}
                            />
                        )}
                    </Box>
                    <Box>
                        {filterMenu && (
                            <IconButton
                                onClick={(e: any) => {
                                    if (filterMenu) {
                                        Dropdown.show(e.currentTarget, filterMenu as any, {
                                            popperOptions: {
                                                placement: 'bottom-start'
                                            }
                                        });
                                    }
                                }}
                            >
                                <FilterAltOutlinedIcon />
                            </IconButton>
                        )}
                    </Box>
                </Stack>
            </Stack>
            <NavbarInfo {...props} />
        </Box>
    );
};

export default withStore(Navbar);
