import { ReactElement } from 'react';
import { CardMediaProps } from '@mui/material/CardMedia';
import { TypographyProps } from '@mui/material/Typography';
import { StackProps } from '@mui/material/Stack';

export type CardProps = StackProps & {
    image?: string | ReactElement;
    imageEffect?: 'zoom' | 'rotate' | false;
    imagePadded?: true;
    imageSize?: string | number;

    title?: string | ReactElement;
    content?: string | ReactElement;

    contentMaxLength?: number;
    contentHideOnMobile?: boolean;

    imageProps?: CardMediaProps;
    titleProps?: Partial<TypographyProps>;
    contentProps?: Partial<TypographyProps>;

    inline?: boolean;
    footer?: ReactElement;
    hoverShadow?: boolean;
    bordered?: boolean;
};
