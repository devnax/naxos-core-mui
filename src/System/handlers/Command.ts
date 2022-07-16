import { Store } from 'state-range';
export interface CommandType {
    key: string;
    callback: Function;
}

class NAXOSCommands extends Store<CommandType> {
    create(key: string, callback: Function) {
        if (this.exists(key)) {
            console.error(`${key} command already Exists!`);
            return;
        }
        this.insert({
            key,
            callback
        });
    }

    remove(key: string) {
        this.delete({ key });
    }

    exists(key: string) {
        return this.findFirst({ key }) ? true : false;
    }

    excute(key: string) {
        const cmd = this.findFirst({ key });
        if (!cmd) {
            console.error(`${key} command not found`);
            return;
        }
        if (typeof cmd.callback === 'function') {
            cmd.callback();
        }
    }
}

const handler = new NAXOSCommands();

interface Pub {
    create: (key: string, callback: Function) => void;
    excute: (key: string) => void;
    remove: (key: string) => void;
    exists: (key: string) => void;
}

const PublicHandler: Pub = {
    create: handler.create.bind(handler),
    excute: handler.excute.bind(handler),
    remove: handler.remove.bind(handler),
    exists: handler.exists.bind(handler)
};

export default PublicHandler;
