import { Store } from 'state-range';
import { AppProps, AppPropsStore } from './types';

class NaxOSApp extends Store<AppPropsStore> {
    create(options: AppProps) {
        if (!this.getById(options.id)) {
            this.insert({
                type: 'os',
                ...options
            });
        } else {
            throw new Error(`${options.id} App ID Already Exists!`);
        }
    }

    remove(id: string) {
        this.delete({ id });
    }

    getById(id: string) {
        return this.findFirst({ id });
    }

    getApps(type = 'os') {
        return this.find({ type });
    }

    searchApp(name: string, type = 'os') {
        return this.find(`@where type='${type}' && name like ^${name}`);
    }
}

export default new NaxOSApp();
