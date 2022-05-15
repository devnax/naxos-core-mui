import React from 'react'
import {Store} from 'state-range'
import Layer from '../Layer'
import NotificationView from './views/NotificationView'
import {NotificationProps, NotificationSettingProps} from './types'
import { isFunction } from 'tiny-utils'
import Notify from '../Notify'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


class Handler extends Store{

   create(options: NotificationProps){
      if(!options.id){
         throw new Error("property (id) required for the notification");
      }
      const data = this.findFirst({id: options.id})
      if(!data){
         if(options.notify){
            Notify.show({
               title: options.title,
               content: options.content,
               icon: <NotificationsActiveIcon />,
               onClick: ({_id}) => {
                  this.open()
                  Notify.hide(_id)
               }
            })
         }
         this.insert({
            ...options,
            read: false
         })
      }
   }
   
   remove(id: string | number){
      const data = this.findFirst({id})
      if(data){
         if(isFunction(data.onDelete)){
            data.onDelete(data)
         }
         this.delete({id})
      }
   }

   removeAll(){
      this.deleteAll()
   }

   read(id: string | number){
      const data = this.findFirst({id})
      if(data){
         if(isFunction(data.onRead)){
            data.onRead(data)
         }
         this.update({read: true}, {id})
      }
   }

   unread(id: string | number){
      const data = this.findFirst({id})
      if(data){
         if(isFunction(data.onUnRead)){
            data.onUnRead(data)
         }
         this.update({read: false}, {id})
      }
   }

   readAll(){
      const unreads = this.find({read: false})
      for(let data of unreads){
         this.read(data.id)
      }
   }

   open(){
      Layer.open('__NOTIFICATION__', <NotificationView />, {
         closeButton: false,
         opacity: .6,
         blur: 2,
         animation: 'fadeInRight'
      })
   }

   close(){
      Layer.close()
   }

   settings(options?: NotificationSettingProps): NotificationSettingProps{
      if(options){
         let settings = this.getMeta('settings', {})
         settings = {...settings, ...options}
         this.setMeta('settings', settings)
      }
      return this.getMeta('settings', {})
   }

   loading(is = true){
      this.setMeta('loading', is)
   }

   isLoading(): boolean {
      return this.getMeta('loading', false)
   }
}

export default new Handler()