import GeneralInfo from "@/components/clients/GeneralInfo"
import ListOfClients from "./ListOfClients"

export default function Services() {

  return (
    <section className="flex flex-col p-4">
      <GeneralInfo />
      <ListOfClients />
    </section>
  )
}