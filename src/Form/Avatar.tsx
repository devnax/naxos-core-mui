import React, { ReactElement, SyntheticEvent, useRef } from 'react'
import Badge, { BadgeProps } from '@mui/material/Badge'
import Stack, { StackProps } from '@mui/material/Stack'
import MuiAvatar, { AvatarProps } from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ImageIcon from '@mui/icons-material/PersonAddOutlined';
import { FormTypes } from './useForm'
import { any, isString, SchemaFactory } from '../Validex'
import Link from '@mui/material/Link';

type Props = StackProps & {
   name: string;
   size?: number;
   icon?: ReactElement;
   editIcon?: boolean | ReactElement;
   value?: File | string;
   defaultValue?: File | string;
   variant?: AvatarProps['variant'];
   onClick?: (e: SyntheticEvent) => void;
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean;
   hide?: boolean;
   badgeProps?: BadgeProps
}


const Avatar = ({ name, size, icon, variant, value, editIcon, form, onClick, schema, disableError, defaultValue, hide, badgeProps, ...props }: Props) => {
   const inputRef = useRef<any>()
   let overlap = "circular"
   overlap = variant === "square" || variant === "rounded" ? "rectangular" : overlap
   size = size || 120
   editIcon = editIcon === undefined || editIcon === true

   React.useEffect(() => {
      if (!form?.get(name)) {
         if (defaultValue) {
            form?.set(name, defaultValue)
         } else {
            form?.set(name, null)
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])

   React.useEffect(() => {
      if (schema) {
         form?.setSchema(name, schema(any().field(name)))
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [form?.observe().data])



   value = value || form?.get(name)

   const src = React.useMemo(() => {
      if (value instanceof File) {
         return URL.createObjectURL(value)
      }
      return value
   }, [value])

   if (hide) {
      return <></>
   }

   const error = form?.getError(name)

   return (
      <Tooltip
         title={error || ""}
         open={!disableError && error ? true : false}
         arrow
         onFocus={() => {
            disableError && form?.removeError(name)
         }}
      >
         <Stack alignItems="center" justifyContent="center">
            <Badge
               overlap={overlap as any}
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               sx={{
                  "&:hover button": {
                     visibility: "visible"
                  },
                  userSelect: "none"
               }}
               badgeContent={editIcon === false ? "" : <IconButton
                  onClick={(e: SyntheticEvent) => onClick ? onClick(e) : inputRef?.current?.click()}
                  size="small"
                  sx={{
                     bgcolor: "primary.main",
                     visibility: "visible",
                     p: "3px",
                     '&:hover': {
                        bgcolor: "primary.dark",
                     }
                  }}>
                  {typeof editIcon !== 'boolean' ? editIcon : <EditIcon sx={{ fontSize: 15 }} />}
               </IconButton>}
               {...badgeProps}
            >
               <Stack
                  width={size}
                  height={size}
                  bgcolor="background.default"
                  borderRadius={size}
                  sx={{
                     boxShadow: error ? "0 0 0 5px  #ff0e0e71" : "0 0 0 5px rgba(0,0,0,.2)",
                     cursor: editIcon === false ? "pointer" : 'initial'
                  }}
                  justifyContent="center"
                  alignItems="center"
                  onClick={(e: SyntheticEvent) => {
                     if (editIcon !== true) {
                        onClick ? onClick(e) : inputRef?.current?.click()
                     }
                  }}
                  {...props}
               >
                  {value ? <MuiAvatar
                     src={!isString(src) ? "" : src}
                     sx={{
                        width: size,
                        height: size,
                     }}
                  /> : (icon || <ImageIcon sx={{ fontSize: 40, opacity: .1 }} />)}
               </Stack>
               {
                  !onClick && <input
                     ref={inputRef}
                     hidden
                     accept="image/*"
                     type="file"
                     onChange={(e: any) => {
                        form?.set(name, e.target.files[0])
                     }}
                  />
               }
            </Badge>
            {
               value && <Link mt={.5}
                  fontSize={13}
                  sx={{
                     cursor: 'pointer'
                  }}
                  onClick={() => {
                     form?.set(name, null)
                  }}
               >remove image</Link>
            }
         </Stack>
      </Tooltip>
   )
}

export default Avatar