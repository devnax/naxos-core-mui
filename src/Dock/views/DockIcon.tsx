import React, { FC } from 'react'
import { DockIconProps } from "../types";
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'


const DockIcon: FC<DockIconProps> = ({ id, active, icon, onClick, placement }) => {

   let activeStyle: any = {
      top: 16,
      left: 0,
      width: 3,
      height: 18,
   }
   const isHorigental = placement === "bottom" || placement === "top"

   switch (placement) {
      case "right":
         activeStyle = {
            top: 16,
            right: 0,
            width: 3,
            height: 18,
         }
         break;
      case "top":
         activeStyle = {
            top: 0,
            left: 16,
            width: 18,
            height: 3,
         }
         break;
      case "bottom":
         activeStyle = {
            bottom: 0,
            left: 16,
            width: 18,
            height: 3,
         }
         break;
   }


   return (
      <Stack
         onClick={() => onClick && onClick(id)}
         alignItems="center"
         justifyContent="center"
         height={50}
         width={50}
         sx={{
            cursor: 'pointer',
            transition: 'all .2s',
            transform: active ? "scale(1)!important" : "",
            '&:hover': {
               transform: "scale(1.1)"
            },
            position: 'relative',
            '&::after': {
               content: "''",
               position: 'absolute',
               bgcolor: "primary.main",
               borderRadius: 1,
               visibility: active ? "visible" : "hidden",
               ...activeStyle
            }
         }}
      >
         <Button
            // display="inline-flex"
            // justifyContent="center"
            // p={.6}
            // borderRadius={1}
            // height={40}
            sx={{
               p: 0,
               borderRadius: 0,
               m: 0,
               width: 50,
               height: isHorigental ? 50 : 45,
               '& svg': {
                  fontSize: 35,
                  width: 28
               }
            }}
         >
            {icon}
         </Button>
      </Stack>
   )
}

export default DockIcon