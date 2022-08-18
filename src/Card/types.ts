import { ReactElement } from 'react';
import { CardMediaProps } from '@mui/material/CardMedia';
import { TypographyProps } from '@mui/material/Typography';
import { CardProps as CProps } from '@mui/material/Card';

export type CardProps = CProps & {
    image?: string | ReactElement;
    imageEffect?: 'zoom' | 'rotate' | false;
    imagePadded?: true;
    imageHeight?: string | number;

    title?: string | ReactElement;
    content?: string | ReactElement;

    contentMaxLength?: number;
    contentHideOnMobile?: boolean;

    imageProps?: CardMediaProps;
    titleProps?: Partial<TypographyProps>;
    contentProps?: Partial<TypographyProps>;

    footer?: ReactElement;
    hoverShadow?: boolean;
};
