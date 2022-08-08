export const isFunction = (val: any) => typeof val === 'function'
export const isArray = (val: any) => typeof val === 'object' && Array.isArray(val)
export const isObject = (val: any) => typeof val === 'object' && val !== null && !Array.isArray(val)
export const isString = (val: any) => typeof val === 'string'
export const isNumber = (val: any) => !isNaN(val)
export const isInteger = (val: any) => typeof val === 'number'
export const isBool = (val: any) => typeof val === 'boolean'
export const isNull = (val: any) => val === null