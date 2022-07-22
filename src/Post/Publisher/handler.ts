import { Store } from 'state-range'
import { PublisherProps, State } from './types'

class PostPublisherHandler extends Store<any, PublisherProps> {

   default: PublisherProps = {

   }

   loadProps(props: PublisherProps) {
      for (let key in props) {
         const ele = (props as any)[key]
         this.setMeta(key as any, ele)
      }
   }

   setState(state: State) {
      this.setMeta("state", {
         ...this.getMeta("state"),
         ...state
      })
   }
}

export default new PostPublisherHandler