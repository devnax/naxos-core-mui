import React, { FC, ReactElement, ReactNode } from 'react'
import Stack, { StackProps } from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = StackProps & {
   children: ReactElement | ReactNode;
   title?: string | ReactElement;
   expandable?: boolean;

}

const General: FC<Props> = ({ children, title, expandable, ...rest }) => {

   expandable = expandable === undefined || expandable;

   const disableExpand: any = {}
   if (!expandable) {
      disableExpand.expanded = true
   }

   return (
      <Stack
         spacing={.1}
         bgcolor="background.paper"
         borderRadius={2}
         {...rest}
      >
         <Accordion
            sx={{ background: 'transparent', backgroundImage: "none" }}
            defaultExpanded
            {...disableExpand}
         >
            <AccordionSummary
               expandIcon={expandable ? <ExpandMoreIcon /> : ''}
               sx={{ cursor: expandable ? "pointer" : "initial!important" }}
            >
               <Typography>{title}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "transparent" }}>
               {children}
            </AccordionDetails>
         </Accordion>
      </Stack>
   );
}


export default General