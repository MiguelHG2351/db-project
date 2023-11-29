import { serverClient } from '@/app/_trpc/serverClient'
import ListOfEmpleados from '@/components/empleados/ListOfEmpleados'
import ListOfProveedores from '@/components/proveedores/ListOfProveedores'

export const metadata = {
  title: 'Empleados | Refrikar',
  description: 'Clientes'
}

export default async function Servicios() {
  const empleados = await serverClient.getAllEmpleado()

  return (
    <section className="flex flex-col p-4 flex-1 gap-y-4">
      <ListOfEmpleados initialServicios={empleados} />
    </section>
  )
}
