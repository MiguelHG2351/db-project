'use client'
import { trpc } from "@/app/_trpc/client";
import { RouterOutputs } from "@/server";
import { Button, ModalBody, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import React, { useCallback } from "react";

type Direccion = RouterOutputs['getDireccionesByClient'][0]

export function ModalShowDireccionesCliente({ clienteId, onClose }: { clienteId: number, onClose: () => void }) {
  const { data: direcciones, isLoading: isLoadingCliente } = trpc.getDireccionesByClient.useQuery({ id: clienteId })

  const renderCell = useCallback((item: Direccion, columnKey: React.Key) => {
    switch (columnKey) {
      case "id_direccion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{item.id_direccion}</p>
          </div>
        )
         
      case "direccion":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-tiny capitalize text-default-400">{item.direccion}</p>
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
      key: "id_direccion",
      label: "ID",
    },
    {
      key: "direccion",
      label: "Lugar",
    }
  ]

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Direcciones del cliente</ModalHeader>
      <ModalBody>
        {
          isLoadingCliente ? <p>Loading...</p> :
            <Table aria-label="Example table with dynamic content">
              <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={direcciones}>
                {(item) => (
                  <TableRow key={item.id_direccion}>
                    {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
        }
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