import { Store } from 'state-range'
import { FileProps } from './types'

class OSFileManagerHandler extends Store<FileProps> {
   constructor() {
      super()
   }

   createFile(props: Partial<FileProps>) {
      this.insert({
         file: null,
         progress: 0,
         uploading: false,
         selected: false,
         error: false,
         name: "",
         size: 0,
         url: null,
         date: "",
         ...props
      })
   }

   getPandingFiles() {
      return this.find({ uploading: true })
   }
}

export default new OSFileManagerHandler