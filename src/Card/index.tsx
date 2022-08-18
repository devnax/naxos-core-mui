import * as React from 'react';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CardProps } from './types';

const CardView: React.FC<CardProps> = (props) => {
    let {
        image,
        imageEffect,
        imagePadded,
        imageHeight,
        title,
        content,
        contentMaxLength,
        contentHideOnMobile,
        footer,
        hoverShadow,

        imageProps,
        titleProps,
        contentProps,
        bordered,
        ...CardProps
    } = props;

    if (contentMaxLength && typeof content === 'string') {
        const dot = content.length > contentMaxLength ? '...' : '';
        content = content.substring(0, contentMaxLength) + dot;
    }

    imageEffect = imageEffect !== undefined ? imageEffect : 'zoom';
    let transform = '';
    if (imageEffect === 'rotate') {
        transform = 'scale(1.1) rotate(3deg)';
    } else if (imageEffect === 'zoom') {
        transform = 'scale(1.1)';
    }

    if (bordered) {
        CardProps.border = 1
        CardProps.borderColor = "divider"
    }

    return (
        <Stack
            {...CardProps}
            sx={{
                bgcolor: "background.paper",
                borderRadius: '8px',
                transition: "all .3s",
                '&:hover img.MuiCardMedia-media': {
                    transform
                },
                '&:hover': {
                    boxShadow: hoverShadow ? '0 7px 30px -10px rgba(0,0,0,.50)' : 0
                },
                ...(CardProps?.sx || {})
            }}
        >
            {image && (
                <Box p={imagePadded ? 1 : 0}>
                    {typeof image === 'string' ? (
                        <Box sx={{ overflow: 'hidden', borderRadius: imagePadded ? '8px' : 0 }}>
                            <CardMedia
                                component="img"
                                height={imageHeight || '180'}
                                image={image}
                                alt={title || ''}
                                {...(imageProps as any)}
                                sx={{ transition: 'transform .4s', ...(imageProps?.sx || {}) }}
                            />
                        </Box>
                    ) : (
                        image
                    )}
                </Box>
            )}

            <CardContent>
                {title && (
                    <Typography gutterBottom variant="h5" component="h2" {...(titleProps as any)} sx={{ height: 50, overflow: 'hidden', ...(titleProps?.sx || {}) }}>
                        {title}
                    </Typography>
                )}
                {content && (
                    <Typography
                        fontSize={16}
                        sx={{
                            opacity: 0.9,
                            display: {
                                xs: contentHideOnMobile ? 'none' : 'initial',
                                md: 'initial'
                            },
                            ...(contentProps?.sx || {})
                        }}
                        {...contentProps}
                    >
                        {content}
                    </Typography>
                )}
            </CardContent>
            <CardActions sx={{ alignItems: 'center' }}>{footer}</CardActions>
        </Stack>
    );
};

export default CardView;
