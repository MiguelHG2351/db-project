'use client'
import React from 'react'
import { TrpcProvider } from "@/app/_trpc/Provider"
import { NextUIProvider } from "@nextui-org/react"

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TrpcProvider>
        <NextUIProvider>
        {children}
        </NextUIProvider> 
      </TrpcProvider>
    </>
  )
}
