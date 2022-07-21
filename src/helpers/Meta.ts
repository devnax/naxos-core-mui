import { Store } from 'state-range';

abstract class System<P = {}> extends Store<any, P> {
   abstract defaults: Partial<P>;

   set<T extends keyof P>(key: T, value: Partial<P[T]>) {
      const get = this.get(key);
      if (get) {
         if (get !== null && typeof get === 'object') {
            this.setMeta(key, { ...get, ...value });
         } else {
            this.setMeta(key, value as any);
         }
      } else {
         this.setMeta(key, value as any);
      }
   }

   get<T extends keyof P>(key: T): P[T] | void {
      const data = this.getMeta(key);
      if (data) {
         return data;
      }
      if (this.defaults[key]) {
         return this.defaults[key];
      }
   }

   observe = this.observeMeta;
   getAll = this.getAllMeta;
}

export default System;
