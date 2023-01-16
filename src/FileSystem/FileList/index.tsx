import React from 'react'
import { withStore } from 'state-range';
import Handler from '../FileSystem';
import GridItem from './ListItem';
import Stack from '@mui/material/Stack'
import { FileItemProps } from '../types'
import { DropdownArrayType } from '../../Dropdown/types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import { DataTableView } from '../../DataTable';
import FileListDatableHandler from './ListHandler'


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
         <Stack >
            <DataTableView
               handler={FileListDatableHandler}
            />

         </Stack>
      </div>
   )
}

export default withStore(FileGrid, ({ bucketId }: FileGridProps) => {
   const files = Handler.find({ bucketId, uploading: false });
   return [files];
});
