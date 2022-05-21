import { Store } from 'state-range';
import { SubcriberProps } from '../types';

class NaxOSCoreFinderSubscriber extends Store {
    add(options: SubcriberProps) {
        if (!this.getByID(options.id)) {
            this.insert({
                ...options,
                checked: true
            });
        }
    }

    remove(id: string) {
        this.delete({ id });
    }

    getByID(id: string) {
        return this.findFirst({ id });
    }
}

export default new NaxOSCoreFinderSubscriber();
