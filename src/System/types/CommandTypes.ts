

export interface CommandsType {
   name: string;
   options: CommandOptionType;
}


export interface CommandOptionType {
   [key: string]: Function
}