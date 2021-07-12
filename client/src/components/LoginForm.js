import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {store} = useContext(Context)

  const createInput = (value, fn, field, type='text') => {
    return <input 
          onChange={e => fn(e.target.value)}
          value={value}
          type={type}
          placeholder={field}
        />
  }

  return (
    <div>
        {createInput(username, setUsername, 'Username')}
        {createInput(password, setPassword, 'Password', 'password')}
        <button onClick={() => store.login(username, password)}>Login</button>
        <button onClick={() => store.registration(username, password)}>Registration</button>
    </div>
  )
}

export default observer(LoginForm)
