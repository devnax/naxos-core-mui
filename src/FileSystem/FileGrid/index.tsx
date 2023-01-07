import React from 'react'
import { withStore } from 'state-range';
import Handler from '../Handler';
import { FileGridProps } from '../types'
import GridItem from './GridItem';
import Stack from '@mui/material/Stack'

const FileGrid = (props: FileGridProps) => {
   const { bucketId } = props
   const files = Handler.getFiles(bucketId);

   return (
      <div>
         <Stack direction="row" p={2} flexWrap="wrap">
            {
               files.map(file => <GridItem
                  key={file._id}
                  {...props}
                  file={file}
               />)
            }
         </Stack>
      </div>
   )
}

export default withStore(FileGrid, ({ bucketId }: FileGridProps) => {
   const files = Handler.find({ bucketId, uploading: false });
   return [files];
});
