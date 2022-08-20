import React, { FC } from 'react';
import Box from '@mui/material/Box';
import DockIcon from './DockIcon';
import Dropdown from '../../Dropdown';
import { DockProps } from '../types';
import Tooltip from '@mui/material/Tooltip';
import AppHandler from '../../Apps';
import { withStore } from 'state-range';

interface Props extends DockProps {
    renderFooter?: boolean;
}

const AppsRender: FC<Props> = (props) => {
    const { appsType, appsBottomType, placement, active, tooltip, onAppContextMenu, onAppClick, renderFooter, size } = props;

    const isTooltip = tooltip !== false;

    let _placement: any = 'right';
    switch (placement) {
        case 'right':
            _placement = 'left';
            break;
        case 'top':
            _placement = 'top';
            break;
        case 'bottom':
            _placement = 'top';
            break;
    }

    let appItems;

    if (renderFooter && appsBottomType) {
        appItems = AppHandler.getApps(appsBottomType);
    } else if (!renderFooter) {
        appItems = AppHandler.getApps(appsType);
    }

    let _size = 50;
    if (size === 'medium') {
        _size = 55;
    } else if (size === 'large') {
        _size = 60;
    }

    return (
        <>
            {appItems?.map((app) => {
                if (app) {
                    const Icon = (
                        <DockIcon
                            size={_size}
                            placement={placement}
                            {...app}
                            active={app.id === active}
                            buttonProps={{
                                onClick: () => {
                                    onAppClick && onAppClick(app.id);
                                },
                                onContextMenu: (e: any) => {
                                    if (typeof onAppContextMenu === 'function') {
                                        const menu = onAppContextMenu(app.id);
                                        if (menu) {
                                            e.preventDefault();
                                            Dropdown.showContextMenu(e, menu, {
                                                boxProps: {
                                                    sx: {
                                                        '& .MuiListItem-button': {
                                                            p: 0.4,
                                                            px: 1.5,
                                                            '&>div': { m: 0 }
                                                        }
                                                    }
                                                }
                                            });
                                        }
                                    }
                                }
                            }}
                        />
                    );

                    return (
                        <Box key={app.id}>
                            {isTooltip ? (
                                <Tooltip
                                    placement={_placement}
                                    title={app.name}
                                    arrow
                                    PopperProps={{
                                        sx: {
                                            userSelect: 'none'
                                        }
                                    }}
                                >
                                    <Box>{Icon}</Box>
                                </Tooltip>
                            ) : (
                                Icon
                            )}
                        </Box>
                    );
                }
                return '';
            })}
        </>
    );
};

export default withStore(AppsRender);
