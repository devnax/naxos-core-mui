import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardProps } from './types'


const CardView: React.FC<CardProps> = (props) => {
   let {
      image,
      imageEffect,
      imagePadded,
      title,
      content,
      contentMaxLength,
      footer,
      hoverShadow,

      imageProps,
      titleProps,
      contentProps,
      ...CardProps
   } = props

   if (contentMaxLength && typeof content === 'string') {
      const dot = content.length > contentMaxLength ? "..." : ""
      content = content.substring(0, contentMaxLength) + dot
   }

   imageEffect = imageEffect !== undefined ? imageEffect : "zoom"
   let transform = ''
   if (imageEffect === 'rotate') {
      transform = 'scale(1.2) rotate(5deg)'
   } else if (imageEffect === 'zoom') {
      transform = 'scale(1.1)'
   }

   return (
      <Card
         variant="outlined"
         {...CardProps}
         sx={{
            borderRadius: '8px',
            '&:hover img.MuiCardMedia-media': {
               transform
            },
            '&:hover': {
               boxShadow: hoverShadow ? 7 : 0
            },
            ...(CardProps?.sx || {})
         }}

      >
         {
            image && <Box p={imagePadded ? 1 : 0}>
               {
                  typeof image === 'string' ? <Box sx={{ overflow: "hidden", borderRadius: imagePadded ? "8px" : 0 }} >
                     <CardMedia
                        component="img"
                        height="180"
                        image={image}
                        alt={title || ""}
                        {...imageProps as any}
                        sx={{ transition: "transform .4s", ...(imageProps?.sx || {}) }}
                     />
                  </Box> : image
               }
            </Box>
         }

         <CardContent>
            {
               title && <Typography
                  gutterBottom
                  variant="h5"
                  component="h2"
                  {...titleProps as any}
                  sx={{ height: 50, overflow: "hidden", ...(titleProps?.sx || {}) }}
               >{title}</Typography>
            }
            {
               content && <Typography
                  fontSize={16}
                  sx={{ opacity: .9, ...(contentProps?.sx || {}) }}
                  {...contentProps}>{content}</Typography>
            }
         </CardContent>
         <CardActions sx={{ alignItems: "center" }}>
            {footer}
         </CardActions>
      </Card>
   );
}



export default CardView