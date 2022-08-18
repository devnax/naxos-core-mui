import React from 'react'
import { ThumbnailProps } from './types'
import urlParser from "js-video-url-parser";

const EmbedPreview = ({ value, type, height, width }: ThumbnailProps) => {
   if (!value || type === 'image') return <></>
   const parse: any = urlParser.parse(value)

   if (!parse) {
      return <video
         controls
         src={value}
         style={{
            width,
            height,
         }}
      />
   }

   const url = urlParser.create({
      videoInfo: parse,
      format: "embed"
   })

   return (
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden" }}>
         <iframe
            style={{
               width: "100%",
               height: "100%",
               position: "absolute",
               left: 0,
               top: 0,
               overflow: "hidden"
            }}
            frameBorder="0"
            width="100%"
            allowFullScreen
            src={url}

         ></iframe>
      </div>
   )
}

export default EmbedPreview