import { useId, useMemo, useState } from 'react';

const timers: any = {};

type callbackType = () => Promise<void>;
type ReturnType = [boolean, (callback: callbackType) => void];

export default (miliseconds = 400): ReturnType => {
    const [state, setState] = useState<any>(null);
    const id = useId();
    return useMemo(() => {
        const rcb = (callback: callbackType) => {
            clearInterval(timers[id]);
            if (state === null || !state) {
                setState(true);
            }
            timers[id] = setTimeout(async () => {
                await callback();
                setState(false);
            }, miliseconds);
        };

        return [state ? true : false, rcb];
    }, [state, miliseconds]);
};
