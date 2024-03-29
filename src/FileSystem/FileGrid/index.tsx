import React from 'react'
import { withStore } from 'state-range';
import Handler from '../FileSystem';
import GridItem from './GridItem';
import Stack from '@mui/material/Stack'
import { FileItemProps } from '../types'
import { DropdownArrayType } from '../../Dropdown/types';

export interface FileGridProps {
   bucketId?: string;
   onContextMenu?: (file: FileItemProps) => DropdownArrayType[];
   onClick?: (file: FileItemProps) => void;
   fileWidth?: number;
   fileHeight?: number;
   fileNameLength?: number;
   onFileRender?: (file: FileItemProps) => boolean;
}



const FileGrid = (props: FileGridProps) => {
   const { bucketId, onFileRender } = props
   const files = Handler.getFiles(bucketId);

   return (
      <div>
         <Stack direction="row" p={2} flexWrap="wrap">
            {
               files.map(file => {
                  if (onFileRender) {
                     const is = onFileRender(file)
                     if (!is) {
                        return ''
                     }
                  }

                  return <GridItem
                     key={file._id}
                     {...props}
                     file={file}
                  />
               })
            }
         </Stack>
      </div>
   )
}

export default withStore(FileGrid, ({ bucketId }: FileGridProps) => {
   const files = Handler.find({ bucketId, uploading: false });
   return [files];
});
