import { Store } from 'state-range'
import { SystemProps } from './types'
import defaultValues from './default'

class System extends Store {
   setVar<T extends keyof SystemProps>(key: T, data: Partial<SystemProps[T]>) {
      const get = this.getVar(key) || {}
      this.setMeta('SYSTEM_VARS', { ...this.getVars(), [key]: { ...get, ...data } })
   }

   getVar<T extends keyof SystemProps>(key: T): SystemProps[T] {
      const vars = this.getMeta("SYSTEM_VARS", { ...defaultValues })
      return vars[key]
   }

   getVars(): SystemProps {
      return this.getMeta("SYSTEM_VARS", { ...defaultValues })
   }
}

export default new System()