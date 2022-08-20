import React, { Fragment, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Scrollbar from 'react-browser-scrollbar';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import { CategoryProps, CategoryType } from './types';
import Dropdown from '../../Dropdown';

export * from './types';

type ChunkItem = CategoryType[];

const chunkArray = (items: CategoryType[], size: number): ChunkItem[] => {
    let chunked = [];
    for (let i = 0; i < items.length; i += size) {
        chunked.push(items.slice(i, i + size));
    }
    return chunked;
};

const Category = ({ name, form, defaultValue, items, onChange, hideSearch, onCreate, perpage }: CategoryProps) => {
    const chunks = useMemo(
        () =>
            chunkArray(
                items.filter((cat) => !cat.parentId),
                perpage || 20
            ),
        [items, perpage]
    );
    const formState = form.getState();
    const page = formState.page || 1;
    const value = form.get(name) || [];
    const createText = formState.createText || '';
    const createParent = formState.createParent || '';

    useEffect(() => {
        if (defaultValue) {
            form.set(name, defaultValue);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Scrollbar style={{ flex: 1, height: 'auto', maxHeight: 200, padding: '0 8px' }}>
                <FormGroup>
                    {(chunks[page - 1] || []).map((category) => {
                        const isChecked = value.includes(category.value) || false;

                        return (
                            <Fragment key={category.value}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            sx={{ p: 0.4 }}
                                            checked={isChecked}
                                            onChange={() => {
                                                let cats = value || [];
                                                if (isChecked) {
                                                    const childs = items.filter((c) => category.value === c.parentId).map((cat) => cat.value);
                                                    cats = cats.filter((value: any) => !(childs.includes(value) || category.value == value));
                                                } else {
                                                    cats.push(category.value);
                                                }
                                                form.set(name, cats);
                                                if (onChange) {
                                                    onChange(cats);
                                                }
                                            }}
                                        />
                                    }
                                    label={category.label}
                                />
                                {isChecked &&
                                    items
                                        .filter((cat) => category.value === cat.parentId)
                                        .map((subcat) => {
                                            const isSubcatChecked = value.includes(subcat.value) || false;
                                            return (
                                                <FormControlLabel
                                                    key={subcat.value}
                                                    sx={{
                                                        pl: 1.5
                                                    }}
                                                    control={
                                                        <Checkbox
                                                            size="small"
                                                            sx={{ p: 0.4 }}
                                                            checked={isSubcatChecked}
                                                            onChange={() => {
                                                                let cats = value || [];
                                                                if (isSubcatChecked) {
                                                                    cats.splice(cats.indexOf(subcat.value), 1);
                                                                } else {
                                                                    cats.push(subcat.value);
                                                                }
                                                                form.set(name, cats);
                                                                if (onChange) {
                                                                    onChange(cats);
                                                                }
                                                            }}
                                                        />
                                                    }
                                                    label={subcat.label}
                                                />
                                            );
                                        })}
                            </Fragment>
                        );
                    })}
                </FormGroup>
            </Scrollbar>
            <Box py={1}>
                <Stack alignItems="flex-end" pb={1}>
                    {chunks.length > 1 && (
                        <Pagination
                            color="primary"
                            count={chunks.length}
                            size="small"
                            hideNextButton
                            hidePrevButton
                            onChange={(_e: any, cpage: number) => {
                                form.setState({ ...form.getState(), page: cpage });
                            }}
                            sx={{
                                '& button': {
                                    minWidth: 20,
                                    height: 20,
                                    fontSize: 13
                                }
                            }}
                        />
                    )}
                </Stack>
                {hideSearch !== false && (
                    <Autocomplete
                        multiple
                        inputValue={formState.searchText || ''}
                        onInputChange={(_e: any, val, resone) => {
                            if (resone === 'input') {
                                form.setState({ ...form.getState(), searchText: val });
                            }
                        }}
                        disableCloseOnSelect
                        options={items || []}
                        getOptionLabel={(option) => option.label}
                        renderOption={(props, option) => (
                            <li
                                {...props}
                                style={{
                                    padding: 0,
                                    paddingLeft: option.parentId ? 10 : 0
                                }}
                            >
                                <Checkbox size="small" sx={{ p: 0.4 }} style={{ marginRight: 8 }} checked={value.includes(option.value)} />
                                {option.label}
                            </li>
                        )}
                        value={[]}
                        onChange={(_e: any, items: any) => {
                            let cats = value || [];
                            if (value.includes(items[0].value)) {
                                cats.splice(cats.indexOf(items[0].value), 1);
                            } else {
                                cats.push(items[0].value);
                            }
                            form.set(name, cats);
                            if (onChange) {
                                onChange(cats);
                            }
                        }}
                        renderInput={(params) => <TextField {...params} placeholder="Search..." size="small" />}
                        sx={{ width: '100%', mb: 2 }}
                    />
                )}

                {onCreate && (
                    <>
                        <TextField
                            value={createText}
                            fullWidth
                            size="small"
                            placeholder="Create"
                            onChange={(e: any) => {
                                form.setState({ ...form.getState(), createText: e.target.value });
                            }}
                            onKeyDown={async (e: any) => {
                                if (e.keyCode === 13 && createText.trim()) {
                                    onCreate({ text: createText, parent: createParent });
                                    form.setState({ ...form.getState(), createText: '' });
                                }
                            }}
                        />
                        <Box sx={{ textAlign: 'right' }}>
                            {createText && (
                                <Link
                                    sx={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={(e: any) => {
                                        const formated: any = [];
                                        for (let cat of items) {
                                            if (!cat.parentId) {
                                                formated.push({
                                                    title: cat.label,
                                                    onClick: () => {
                                                        form.setState({ ...form.getState(), createParent: cat.value });
                                                        Dropdown.hide();
                                                    }
                                                });
                                            }
                                        }
                                        Dropdown.show(e.target, formated, { placement: 'bottom-end' });
                                    }}
                                >
                                    {createParent ? 'PARENT - ' + items.find((c) => c.value === createParent)?.label : 'SELECT PARENT'}
                                </Link>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </>
    );
};

export default Category;
