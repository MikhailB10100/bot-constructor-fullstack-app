import React, { useContext, useEffect } from 'react'
import { Context } from '../index'
import { observer } from "mobx-react-lite";

const App = () => {
  const {store} = useContext(Context)
  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.checkAuth()
    }
  }, [])

  return <div className="content">Hello world!</div>
}

export default observer(App)
