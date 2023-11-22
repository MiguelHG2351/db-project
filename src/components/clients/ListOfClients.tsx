'use client'
import {Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, RadioGroup, Radio } from "@nextui-org/react";


export default function ListOfClients() {
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
    <section>
      <div className="flex w-full flex-col py-4">
        <Tabs aria-label="Dynamic tabs" items={tabs}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Table color="primary" aria-label="Lista de usuarios">
                <TableHeader>
                  <TableColumn>Ids</TableColumn>
                  <TableColumn>Nombre</TableColumn>
                  <TableColumn>Tipo de cliente</TableColumn>
                  <TableColumn>telefono</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key={1}>
                    <TableCell>1</TableCell>
                    <TableCell>Rene Perez</TableCell>
                    <TableCell>Natural</TableCell>
                    <TableCell>+505 34567890</TableCell>
                  </TableRow>
                  <TableRow key={2}>
                    <TableCell>2</TableCell>
                    <TableCell>Miguel Martinez</TableCell>
                    <TableCell>Natural</TableCell>
                    <TableCell>+505 23456789</TableCell>
                  </TableRow>
                  <TableRow key={3}>
                    <TableCell>3</TableCell>
                    <TableCell>Casa blanca</TableCell>
                    <TableCell>Juridico</TableCell>
                    <TableCell>+505 66666666</TableCell>
                  </TableRow>
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
