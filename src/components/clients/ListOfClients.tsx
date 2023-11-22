'use client'
import {Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";
import { serverClient } from '@/app/_trpc/serverClient'
import { trpc } from "@/app/_trpc/client";

export default function ListOfClients({ initialClients }: { initialClients: Awaited<ReturnType<(typeof serverClient)['getAllClientes']>> }) {
  const getClients = trpc.getAllClientes.useQuery(undefined,{
    initialData: initialClients,
    refetchOnMount: false,
    refetchOnReconnect: false
  });

  let tabs = [
    {
      id: "asc",
      label: "Ascendente",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: "desc",
      label: "Descendente",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ];

  return (
    <section className="flex-1 flex flex-col">
      <div className="flex w-full flex-col py-4 flex-1">
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Table color="primary"  isHeaderSticky classNames={{
                wrapper: 'max-h-[450px]'
              }} aria-label="Lista de usuarios">
                <TableHeader>
                  <TableColumn>Id</TableColumn>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Tipo de cliente</TableColumn>
                  <TableColumn>telefono</TableColumn>
                </TableHeader>
                <TableBody>
                  {
                  getClients?.data?.map((cliente, key) => (
                    <TableRow key={key}>
                      <TableCell>{cliente.id_cliente}</TableCell>
                      <TableCell>{ `${cliente.nombre} ${cliente.apellido != null ? cliente.apellido: ''}` }</TableCell>
                      {/* <TableCell>{ cliente.nombre + " " + cliente.apellido != null ? cliente.apellido: '' }</TableCell> */}
                      <TableCell>{ cliente.tipocliente.tipo }</TableCell>
                      <TableCell>{ cliente.telefono }</TableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>
              </Table>
                  {/* {item.content} */}
            </Tab>
          )}
        </Tabs>
      </div> 
    </section>
  )
}
