import React, { FC, ReactElement, ReactNode } from 'react';
import Typography from '@mui/material/Typography';
import Accordion, { AccordionProps } from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

type Props = AccordionProps & {
    children: ReactElement | ReactNode;
    title?: string | ReactElement;
    expandable?: boolean;
};

const MetaBox: FC<Props> = ({ children, title, expandable, ...rest }) => {
    expandable = expandable === undefined || expandable;

    if (!expandable) {
        (rest as any).expanded = true;
    }

    return (
        <Accordion
            defaultExpanded
            {...rest}
            sx={{
                background: 'background.paper',
                backgroundImage: 'none',
                boxShadow: 0,
                borderRadius: '8px!important',
                ...(rest.sx || {})
            }}
        >
            <AccordionSummary
                expandIcon={expandable ? <ExpandMoreIcon /> : ''}
                sx={{
                    cursor: expandable ? 'pointer' : 'initial!important',
                    minHeight: '40px!important',
                    '& > div': {
                        m: '0!important'
                    }
                }}
            >
                <Typography fontSize={15} fontWeight={500}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>{children}</AccordionDetails>
        </Accordion>
    );
};

export default MetaBox;
