import React from 'react'
import { Redirect, Stack } from 'expo-router'

const index = () => {
  return (
    <>
    <Stack.Screen
    options={{
      headerShown: false,
    }} />
      <Redirect href={'/Home'} ></Redirect>
      </>
  )
}

export default index