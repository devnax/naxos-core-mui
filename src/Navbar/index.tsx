import React, { FC, ReactElement } from 'react';
import Stack, { StackProps } from '@mui/material/Stack';
import Button, { ButtonProps } from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/MenuRounded';
import Drawer from '../Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export type MenuItemProps = Omit<ButtonProps, 'children'> & {
    label: string | ReactElement;
};

export type NavbarProps = StackProps & {
    leftContent?: ReactElement;
    rightContent?: ReactElement;
    menuItems?: MenuItemProps[];
    logo?: string | ReactElement;
    disableMobileMenu?: boolean;
    mobileMenuContent?: ReactElement;
    mobileMenuIcon?: ReactElement;
};

const Navbar: FC<NavbarProps> = ({ children, logo, leftContent, rightContent, menuItems, disableMobileMenu, mobileMenuContent, mobileMenuIcon, ...props }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const is_mobile = !disableMobileMenu && useMediaQuery(theme.breakpoints.down('sm'));

    let content: any = menuItems?.map(({ label, ...btnProps }, idx: any) => (
        <Button
            key={idx}
            sx={{
                color: isDark ? '#fff' : '#222',
                opacity: 0.9
            }}
            {...btnProps}
        >
            {label}
        </Button>
    ));

    if (is_mobile) {
        content = <></>;
    }

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" bgcolor="background.paper" minHeight={50} px={1} {...props}>
            <Stack direction="row" alignItems="center">
                {is_mobile && (
                    <IconButton
                        size="small"
                        onClick={() => {
                            Drawer.open({
                                children: mobileMenuContent || (
                                    <List dense>
                                        {menuItems?.map(({ label, ...btnProps }: any, idx: any) => (
                                            <ListItemButton
                                                key={idx}
                                                sx={{
                                                    borderRadius: 1
                                                }}
                                                {...btnProps}
                                            >
                                                <ListItemText primary={label} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                ),
                                p: 2
                            });
                        }}
                    >
                        {mobileMenuIcon || <MenuIcon />}
                    </IconButton>
                )}

                {typeof logo === 'string' ? <Avatar src={logo} /> : logo}

                {leftContent}
            </Stack>
            <Stack flex={1} direction="row" justifyContent="center" alignItems="center">
                {content || children}
            </Stack>
            {rightContent}
        </Stack>
    );
};

export default Navbar;
