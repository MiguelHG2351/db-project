import GeneralInfo from "@/components/clients/GeneralInfo"
import ListOfClients from "../../components/clients/ListOfClients"

export const metadata = {
  title: 'Clientes',
  description: 'Clientes'
}

export default function Services() {

  return (
    <section className="flex flex-col p-4">
      <GeneralInfo />
      <ListOfClients />
    </section>
  )
}