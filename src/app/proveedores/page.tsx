import { serverClient } from '@/app/_trpc/serverClient'
import ListOfProveedores from '@/components/proveedores/ListOfProveedores'

export const metadata = {
  title: 'Clientes | Refrikar',
  description: 'Clientes'
}

export default async function Servicios() {
  const proveedores = await serverClient.getAllProveedor()

  return (
    <section className="flex flex-col p-4 flex-1 gap-y-4">
      <ListOfProveedores initialServicios={proveedores} />
    </section>
  )
}
