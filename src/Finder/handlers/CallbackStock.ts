import { noDispatch, Store } from 'state-range';
import { DataProps } from '../types';
import FinderHandler from './FinderHandler';
import Subscriber from './Subscriber';

class NaxOSCoreFinderCallbackStock extends Store {
    add(text: string, subscriberID: string) {
        this.insert({
            text,
            subscriberID
        });
    }

    async fetch() {
        const stocks = this.findAll();
        const exists = FinderHandler.getFoundedData();

        for await (let stock of stocks) {
            const { text, subscriberID, _id }: any = stock;
            const subscriber = Subscriber.getByID(subscriberID);
            if (subscriber) {
                const dataList: DataProps[] = await subscriber.callback(text, FinderHandler.currentPage());
                if (this.findById(_id) && text === FinderHandler.searchText()) {
                    this.delete(_id);
                    if (exists.length && FinderHandler.currentPage() <= 1) {
                        noDispatch(() => {
                            FinderHandler.setFoundedData([]);
                        });
                    }
                    const prevData: any = FinderHandler.getFoundedData();
                    FinderHandler.setFoundedData([...prevData, { subscriberID, dataList }]);
                }
            }
        }
    }

    hasCallback() {
        return this.findAll().length;
    }
}

export default new NaxOSCoreFinderCallbackStock();
