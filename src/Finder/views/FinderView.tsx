import React from 'react';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import Scrollbar from 'react-browser-scrollbar';
import FoundItem from './FoundItem';
import { isDarkMode } from 'mui-themex';
import { withStore } from 'state-range';
import SearchBox from './SearchBox';
import { DataProps, FoundedData } from '../types';
import FinderHandler from '../handlers/FinderHandler';
import CallbackStock from '../handlers/CallbackStock';
import Subscriber from '../handlers/Subscriber';

const FinderView = () => {
    const foundedItems: any = FinderHandler.getFoundedData();
    const hasCallback = CallbackStock.hasCallback();
    const hasItems = foundedItems.length ? true : false;

    return (
        <Container maxWidth="sm" sx={{ p: 1, display: 'flex' }}>
            <Stack id="FINDER" mt={{ md: 15, sm: 8, xs: 0 }} width="100%" maxHeight="100%" bgcolor="background.paper" boxShadow={15} borderRadius={4}>
                <SearchBox />
                <Scrollbar
                    darkMode={isDarkMode()}
                    style={{ width: '100%', maxHeight: 400, flex: 1 }}
                    onScrollEnd={() => {
                        if (!hasCallback) {
                            FinderHandler.startFinding();
                        }
                    }}
                >
                    {hasItems && (
                        <List sx={{ width: '100%', bgcolor: 'background.paper', p: 1 }}>
                            {foundedItems.map((foundedData: FoundedData) => {
                                const { dataList, subscriberID }: FoundedData = foundedData;
                                const subscriber = Subscriber.getByID(subscriberID);
                                if (!subscriber?.checked) {
                                    return '';
                                }
                                return dataList.map((data: DataProps, idx: number) => <FoundItem key={idx} subscirberID={subscriberID} data={data} index={idx} />);
                            })}
                        </List>
                    )}
                </Scrollbar>
            </Stack>
        </Container>
    );
};

export default withStore(FinderView);
