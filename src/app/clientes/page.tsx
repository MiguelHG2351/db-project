import GeneralInfo from "@/components/clients/GeneralInfo"
import ListOfClients from "../../components/clients/ListOfClients"
import { serverClient } from '@/app/_trpc/serverClient'

export const metadata = {
  title: 'Clientes | Refrikar',
  description: 'Clientes'
}

export default async function Clientes() {
  const clientes = await serverClient.getAllClientes()

  return (
    <section className="flex flex-col p-4 flex-1">
      <GeneralInfo initialClients={clientes} />
      <ListOfClients initialClients={clientes} />
    </section>
  )
}
