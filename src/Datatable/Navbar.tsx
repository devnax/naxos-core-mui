import React from 'react'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab, { TabProps } from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { DataTableProps } from './types'
import NavbarInfo from './NavbarInfo'
import Dropdown from '../Dropdown'
import IconButton from '@mui/material/IconButton'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { withStore } from 'state-range'
import Handler from './Handler'

const Navbar = (props: DataTableProps) => {
   const { id, tabs, hideSearchbar, filterMenu: FilterMenuView } = props

   return (
      <Box
         mb={1}
      >
         <Stack
            justifyContent="space-between"
            alignItems="center"
            direction={{ xs: "column", md: "row" }}
         >
            <Box flex={1} p={1}>
               {
                  tabs && <Tabs value={Handler.metaState(id, null, 'currentTab') || tabs[0].value} onChange={(_e, currentTab) => {
                     Handler.metaState(id, { currentTab }, 'currentTab')
                  }}>
                     {
                        tabs.map((tab: TabProps) => <Tab key={tab.value} {...tab} />)
                     }
                  </Tabs>
               }
            </Box>
            <Stack
               p={1}
               direction="row"
               justifyContent="space-between"
               alignItems="center"
               gap={1}
            >
               <Box>
                  {
                     hideSearchbar !== true && <TextField
                        value={Handler.metaState(id, null, 'searchText') || ''}
                        placeholder='Search...'
                        size="small"
                        InputProps={{
                           startAdornment: <InputAdornment position='start'>
                              <SearchRoundedIcon />
                           </InputAdornment>
                        }}
                        onChange={(e: any) => {
                           Handler.metaState(id, {
                              searchText: e.target.value
                           })
                           if (props.onSearch) {
                              props.onSearch(e.target.value)
                           }
                        }}
                     />
                  }
               </Box>
               <Box>
                  {
                     FilterMenuView && <IconButton
                        onClick={(e: any) => {
                           if (FilterMenuView) {
                              Dropdown.show(e.currentTarget, <FilterMenuView />, {
                                 placement: "bottom-start"
                              })
                           }
                        }}
                     >
                        <FilterAltOutlinedIcon />
                     </IconButton>
                  }
               </Box>
            </Stack>
         </Stack>
         <NavbarInfo {...props} />
      </Box>
   )
}

export default withStore(Navbar, ({ id, hideSearchbar }: any) => {
   return [hideSearchbar, Handler.metaState(id, null, 'searchText'), Handler.metaState(id, null, 'currentTab')]
})