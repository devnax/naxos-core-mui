import FinderHandler from './handlers/FinderHandler'
import Subscriber from './handlers/Subscriber';
import {FinderSettingProps, SubcriberProps} from './types'
export * from './types'

import FinderView from './views/FinderView'
export {FinderView}

interface FinderPublicHandler{
   subcribe: (options: SubcriberProps) => void;
   unsubcribe: (id: string) => void;
   open: (options?: FinderSettingProps) => void;
   close: () => void;
   settings: (options?: FinderSettingProps) => FinderSettingProps;
}


const FinderPublicHandler: FinderPublicHandler = {
   subcribe: Subscriber.add.bind(Subscriber),
   unsubcribe: Subscriber.remove.bind(Subscriber),
   open: FinderHandler.open.bind(FinderHandler),
   close: FinderHandler.close.bind(FinderHandler),
   settings: FinderHandler.settings.bind(FinderHandler),
}

export default FinderPublicHandler