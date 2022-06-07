import Scrollbar from "react-browser-scrollbar"
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

const ScrollbarView = ({ children, ...props }: Props) => {
   return (
      <Scrollbar darkMode={isDarkMode()} {...props}>
         {children}
      </Scrollbar>
   )
}

export default ScrollbarView