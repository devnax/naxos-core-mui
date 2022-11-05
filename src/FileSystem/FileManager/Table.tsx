import * as React from 'react';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton'
import CheckBoxIcon from '@mui/icons-material/CheckBoxOutlined';
import { FileIcon, defaultStyles } from 'react-file-icon';

function byteToSize(bytes: any) {
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   if (bytes === 0) return 'n/a';
   var i = parseInt(JSON.stringify(Math.floor(Math.log(bytes) / Math.log(1024))));
   if (i === 0) return bytes + ' ' + sizes[i];
   return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
}


const rows = [
   {
      name: 'index.html',
      size: 90999,
      date: '20, Nov 2022'
   },
   {
      name: 'style.css',
      size: 99099,
      date: '12, Nov 2022'
   },
   {
      name: 'script.ts',
      size: 99909,
      date: '220, Nov 2022'
   },
   {
      name: 'script.js',
      size: 99990,
      date: '20, Nov 2022'
   },
];

export default function BasicTable() {

   const def: any = defaultStyles

   return (
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
         <TableHead>
            <TableRow>
               <TableCell align="left" sx={{ py: .5 }} width={5} >
                  <IconButton color="primary" >
                     <CheckBoxIcon />
                  </IconButton>
               </TableCell>
               <TableCell align="left" sx={{ py: .5 }} >Name</TableCell>
               <TableCell align="left" sx={{ py: .5 }} >Size</TableCell>
               <TableCell align="left" sx={{ py: .5 }} >Date</TableCell>
            </TableRow>
         </TableHead>
         <TableBody>
            {rows.map((row) => {
               const ext = row.name.split('.')[1]

               return (
                  <TableRow
                     key={row.name}
                     selected
                  >
                     <TableCell align="left" sx={{ py: .5 }} width={5} >
                        <IconButton color="primary" >
                           <CheckBoxIcon />
                        </IconButton>
                     </TableCell>
                     <TableCell align="left" sx={{ py: .5 }} >
                        <Stack
                           direction="row"
                           spacing={1}
                           alignItems="center"
                        >
                           <Stack width={25}>
                              <FileIcon extension={ext} {...def[ext]} />
                           </Stack>
                           <Stack>
                              {row.name}
                           </Stack>
                        </Stack>
                     </TableCell>
                     <TableCell align="left" sx={{ py: .5 }} >{byteToSize(row.size)}</TableCell>
                     <TableCell align="left" sx={{ py: .5 }} >{row.date}</TableCell>
                  </TableRow>
               )
            })}
         </TableBody>
      </Table>
   );
}
