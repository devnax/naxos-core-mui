import React from 'react';
import { withStore } from 'state-range';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Setting from '../Handler';
import Scrollbar from 'react-browser-scrollbar';
import { isDarkMode } from 'mui-themex';

const CategoryView = () => {
    const categories = Setting.getCategoryList();
    const isDark = isDarkMode();

    return (
        <Scrollbar style={{ display: 'flex', alignItems: 'center' }}>
            <Container>
                <Grid container spacing={2} p={1}>
                    {categories.map(({ category, categoryIcon }: any, idx: number) => {
                        return (
                            <Grid data-category key={idx} item xs={4} sm={3} md={3} lg={2.4}>
                                <Stack
                                    sx={{
                                        alignItems: 'center',
                                        p: 3,
                                        borderRadius: 2,
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        '&:hover': {
                                            bgcolor: isDark ? 'rgba(0,0,0,.08)' : 'rgba(0,0,0,.03)'
                                        }
                                    }}
                                    onClick={() => Setting.viewCategory(category)}
                                >
                                    <Box
                                        mb={1}
                                        sx={{
                                            '& img': {
                                                width: {
                                                    xs: 55,
                                                    sm: 65
                                                }
                                            }
                                        }}
                                    >
                                        {categoryIcon}
                                    </Box>
                                    <Typography variant="body2">{category}</Typography>
                                </Stack>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </Scrollbar>
    );
};

export default withStore(CategoryView);
