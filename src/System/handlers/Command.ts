import { Store } from 'state-range';

export interface CommandType {
    key: string;
    callback: commandCallback;
}

export type excuteArgs = { [k: string]: any };
export type commandCallback = (args?: excuteArgs) => void;

class NAXOSCommands extends Store<CommandType> {
    create(key: string, callback: commandCallback) {
        if (this.has(key)) {
            console.error(`${key} command already Exists!`);
            return;
        }
        this.insert({
            key,
            callback
        });
    }

    excute(key: string, args?: excuteArgs) {
        const cmd = this.findFirst({ key });
        if (!cmd) {
            console.error(`${key} command not found`);
            return;
        }
        if (typeof cmd.callback === 'function') {
            cmd.callback(args);
        }
    }

    remove(key: string) {
        this.delete({ key });
    }

    has(key: string) {
        return this.findFirst({ key }) ? true : false;
    }
}

const handler = new NAXOSCommands();

interface Pub {
    create: (key: string, callback: commandCallback) => void;
    excute: (key: string, args?: excuteArgs) => void;
    remove: (key: string) => void;
    has: (key: string) => void;
}

const Command: Pub = {
    create: handler.create.bind(handler),
    excute: handler.excute.bind(handler),
    remove: handler.remove.bind(handler),
    has: handler.has.bind(handler)
};

export default Command;
