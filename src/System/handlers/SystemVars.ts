import { Store } from 'state-range';
import { SystemProps } from '../types/SystemVars';
import defaultValues from '../DefaultVars';

class SystemVars extends Store<any, SystemProps> {
    set<T extends keyof SystemProps>(key: T, data: Partial<SystemProps[T]>) {
        const get = this.get(key);
        this.setMeta(key, { ...get, ...data });
    }

    get<T extends keyof SystemProps>(key: T): SystemProps[T] {
        const def = defaultValues[key];
        const data = this.getMeta(key);
        if (data) {
            return data;
        }
        return def;
    }

    observe<T extends keyof SystemProps>(key: T): number {
        const info = this.getMetaInfo(key);
        return info?.observe || 0;
    }

    getAll(): SystemProps | null {
        return this.getAllMeta();
    }
}

export default new SystemVars();
