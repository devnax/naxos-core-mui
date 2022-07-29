import { assert } from "console"
import React from "react"

const password = define('password', ({ value, args }) => {
   const schema = string().min(10).max(50).noSpecialChar()
   blast(schema, value)
   if (value) {

   }
})

const noSpecalChar = define('no_special_char', ({ value, args }) => {

})

object({
   password: password()
})


const Input = ({ state, name, ...props }) => {
   return (
      <div>
         <input
            name={name}
            value={state.get(name, '')}
            onChange={(e) => {
               state.set(name, e.target.value)
            }}
            onBlur={() => state.removeErrr(name)}
            {...props}
         />
         <p>{state.getError(name)}</p>
      </div>
   )
}


const withValidex = (Comp) => {
   return ({ name, value }) => {
      return <Comp />
   }
}

const TextBox = withValidex(({ value, name }) => <input value={value} name={name} />)

const Form = ({ form }) => {
   return <form>
      <Input
         form={form}
         name="name"
         max={20}
         min={10}
         enums={["a", 'b']}
      />
      <Input form={form} name="email" />
      <Input form={form} name="password" />
      <TextBox
         form={form}
         uid="userform.age"
         name="age"
         value={form.get('age')}
         max={20}
         min={10}
         enums={["a", 'b']}
      />
      <button
         onClick={() => {
            const { name, email, password } = form.getState()
            assert({ name, email, password }, {

            })
         }}
      >Submit</button>
   </form>
}



export default withForm(Form, {
   onChange: (state) => {

   },
   onError: () => {

   },
   observable: true
})