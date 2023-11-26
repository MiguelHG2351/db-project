'use client'
import { trpc } from "@/app/_trpc/client";
import { useForm } from 'react-hook-form';
import { Button, Input, ModalBody, ModalHeader } from '@nextui-org/react';

export function ModalEditClienteInfo({ clienteId, onClose }: { clienteId: number, onClose: () => void }) {
  const { data: selectedUser } = trpc.getCliente.useQuery({ id: clienteId })

  const { mutate, isLoading: isUpdating } = trpc.editUser.useMutation();
  
  const utils = trpc.useUtils()
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nombre: selectedUser?.nombre,
      apellido: selectedUser?.apellido
    }
  })

  function onSubmit(data: any) {
    // avoid send empty data
    mutate({ id: selectedUser!.id_cliente, nombre: data.nombre }, {
      onSuccess: () => {
        utils.getAllClientes.invalidate()
      }
    })
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Modificar cliente: {selectedUser?.nombre}</ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 py-2">
          <Input
              autoFocus
              label="Nombre"
              placeholder="Ingresa su nuevo nombre"
              variant="bordered"
              {...register('nombre')}
              isDisabled={isUpdating}
              />
          <Input
              label="Apellido"
              placeholder="Ingresa su apellido"
              variant="bordered"
              {...register('apellido')}
              isDisabled={isUpdating}
            />
          <div className="flex justify-end pb-2 pt-3">
            <Button isDisabled={isUpdating} type="button" color="danger" variant="light" onPress={() => {
              onClose()
              reset()
            }}>
              Close
            </Button>
            <Button isDisabled={isUpdating} type="submit" color="primary" onPress={() => {
              onClose()
            }}>
              Guardar
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  )
}