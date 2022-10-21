import { Store } from 'state-range';
import { SystemProps } from '../types/SystemVars';
import defaultValues from '../DefaultVars';
import { uid } from 'tiny-utils';
import { isServer } from '../../utils';

abstract class System<P = {}> extends Store<any, SystemProps & P> {
    abstract defaults: Partial<SystemProps & P>;

    constructor() {
        super();
        if (!isServer) {
            const id = uid();
            const style = document.createElement('style');
            style.id = id;
            style.innerHTML = `
            body [data-fullheight] {
                height: ${window.innerHeight}px;
            }
        `;
            if (!document.getElementById(`${id}`)) {
                document.head.append(style);
            }
            window.addEventListener('resize', () => {
                style.innerHTML = `
                body [data-fullheight] {
                    height: ${window.innerHeight}px;
                }
            `;
            });
        }
    }

    set<T extends keyof (SystemProps & P)>(key: T, value: Partial<(SystemProps & P)[T]>) {
        const get = this.get(key);
        if (get) {
            if (typeof get === 'object') {
                this.setMeta(key, { ...get, ...value });
            } else {
                this.setMeta(key, value as any);
            }
        } else {
            this.setMeta(key, value as any);
        }
    }

    get<T extends keyof (SystemProps & P)>(key: T): (SystemProps & P)[T] | void {
        const data = this.getMeta(key);
        if (data) {
            return data;
        }
        const defaults: any = { ...defaultValues, ...this.defaults };
        if (defaults[key]) {
            return defaults[key];
        }
    }

    observe = this.observeMeta;
    getAll = this.getAllMeta;
}

export default System;
