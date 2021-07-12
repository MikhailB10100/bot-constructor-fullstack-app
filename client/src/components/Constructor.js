import React, {useState, useContext} from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";

const LoginForm = () => {
  const {store} = useContext(Context)

  return (
    <div>Hello, world!</div>
  )
}

export default observer(LoginForm)
