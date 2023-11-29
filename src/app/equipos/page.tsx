import { serverClient } from '@/app/_trpc/serverClient'
import ListOfEquipos from '@/components/equipos/ListOfEquipos'

export const metadata = {
  title: 'Equipos | Refrikar',
  description: 'Clientes'
}

export default async function Equipos() {
  const servicios = await serverClient.getAllEquipos()

  return (
    <section className="flex flex-col p-4 flex-1 gap-y-4">
      <ListOfEquipos initialServicios={servicios} />
    </section>
  )
}
