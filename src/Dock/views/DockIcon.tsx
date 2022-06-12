import React, { FC } from 'react'
import { DockIconProps } from "../types";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'


const DockIcon: FC<DockIconProps> = ({ id, active, icon, onClick }) => {
   return (
      <Stack
         onClick={() => onClick && onClick(id)}
         alignItems="center"
         justifyContent="center"
         p={.4}
         height={48}
         sx={{
            cursor: 'pointer',
            transition: 'all .2s',
            transform: active ? "scale(1)!important" : "",
            '&:hover': {
               transform: "scale(1.1)"
            },

            '& svg': {
               fontSize: 35,
               width: 40
            },

            position: 'relative',
            '&::after': {
               content: "''",
               position: 'absolute',
               top: 16,
               left: 0,
               width: 3,
               height: 16,
               bgcolor: "primary.main",
               borderRadius: 1,
               visibility: active ? "visible" : "hidden"
            }
         }}
      >
         <Box
            display="inline-flex"
            justifyContent="center"
            p={.6}
            borderRadius={1}
            height={40}
         >
            {icon}
         </Box>
      </Stack>
   )
}

export default DockIcon