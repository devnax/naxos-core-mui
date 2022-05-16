import React from "react"
import Stack from "@mui/material/Stack"
import { withStore } from "state-range"
import { AnimatePresence } from "framer-motion"
import Scrollbar from 'react-browser-scrollbar'
import { isDarkMode } from 'mui-themex'
import Handler, { PublicNotifyHandler } from './Handler'
import NotifyItem from './views/NotifyItem'
import { NotifyRowProps } from './types'
import { AnimationType } from 'fmotion-variants'

export * from './types'
export default PublicNotifyHandler



interface RenderProps {
   items: NotifyRowProps[];
   animation: AnimationType;
}

const NotifyRender = ({ items, animation }: RenderProps) => {
   return (
      <Scrollbar thumbSize={.1} darkMode={isDarkMode()} style={{ overflowX: "hidden" }}>
         <Stack spacing={1.5} p={1}>
            <AnimatePresence>
               {items.map((notify: any) => <NotifyItem {...notify} animation={animation} key={notify._id} />)}
            </AnimatePresence>
         </Stack>
      </Scrollbar>
   )
}


const _NotifyView = () => {

   const topLeft = Handler.find({ location: "top-left" })
   const topCenter = Handler.find({ location: "top-center" })
   const topRight = Handler.find({ location: "top-right" })
   const bottomLeft = Handler.find({ location: "bottom-left" })
   const bottomCenter = Handler.find({ location: "bottom-center" })
   const bottomRight = Handler.find({ location: "bottom-right" })

   const props = {
      zIndex: 2000,
      position: "fixed",
      maxHeight: '100%'
   }

   return (
      <>
         <Stack top={0} left={0} sx={props}>
            <NotifyRender items={topLeft} animation="fadeInLeft" />
         </Stack>

         <Stack top={0} left={'50%'} sx={{ transform: 'translateX(-50%)', ...props }}>
            <NotifyRender items={topCenter} animation="fadeInUp" />
         </Stack>

         <Stack top={0} right={0} sx={props}>
            <NotifyRender items={topRight} animation="fadeInRight" />
         </Stack>

         <Stack bottom={0} left={0} sx={props}>
            <NotifyRender items={bottomLeft} animation="fadeInLeft" />
         </Stack>

         <Stack bottom={0} left={'50%'} sx={{ transform: 'translateX(-50%)', ...props }}>
            <NotifyRender items={bottomCenter} animation="fadeInDown" />
         </Stack>

         <Stack bottom={0} right={0} sx={props}>
            <NotifyRender items={bottomRight} animation="fadeInRight" />
         </Stack>
      </>
   )
}

export const NotifyView = withStore(_NotifyView, () => [Handler.observeStoreData()])