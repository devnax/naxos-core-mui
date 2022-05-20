import Handler from './Handler';
import { NotificationProps, NotificationSettingProps } from './types';
export * from './types';

interface PublicHandlerInterface {
    settings: (options?: NotificationSettingProps) => NotificationSettingProps;
    create: (options: NotificationProps) => void;
    remove: (id: string) => void;
    removeAll: () => void;
    open: Function;
    close: Function;
    read: (id: string | number) => void;
    unread: (id: string | number) => void;
    readAll: Function;
    loading: (is: boolean) => void;
    isLoading: () => boolean;
}

const PublicNotificatonHandler: PublicHandlerInterface = {
    settings: Handler.settings.bind(Handler),
    create: Handler.create.bind(Handler),
    remove: Handler.remove.bind(Handler),
    removeAll: Handler.removeAll.bind(Handler),
    open: Handler.open.bind(Handler),
    close: Handler.close.bind(Handler),
    read: Handler.read.bind(Handler),
    unread: Handler.unread.bind(Handler),
    readAll: Handler.readAll.bind(Handler),
    loading: Handler.loading.bind(Handler),
    isLoading: Handler.isLoading.bind(Handler)
};

export default PublicNotificatonHandler;
