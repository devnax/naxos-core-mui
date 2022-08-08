import { Defines, Callback } from "./types"
import { isFunction, isObject, isString } from "./utils"
const defines: Defines = {}


export class ErrorStack {
   error: any = null

   private getErrorMessage(object: { [key: string]: any }): any {
      for (let k in object) {
         if (isObject(object[k])) {
            return this.getErrorMessage(object[k])
         } else {
            return `'${k}' ${object[k]}`
         }
      }
   }
   get message() {
      if (this.error) {
         if (isString(this.error)) {
            return this.error
         } else {
            return this.getErrorMessage(this.error)
         }
      }
      return
   }
}


export const SchemaFactory: any = class SchemaFactory {
   args: { [id: string]: any[] } = {} // {id: args}
   name: string = ''
}

export const defined = (id: string) => defines[id] ? true : false

export const define = (id: string, callback: Callback) => {
   if (defines[id]) {
      throw new Error(`${id} already assigned`)
   }
   if (typeof callback !== 'function') {
      throw new Error(`callback must be a function`)
   }
   defines[id] = callback
   SchemaFactory.prototype[id] = function (...args: any) {
      this.args[id] = args
      return this
   }
   return (...args: any) => {
      const f = new SchemaFactory
      f.args[id] = args
      f.name = id
      return f
   }
}

define('catch', () => { })
define('field', () => { })

export const watch = (Factory: typeof SchemaFactory, value: any) => {
   if (Factory instanceof SchemaFactory) {
      const errStack = new ErrorStack
      const schema = Factory.args
      let _catch = schema['catch']
      let _field = schema['field']


      for (let id in schema) {
         if (id === 'catch' || id === 'field') {
            continue
         }
         const cb = defines[id]
         const args = schema[id]
         try {
            const next = cb({ value, args, field: _field && _field[0] })
            if (next === false) {
               break;
            }
         } catch (err: any) {
            if (err instanceof Error) {
               errStack.error = err.message
            } else if (isObject(err)) {
               errStack.error = err
            }
            break;
         }
      }
      if (errStack.error) {
         if (_catch) {
            _catch = _catch[0]
            try {
               if (isString(_catch)) {
                  errStack.error = _catch
               } else if (isFunction(_catch)) {
                  errStack.error = _catch(errStack)
               }
            } catch (err) {
               if (err instanceof Error) {
                  errStack.error = err.message
               } else if (isObject(err)) {
                  errStack.error = err
               }
            }
         }
         return errStack
      }
   } else {
      throw new Error(`Schema must be instanceof SchemaFactory`)
   }
}

export const blast = (Factory: typeof SchemaFactory, value: any) => {
   const err = watch(Factory, value)
   if (err) {
      throw err
   }
}