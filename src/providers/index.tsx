import React from 'react'

import { ThemeProvider } from './ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ClerkProvider>{children}</ClerkProvider>
    </ThemeProvider>
  )
}
