import React from 'react';
import Screen from '../../Screen';
import { ScreenProps } from '../../Screen/types';
import { withMemo } from 'state-range';

const ScreenView = (props: ScreenProps) => {
    return <Screen {...props} />;
};

export default withMemo(ScreenView, (props: ScreenProps) => {
    return [Object.values(props)];
});
