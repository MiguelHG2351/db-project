import { serverClient } from '@/app/_trpc/serverClient'
import ListOfProductos from '@/components/inventario/ListOfProduct'

export const metadata = {
  title: 'Inventario/Bodega | Refrikar',
  description: 'Clientes'
}

export default async function Servicios() {
  const proveedores = await serverClient.getAllProductos()

  return (
    <section className="flex flex-col p-4 flex-1 gap-y-4">
      <ListOfProductos initialServicios={proveedores} />
    </section>
  )
}
