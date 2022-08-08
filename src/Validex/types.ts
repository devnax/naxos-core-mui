export type Defines = { [id: string]: Callback }
export type Callback = (arg: { value: any, args: any[], field: string }) => false | void;