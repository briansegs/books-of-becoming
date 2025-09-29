import React from 'react'

import { ThemeProvider } from './ThemeProvider'
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from './ConvexClientProvider'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ClerkProvider>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}
