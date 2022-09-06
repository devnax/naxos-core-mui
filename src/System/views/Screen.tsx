import React from 'react';
import Screen from '../../Screen';
import { ScreenProps } from '../../Screen/types';
import { withMemo } from 'state-range';

const ScreenView = withMemo(
    (props: ScreenProps) => {
        return <Screen {...props} />;
    },
    (props: ScreenProps) => [Object.values(props)]
);

export default ScreenView;
