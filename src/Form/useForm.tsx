import { useEffect, useState, useId, useMemo } from 'react';
import { object, SchemaFactory, watch } from '../Validex';

export interface FormTypes<Fields> {
    Factory: Factory<Fields>;
    state: { [key: string]: any };
    data: Fields;
    errors: ErrorState<Fields>;

    setState: (state: { [key: string]: any }) => void;
    getState: (key?: string | number) => { [key: string]: any };

    set: <T extends keyof Fields>(name: T, value: Fields[T]) => void;
    get: <T extends keyof Fields>(name: T, def?: Fields[T]) => Fields[T] | void;
    getData: () => Fields;
    delete: <T extends keyof Fields>(name: T) => void;
    deleteAll: () => void;

    setError: <T extends keyof Fields>(name: T, msg: string) => void;
    getError: <T extends keyof Fields>(name: T) => string | false;
    getErrors: () => ErrorState<Fields>;
    removeError: <T extends keyof Fields>(name: T) => void;
    removeErrors: () => void;
    setSchema: <T extends keyof Fields>(name: T, schema: typeof SchemaFactory) => void;
    validate: () => boolean;
    loading: (is?: boolean) => void;
    isLoading: () => boolean;
    observe: () => Observe;
}

interface Observe {
    state: number;
    data: number;
    schema: number;
    error: number;
}

export interface DefaultProps<Fields> {
    form?: FormTypes<Fields>;
}

export interface ConfigsState<Fields> {
    onChange?: (state: Fields) => void;
    onError?: (errorState: ErrorState<Fields>) => void;
}

type SchemaObject<Fields> = { [field in keyof Fields]: typeof SchemaFactory };

type ErrorState<Fields> = {
    [key in keyof Partial<Fields>]: string;
};

type SchemaState<Fields> = {
    [key in keyof Partial<Fields>]: SchemaObject<Fields>;
};

interface Factory<Fields> {
    state: { [key: string]: any };
    data: Fields;
    errors: ErrorState<Fields>;
    schema: SchemaState<Fields>;
    configs: ConfigsState<Fields>;
    dispatch: Function;
    loading: boolean;
    observe: Observe;
}

export const useForm = <Fields extends {}>(configs?: ConfigsState<Fields>) => {
    const id = useId();
    let [, dispatch] = useState(0);
    const Factory = useMemo(() => {
        const RootState: { [uid: string]: Factory<Fields> } = {};
        if (!RootState[id]) {
            RootState[id] = {
                state: {},
                data: {} as any,
                errors: {} as any,
                schema: {} as any,
                configs: configs || {},
                loading: false,
                observe: {
                    state: 0,
                    error: 0,
                    data: 0,
                    schema: 0
                },
                dispatch: () => {
                    const r = Math.random();
                    dispatch(r);
                }
            };
        }
        return RootState[id];
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // const { onChange, onError } = configs || {}

    useEffect(() => {
        Factory.configs.onChange && Factory.configs.onChange(Factory.data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Factory.data]);

    useEffect(() => {
        Factory.configs.onError && Factory.configs.onError(Factory.errors);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Factory.errors]);

    const form: FormTypes<Fields> = {
        Factory,
        state: Factory.state,
        data: Factory.data,
        errors: Factory.errors,
        observe: () => Factory.observe,
        setState: (state: { [key: string]: any }) => {
            Factory.state = state;
            Factory.observe.state = Math.random();
            Factory.dispatch();
        },
        getState: (key?: string | number) => {
            if (key) {
                return Factory.state[key];
            }
            return Factory.state;
        },
        set: <T extends keyof Fields>(name: T, value: Fields[T]) => {
            Factory.data = {
                ...Factory.data,
                [name]: value
            };
            Factory.observe.data = Math.random();
            Factory.dispatch();
        },
        get: <T extends keyof Fields>(name: T, def?: Fields[T]): Fields[T] | void => {
            if (Factory.data[name]) {
                return Factory.data[name];
            }
            return def;
        },
        getData: () => Factory.data,
        delete: <T extends keyof Fields>(name: T) => {
            if (Factory.data[name]) {
                delete Factory.data[name];
                Factory.observe.data = Math.random();
                Factory.dispatch();
            }
        },
        deleteAll: () => {
            Factory.data = {} as any;
            Factory.observe.data = Math.random();
            Factory.dispatch();
        },
        setError: <T extends keyof Fields>(name: T, msg: string) => {
            Factory.errors[name] = msg;
            Factory.observe.error = Math.random();
            Factory.dispatch();
        },
        getError: <T extends keyof Fields>(name: T) => {
            return Factory.errors[name] || false;
        },
        getErrors: () => {
            return Factory.errors;
        },
        removeError: <T extends keyof ErrorState<Fields>>(name: T) => {
            if (Factory.errors[name]) {
                delete Factory.errors[name];
                Factory.observe.error = Math.random();
                Factory.dispatch();
            }
        },
        removeErrors: () => {
            Factory.errors = {} as any;
            Factory.observe.error = Math.random();
            Factory.dispatch();
        },
        setSchema: <T extends keyof Fields>(name: T, _schema: SchemaObject<Fields>) => {
            Factory.schema[name] = _schema;
            Factory.observe.schema = Math.random();
            Factory.dispatch();
        },
        validate: () => {
            const fields: (keyof Fields)[] = Object.keys(Factory.schema) as any;

            if (fields.length) {
                const value: any = {};
                for (let field of fields) {
                    if (Factory.data.hasOwnProperty(field)) {
                        value[field] = Factory.data[field];
                    } else {
                        value[field] = undefined;
                    }
                }

                const err = watch(object(Factory.schema), value);

                if (err) {
                    Factory.errors = err.error;
                    Factory.dispatch();
                } else {
                    Factory.errors = {} as any;
                    Factory.dispatch();
                    return true;
                }
            }
            return false;
        },

        loading: (is?: boolean) => {
            Factory.loading = is === undefined ? true : false;
            Factory.dispatch();
        },
        isLoading: () => Factory.loading
    };
    return form;
};
