"use client"
import React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '@/components/custom/Header'
import { MessagesContext } from '@/context/MessagesContext'

function Provider({children}) {
  const [messages,setMessages] = React.useState([]);
  return (
    <div>
      <MessagesContext.Provider value={{messages,setMessages}}>
      <NextThemesProvider      
       attribute="class"
       defaultTheme="dark"
       enableSystem
       disableTransitionOnChange
       >
        <Header/>

        {children}
      </NextThemesProvider>
    </div>
  )
}

export default Provider