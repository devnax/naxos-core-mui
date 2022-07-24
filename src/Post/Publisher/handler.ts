import { Store } from 'state-range'
import { PublisherProps, State } from './types'

abstract class PostPublisherHandler extends Store<any, PublisherProps> {

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

export default PostPublisherHandler