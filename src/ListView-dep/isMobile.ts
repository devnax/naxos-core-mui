import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default () => {
    const theme = useTheme();
    return useMediaQuery(theme.breakpoints.down('sm'));
};
