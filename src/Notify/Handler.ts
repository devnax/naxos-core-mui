import { Store } from 'state-range';
import { NotifyProps } from './types';

class NotifyHandler extends Store {
    show(options: NotifyProps) {
        if (options.title) {
            const { _id }: any = this.insert({
                location: 'bottom-right',
                ...options
            });

            this.startTime(_id);
        }
    }

    pauseTime(_id: string) {
        const item = this.findById(_id);
        if (item.autoHide === undefined || item.autoHide) {
            if (typeof item?.timer === 'number') {
                return clearInterval(item.timer);
            }
            this.update({ timer: false }, _id);
        }
    }

    startTime(_id: string) {
        const item = this.findById(_id);
        let timer: any = false;
        if (item.autoHide === undefined || item.autoHide === true) {
            this.pauseTime(_id);
            timer = setTimeout(() => {
                this.delete(_id);
            }, 6000);
        }
        this.update({ timer }, _id);
    }

    hide(_id: string) {
        this.pauseTime(_id);
        this.delete(_id);
    }

    hideAll() {
        this.deleteAll();
    }
}

const Handler = new NotifyHandler();

export default Handler;

interface PublicInterface {
    show: (options: NotifyProps) => void;
    hide: (_id: string) => void;
    hideAll: Function;
}
export const PublicNotifyHandler: PublicInterface = {
    show: Handler.show.bind(Handler),
    hide: Handler.hide.bind(Handler),
    hideAll: Handler.hideAll.bind(Handler)
};
