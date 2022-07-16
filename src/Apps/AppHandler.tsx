import { Store } from 'state-range';
import { AppProps, AppPropsStore } from './types';
import { Command } from '../System';

class NaxOSApp extends Store<AppPropsStore> {
    create(options: AppProps) {
        if (!this.getById(options.id)) {
            if (options.commands) {
                for (let cmd of options.commands) {
                    Command.create(`${options.id}.${cmd.key}`, cmd.callback);
                }
            }

            this.insert({
                type: 'os',
                ...options
            });
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
