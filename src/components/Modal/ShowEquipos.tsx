'use client'
import { trpc } from "@/app/_trpc/client";
import { RouterOutputs } from "@/server";
import { Button, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useCallback } from "react";


type Cliente = NonNullable<RouterOutputs['getCliente']>
type Equipo = Cliente['equipocliente'][0]

export function ModalShowClienteEquipos({ clienteId, onClose }: { clienteId: number, onClose: () => void }) {
  const { data: cliente, isLoading: isLoadingCliente } = trpc.getCliente.useQuery({ id: clienteId })

  const renderCell = useCallback((item: Equipo, columnKey: React.Key) => {
    switch (columnKey) {
      case "id_equipocliente":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{item.id_equipocliente}</p>
          </div>
        )
         
      case "numerodeserie":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{item.numerodeserie}</p>
          </div>
        )
         
      case "tipo":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{item.tipoequipo.tipo}</p>
          </div>
        )
         
      default:
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">null</p>
          </div>
        )
    }
  }, [])

  const columns = [
    {
      key: "id_equipocliente",
      label: "ID",
    },
    {
      key: "numerodeserie",
      label: "SERIE",
    },
    {
      key: "tipo",
      label: "TIPO",
    },
  ]

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Equipos del cliente: {cliente?.nombre}</ModalHeader>
      <ModalBody>
        {
          isLoadingCliente ? <p>Loading...</p> :
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={cliente?.equipocliente}>
                {(item) => (
                  <TableRow key={item.id_equipocliente}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
        }
        {/* <Table aria-label="Example table with dynamic content">
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={equipos}>
            {(item) => (
              <TableRow key={item.id_equipocliente}>
                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table> */}
      </ModalBody>
      <ModalFooter>
        <Button type="button" color="danger" variant="light" onPress={() => {
          onClose()
        }}>
          Close
        </Button>
      </ModalFooter>
    </>
  )
}