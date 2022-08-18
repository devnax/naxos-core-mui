import React, { useState, useMemo } from 'react';

import { useForm } from '../../../Form/useForm';
import TextField from '../../../Form/TextField';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import General from './General';

import IconButton from '@mui/material/IconButton';
import EditSlugIcon from '@mui/icons-material/ModeEditOutlineRounded';
import { CompProps, PublisherProps } from '../types';
import Loader from '../../../Loader';
import Typography from '@mui/material/Typography';

const slugify = (str: string) =>
    str
        .toLowerCase()
        .trim()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '');

const Slug = ({ form }: CompProps) => {
    // const formState = form.getState() || {}
    const formData = form.getData() || {};

    const [edit, setEdit] = useState(false);
    return useMemo(
        () =>
            !formData?.slug && !edit ? (
                <></>
            ) : (
                <Stack direction="row" spacing={1} alignItems="center" mt={0.3}>
                    {edit ? (
                        <TextField
                            form={form}
                            name="slug"
                            fullWidth
                            variant="standard"
                            size="small"
                            autoFocus
                            spellCheck={false}
                            inputProps={{
                                sx: { p: 0.3 }
                            }}
                            onKeyDown={(e: any) => {
                                if (e.keyCode === 13) {
                                    setEdit(false);
                                    // form.setState({ ...formState, slugEdited: true })
                                }
                            }}
                            onBlur={() => {
                                setEdit(false);
                                // form.setState({ ...formState, slugEdited: true })
                            }}
                        />
                    ) : (
                        <>
                            <Link href="#">{slugify(formData?.slug)}</Link>
                            <IconButton
                                size="small"
                                onClick={() => {
                                    setEdit(true);
                                }}
                            >
                                <EditSlugIcon sx={{ fontSize: 13 }} />
                            </IconButton>
                        </>
                    )}
                </Stack>
            ),
        [edit, formData.slug]
    );
};

const PostPublisher = (props: PublisherProps) => {
    const form = useForm();

    const { loading, title, hidePublish, editMode, onDraft, onPublish, onTabChange, containerProps } = props;

    let tabs = props.tabs;
    if (tabs && tabs.length) {
        tabs = [
            {
                title: 'General',
                content: <General form={form} props={props} />
            },
            ...tabs
        ];
    }

    const formState = form.getState() || {};

    return (
        <Loader loading={loading as any}>
            {!hidePublish && (
                <Stack spacing={1} direction="row" justifyContent="space-between" mb={2} position="sticky" top={0} zIndex={1} bgcolor="background.default" p={1}>
                    <Box>
                        {title && (
                            <Typography sx={{ userSelect: 'none', opacity: 0.7 }} variant="h4">
                                {title}
                            </Typography>
                        )}
                    </Box>
                    <Stack direction="row" gap={2} alignItems="center">
                        <Button variant="text" onClick={() => onDraft && onDraft(form.getState() as any)}>
                            Save To Draft
                        </Button>
                        <Button variant="contained" onClick={() => onPublish && onPublish(form.getState() as any)}>
                            {editMode ? 'UPDATE' : 'PUBLISH'}
                        </Button>
                    </Stack>
                </Stack>
            )}
            <Stack flex={1} gap={2} {...containerProps}>
                <Box>
                    <TextField
                        form={form}
                        name="title"
                        fullWidth
                        inputProps={{
                            sx: {
                                fontSize: 30,
                                fontWeight: 600,
                                p: 0.5,
                                px: 1
                            }
                        }}
                        placeholder="Enter title"
                    />
                    <Slug form={form} props={props} />
                    {tabs && (
                        <Tabs
                            sx={{ mt: 1 }}
                            variant="scrollable"
                            scrollButtons="auto"
                            value={formState.activeTab || 'General'}
                            onChange={(_e, t) => {
                                onTabChange && onTabChange(t);
                                form.setState({
                                    ...form.getState(),
                                    activeTab: t
                                });
                            }}
                        >
                            {tabs.map((tab) => {
                                return <Tab key={tab.title} label={tab.title} value={tab.title} sx={{ p: 0, fontWeight: 500 }} />;
                            })}
                        </Tabs>
                    )}
                </Box>
                <Box>
                    {!tabs && <General form={form} props={props} />}
                    {tabs &&
                        tabs.map((tab) => {
                            if (tab.title === (formState.activeTab || 'General')) {
                                return <div key={tab.title + '_view'}>{tab.content}</div>;
                            }
                        })}
                </Box>
            </Stack>
        </Loader>
    );
};

export default PostPublisher;
