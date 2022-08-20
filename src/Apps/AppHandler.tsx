import { Store } from 'state-range';
import { AppProps, AppPropsStore } from './types';
import { Command } from '../System';

class NaxOSApp extends Store<AppPropsStore> {
    default_type = 'os';

    create(options: AppProps) {
        if (!this.getById(options.id)) {
            if (options.commands) {
                for (let cmd of options.commands) {
                    Command.create(`${options.id}.${cmd.key}`, cmd.callback);
                }
            }

            this.insert({
                type: this.default_type,
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

    getApps(type = this.default_type) {
        return this.find({ type });
    }

    searchApp(name: string, type = this.default_type) {
        return this.find(`@where type='${type}' && name like ^${name}`);
    }
}

export default new NaxOSApp();
