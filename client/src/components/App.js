import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";
import LoginForm from './LoginForm';
import Constructor from './Constructor';

const App = () => {
  const {store} = useContext(Context)
  let body
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  if (store.isLoading) {
    body = <div>Loading...</div>
  } else if (!store.isAuth) {
    body = <LoginForm />
  } else {
    body = <Constructor />
  }

  return body
}

export default observer(App)
