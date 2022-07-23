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
      const onStateChange = this.getMeta("onStateChange")
      const newState = {
         ...this.getMeta("state"),
         ...state
      }
      this.setMeta("state", newState)
      if (onStateChange) {
         onStateChange(newState)
      }
   }
}

export default new PostPublisherHandler