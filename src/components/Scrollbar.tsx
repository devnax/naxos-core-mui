import BrowserScrollbar from "react-browser-scrollbar"
import { isDarkMode } from "mui-themex"
import React, { ReactElement, ReactNode, UIEvent, HTMLAttributes } from "react"

type DivProps = HTMLAttributes<HTMLDivElement>
interface Props extends DivProps {
   children: ReactElement | ReactNode;
   autoHide?: boolean;
   thumbSize?: number;
   onScrollEnd?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStop?: (e: UIEvent<HTMLDivElement>) => void;
   onScrollStart?: (e: UIEvent<HTMLDivElement>) => void;
}

const Scrollbar = ({ children, ...props }: Props) => {
   return (
      <BrowserScrollbar darkMode={isDarkMode()} {...props}>
         {children}
      </BrowserScrollbar>
   )
}

export default Scrollbar