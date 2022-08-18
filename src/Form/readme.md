
## Avatar
```js 
type Props = StackProps & {
   name: string;
   size?: number;
   icon?: ReactElement;
   editIcon?: boolean | ReactElement;
   value?: File;
   variant?: AvatarProps['variant'];
   onClick?: (e: SyntheticEvent) => void;
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean
}

<Avatar 
   {...Props}
/>
```



## Checkbox
```js 
type Props = Omit<CheckboxProps, 'form'> & {
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean
   label?: string;
   name: string;
   title?: string;
   value: string;
   defaultValue?: string | string[];
   items?: Item[]; // add more items state: {name: [a,b,c]}
   vertical?: boolean
}

<Checkbox 
   {...Props}
/>
```



## Radio
```js 
type Props = Omit<RadioProps, 'form'> & {
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean
   label?: string;
   name: string;
   title?: string;
   value: string | number;
   defaultValue?: string | number;
   items?: Item[];
   vertical?: boolean
}

<Radio 
   {...Props}
/>
```



## Select
```js 
type Props = AutocompleteProps & {
   label?: string;
   require?: boolean;
   name: string;
   options: SelectItemProps[];
   defaultValue?: SelectItemProps['value'] | (SelectItemProps['value'])[];
   form?: FormTypes<any>;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean;
   hide?: boolean;
   inputProps?: TextFieldProps
}

<Select 
   {...Props}
/>
```


## Textbox
```js 
type Props = TP & {
   form?: FormTypes<any>;
   name: string;
   defaultValue?: TP['value'];
   require?: true;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean
}

<TextBox  
   {...Props}
/>
```


## DatePicker
```js 

export type DatePickerProps = DesktopDatePickerProps & {
   form?: FormTypes<any>;
   name: string;
   defaultValue?: string;
   require?: true;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean;
}

<DatePicker  
   {...Props}
/>
```

## TimePicker
```js 

export type TimePickerProps = TimePicker & {
   form?: FormTypes<any>;
   name: string;
   defaultValue?: string;
   require?: true;
   schema?: (s: any) => typeof SchemaFactory;
   disableError?: boolean;
}

<TimePicker  
   {...Props}
/>
```



## Editor
```js 

export interface EditorProps extends SunEditorProps {
   name: string;
   form?: FormTypes<any>;
   defaultValue?: string;
   value?: string;
   onChange?: (content: string) => void;
}

<Editor  
   {...EditorProps}
/>
```



## useForm

```js

const form = useForm({
   onChange: () => {
      
   },
   onError: () => {

   }
})


form.set(name, value) => void;
form.get(name, def) => Fields[T] | void;
form.setState(fields) => void;
form.getState() => Fields;
form.delete(name) => void;
form.deleteAll() => void;

form.setError(name, msg: string) => void;
form.getError(name) => string | false;
form.getErrors() => ErrorState
form.removeError(name) => void;
form.removeErrors() => void;
form.setSchema(schema: typeof SchemaFactory) => void;
form.validate() => void;
form.loading(is?: boolean) => boolean;
form.isLoading() => boolean;

```