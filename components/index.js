import React, { useEffect } from 'react';
import operations from '../store/fetch'
import { observer } from 'mobx-react'
import { Navigator } from './loginNavigation'
import { BottomNavigator } from './bottomNavigation.js'
import { WaitingModal } from './loader'


export const Index = observer(() => {
  const { token, uuid } = operations

  async function tryLogin() {
    await operations.getUUIDFromStorage()
    await operations.getTokenFromStorage()
  }
  async function getUser() {
    await operations.getUserInfo()
  }

  useEffect(() => {
    tryLogin()
  }, [])

  useEffect(() => {
    if (token, uuid) getUser()
  }, [token, uuid])

  return (
    <>
      {(token && uuid) ? <BottomNavigator /> : <Navigator />}
      <WaitingModal />
    </>
  )
})
