import React, { useEffect, useRef } from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Card from './AuthCard';
import { useForm } from '../Form/useForm';
import ArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import IconButton from '@mui/material/IconButton';
import TextField, { TextFieldProps } from '../Form/TextField';
import { alpha } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import Loader from "../Loader"


interface FormData {
    username: string;
    password: string;
}


export interface onSubmitArgs {
    type: "username" | "password",
    value: string
}

export interface LoginFormProps {
    onSubmit?: (args: onSubmitArgs) => Promise<void>;
    usernameInputProps?: TextFieldProps;
    passwordInputProps?: TextFieldProps;
    defaultUsername?: string;
    defaultPassword?: string;
    image?: string;
    title?: string;
}


const Login = (props: LoginFormProps) => {
    const form = useForm<FormData>();
    const { step } = form.getState()
    const { username, password } = form.getData()
    const containerRef = useRef<any>()
    const isLoading = form.isLoading()
    const {
        onSubmit,
        defaultUsername,
        defaultPassword,
        image,
        title,
        usernameInputProps,
        passwordInputProps
    } = props

    useEffect(() => {
        if (defaultUsername) {
            form.set("username", defaultUsername)
            form.setState({ step: "password" })
        }
        if (defaultPassword) {
            form.set("password", defaultPassword)
            defaultUsername && form.setState({ step: "password" })
        }
    }, [])

    const submit = async () => {
        if (form.validate() && onSubmit) {
            form.loading()
            let args: onSubmitArgs = {
                type: "username",
                value: username
            }
            if (step === 'password') {
                args = {
                    type: "password",
                    value: password
                }
            }
            await onSubmit(args)
            form.loading(false)
        }
    }


    return (
        <Stack spacing={5} width={350} >
            <Card
                image={image}
                title={title || "Login"}
            />
            <Stack direction="row" spacing={1}>
                <Box py={1}>
                    <Zoom in={step === 'password'}>
                        <IconButton
                            disabled={isLoading}
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.common.white, 0.04),
                            }}
                            onClick={() => form.setState({ step: "" })}
                        >
                            <ArrowLeftIcon />
                        </IconButton>
                    </Zoom>
                </Box>
                <Stack flex={1} p={1} overflow="hidden" ref={containerRef}>
                    <Box>
                        <Loader loading={isLoading} progressProps={{ size: 20 }}>
                            {
                                step !== 'password' && <TextField
                                    autoFocus
                                    name="username"
                                    form={form}
                                    placeholder="Username"
                                    disabled={isLoading}
                                    schema={s => s.required().max(100)}
                                    helperText=""
                                    {...usernameInputProps}
                                    inputProps={{
                                        sx: { height: 40, py: 0, textAlign: "center", }
                                    }}
                                    onKeyDown={async (e) => {
                                        if (e.keyCode === 13) {
                                            username && form.setState({ step: "password" })
                                            await submit()
                                        }
                                        usernameInputProps?.onKeyDown && usernameInputProps.onKeyDown(e)
                                    }}
                                />
                            }
                            {
                                step === 'password' && <TextField
                                    autoFocus
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    disabled={isLoading}
                                    form={form}
                                    schema={s => s.required().max(100)}
                                    helperText=""
                                    {...passwordInputProps}
                                    inputProps={{
                                        sx: { textAlign: "center", fontSize: password ? 25 : 15, height: 40, py: 0 }
                                    }}
                                    onKeyDown={async (e) => {
                                        if (e.keyCode === 13) {
                                            await submit()
                                        }
                                        passwordInputProps?.onKeyDown && passwordInputProps.onKeyDown(e)
                                    }}
                                />
                            }
                        </Loader>
                    </Box>
                </Stack>
                <Box py={1}>
                    <Zoom in={!!username}>
                        <IconButton
                            disabled={isLoading}
                            sx={{
                                bgcolor: (theme) => alpha(theme.palette.common.white, 0.04),
                            }}
                            onClick={async () => {
                                username && form.setState({ step: "password" })
                                await submit()
                            }}
                        >
                            <ArrowRightIcon />
                        </IconButton>
                    </Zoom>

                </Box>
            </Stack>
        </Stack >
    );
};

export default Login;
