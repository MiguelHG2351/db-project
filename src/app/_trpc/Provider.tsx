'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { env } from '@/env.mjs'

import { httpBatchLink } from '@trpc/client'
import { trpc } from './client'

import React, { useState } from 'react'

export function Provider({ children }: { children: React.ReactNode }) {
  const [ queryClient ] = useState(() => new QueryClient({}))
  const [ trpcClient ] = useState(() => 
    trpc.createClient({
      links: [httpBatchLink({ url: `${env.NEXT_PUBLIC_APP_URL}/api/trpc` })],
    })
  )

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        { children }
      </QueryClientProvider>
    </trpc.Provider>
  )
}
