import { define, watch, SchemaFactory, blast } from "./Factory";
import { isArray, isNull, isInteger, isObject, isString, isNumber, isBool, isFunction } from './utils'


//===== DEFINE DATA TYPES
export const boolean = define('boolean', ({ value, field }) => {
   if (!isBool(value)) {
      throw new Error(`${field} expect 'boolean' but got '${typeof value}'`);
   }
})

export const object = define('object', ({ value, args, field }) => {
   if (!isObject(value)) {
      throw new Error(`${field} expect 'object' but got '${typeof value}'`);
   }
   if (!args.length) {
      return
   }
   let errors: any = false
   for (let field in value) {
      if (!args[0].hasOwnProperty(field)) {
         throw new Error(`missing field '${field}'`)
      }
      const factory = args[0][field]
      const ErrorHandler = watch(factory, value[field])
      if (ErrorHandler) {
         errors = { ...errors, [field]: ErrorHandler.error }
      }
   }

   if (errors) {
      throw errors
   }
})


export const string = define('string', ({ value, field }) => {
   if (!isString(value)) {
      throw new Error(`${field} expect 'string' but got '${typeof value}'`);
   }
})


export const array = define('array', ({ value, args, field }) => {
   if (!isArray(value)) {
      throw new Error(`${field} expect 'array' but got '${typeof value}'`);
   }

   if (args.length && !(args[0] instanceof SchemaFactory)) {
      throw new Error(`${field} expect an 'array' argument with instance of 'SchemaFactory'`)
   } else if (args.length) {
      for (let item of value) {
         const err = watch(args[0], item)
         if (err) {
            throw new Error(err.message);
         }
      }
   }
})

export const number = define('number', ({ value, field }) => {
   const err = watch(string(), value)
   if (err) {
      throw new Error(err.message);
   }
   if (!isNumber(value)) {
      throw new Error(`${field} expect 'number' but got '${value}'`);
   }
})

export const integer = define('integer', ({ value }) => {
   if (!isInteger(value)) {
      throw new Error(`expect 'integer' but got '${typeof value}'`);
   }
})


export const nullable = define('nullable', ({ value }) => {
   if (!isNull(value)) {
      return false
   }
})


export const func = define('func', ({ value, field }) => {
   if (!isFunction(value)) {
      throw new Error(`${field} expect a 'function' but got '${value}'`);
   }
})


//==== FORMATATING 
export const any = define('any', () => { })

export const optional = define('optional', ({ value }) => {
   if (!value) {
      return false
   }
})

export const required = define('required', ({ value, field }) => {
   if (!value) {
      throw new Error(`${field || "value"} required`);

   }
})

export const enums = define('enums', ({ value, args, field }) => {
   if (!args.length) {
      throw new Error(`'enums' expect an array argumant with value`)
   }
   if (!args[0].includes(value)) {
      throw new Error(`${field} expect [${args[0].join(' | ')}] but got ${typeof value}`);
   }
})

export const union = define('union', ({ value, args, field }) => {
   if (!args.length) {
      throw new Error(`'union' expect an array argumant with value`)
   }

   let error = true
   let names: string[] = []
   for (let schema of args[0]) {
      if (!(schema instanceof SchemaFactory)) {
         throw new Error(`union item must be instance of SchemaFactory`)
      }
      const err = watch(schema, value)
      names.push(schema.name)
      if (!err) {
         error = false
      }
   }

   if (error) {
      throw new Error(`${field} expect [${names.join(' | ')}] but got ${typeof value}`);
   }
})

export const min = define('min', ({ value, args, field }) => {
   if (!args.length) {
      throw new Error(`'min' expect argument 1 but got 0`)
   }
   if (!(isString(value) || isArray(value) || isInteger(value))) {
      throw new Error(`'min' expect 'string | array | number' value but got ${typeof value}`)
   }
   if (isInteger(value) && value < args[0]) {
      throw new Error(`${field} minimum of ${args[0]} but got ${value}`);
   } else if (value.length < args[0]) {
      throw new Error(`${field} minimum length of ${args[0]} but got ${value.length}`);
   }
})

export const max = define('max', ({ value, args, field }) => {
   if (!args.length) {
      throw new Error(`'max' expect argument 1 but got 0`)
   }
   if (!(isString(value) || isArray(value) || isInteger(value))) {
      throw new Error(`'max' expect 'string | array | number' value but got ${typeof value}`)
   }

   if (isInteger(value) && value > args[0]) {
      throw new Error(`${field} maximum of ${args[0]} but got ${value}`);
   } else if (value.length > args[0]) {
      throw new Error(`${field} maximum length of ${args[0]} but got ${value.length}`);
   }
})


export const instanceOf = define('instanceOf', ({ value, args, field }) => {
   if (!args.length) {
      throw new Error(`'instanceOf' expect argument 1 but got 0`)
   }
   if (!(value instanceof args[0])) {
      throw new Error(`${field} "${value}" must be instanceof ${args[0]}`);
   }
})

export const url = define('url', ({ value, field }) => {
   try {
      blast(string(), value)
      const url = new URL(value);
      const isValid = url.protocol === "http:" || url.protocol === "https:"
      if (!isValid) {
         throw null;
      }
   } catch (_) {
      throw new Error(`${field} expect valid url but got "${value}"`);
   }
})

export const email = define('email', ({ value, field }) => {
   try {
      blast(required().field(field), value)
      const valid = value.toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      if (valid === null) {
         throw new Error(`${field} expect valid email but got "${value}"`)
      }
   } catch (err: any) {
      throw new Error(err.message);
   }
})

export const date = define('date', ({ value, field }) => {
   try {
      blast(union([instanceOf(Date), string()]), value)
      const valid = !Number.isNaN(new Date(value).valueOf())
      if (!valid) {
         throw new Error(`${field} invalid date`)
      }
   } catch (err: any) {
      throw new Error(err.message);
   }
})
