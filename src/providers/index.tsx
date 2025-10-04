import React from 'react'

import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import ConvexClientProvider from './ConvexClientProvider'
import { Toaster } from '@/features/shared/components/ui/sonner'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ClerkProvider>
        <ConvexClientProvider>
          {children}
          <Toaster />
        </ConvexClientProvider>
      </ClerkProvider>
    </ThemeProvider>
  )
}
