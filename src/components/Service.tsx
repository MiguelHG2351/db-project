'use client'
import { trpc } from "@/app/_trpc/client"

export default function Service() {
  const getTodos = trpc.getTodos.useQuery();
  
  return (
    <div>
      {JSON.stringify(getTodos.data)}
    </div>
  )
}