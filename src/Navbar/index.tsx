import React, { FC, ReactElement } from 'react';
import Grid, { GridProps } from '@mui/material/Grid';

export type NavbarProps = GridProps & {
    logo?: ReactElement;
    icons?: ReactElement;
    logoProps?: GridProps;
    iconsProps?: GridProps;
    containerProps?: GridProps;
};

const Navbar: FC<NavbarProps> = ({ children, logo, icons, logoProps, iconsProps, containerProps, ...props }) => {
    return (
        <Grid container bgcolor="background.paper" minHeight={55} alignItems="center" justifyContent="center" p={{ xs: 0.5, md: 0 }} {...props}>
            {logo && (
                <Grid
                    item
                    order={1}
                    justifyContent="flex-start"
                    display="flex"
                    xs={6}
                    flex={{
                        md: 0
                    }}
                    {...logoProps}
                >
                    {logo}
                </Grid>
            )}
            <Grid
                item
                display="flex"
                justifyContent="center"
                order={{
                    xs: 3,
                    md: 2
                }}
                xs={12}
                flex={{
                    md: 1
                }}
                {...containerProps}
            >
                {children}
            </Grid>
            {icons && (
                <Grid
                    item
                    order={2}
                    justifyContent="flex-end"
                    display="flex"
                    xs={6}
                    flex={{
                        md: 0
                    }}
                    {...iconsProps}
                >
                    {icons}
                </Grid>
            )}
        </Grid>
    );
};

export default Navbar;
