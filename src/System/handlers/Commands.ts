import { Store } from 'state-range';
import { CommandsType, CommandOptionType } from '../types/CommandTypes';

class NAXOSCommands extends Store<CommandsType> {
    disableMultipleName = true;

    create(name: string, options: CommandOptionType) {
        if (this.exists(name)) {
            throw new Error(`${name} command already Exists!`);
        }
        this.insert({
            name,
            options
        });
    }

    remove(name: string) {
        this.delete({ name });
    }

    exists(name: string, key?: string) {
        const cmd = this.findFirst(name);
        if (cmd) {
            if (key) {
                if (typeof cmd.options[key] === 'function') {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

    excute(name: string, key: string) {
        const cmd = this.findFirst(name);
        if (!cmd) {
            return;
        }
        const callback = cmd.options[key];
        if (typeof callback === 'function') {
            callback();
        }
    }

    printLog(key: string, text: string) {
        const logs = this.getMeta('__COMMAND_LOGS__', {});
        logs[key] = text;
        this.setMeta('__COMMAND_LOGS__', logs);
    }

    clearLogs() {
        this.deleteMeta('__COMMAND_LOGS__');
    }
}

export default NAXOSCommands
