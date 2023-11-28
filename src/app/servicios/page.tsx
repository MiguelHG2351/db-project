import { serverClient } from '@/app/_trpc/serverClient'
import ListOfServices from "@/components/services/ListOfServices"

export const metadata = {
  title: 'Servicios | Refrikar',
  description: 'Clientes'
}

export default async function Servicios() {
  const servicios = await serverClient.getAllServicios()

  return (
    <section className="flex flex-col p-4 flex-1 gap-y-4">
      <ListOfServices initialServicios={servicios} />
    </section>
  )
}
