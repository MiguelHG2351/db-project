'use client'
import { trpc } from "@/app/_trpc/client";
import { useForm } from 'react-hook-form';
import { Button, Input, Link, ModalBody, ModalHeader } from '@nextui-org/react';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"

export function ModalEditClienteInfo({ clienteId, onClose }: { clienteId: number, onClose: () => void }) {
  const { data: selectedUser, isLoading: isLoadingCliente } = trpc.getCliente.useQuery({ id: clienteId })

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">Modificar cliente: {selectedUser?.nombre}</ModalHeader>
      <ModalBody>
        {!isLoadingCliente && <ModalForm user={selectedUser} onClose={onClose} />}
      </ModalBody>
    </>
  )
}

function ModalForm({ user: selectedUser, onClose }: { user: any, onClose: () => void }) {

  const { mutate, isLoading: isUpdating } = trpc.editUser.useMutation();
  
  function onSubmit(data: any) {
    // avoid send empty data
    if (errors.nombre) return
    console.log('no paso')
    mutate({ id: selectedUser!.id_cliente, nombre: data.nombre, telefono: data.telefono, apellido: data.apellido  }, {
      onSuccess: () => {
        utils.getAllClientes.invalidate()
        utils.getCliente.invalidate()
        onClose()
        reset()
      }
    })
  }

  const utils = trpc.useUtils()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(yup.object({
      nombre: yup.string().min(3),
      apellido: yup.string(),
      telefono: yup.string().min(3),
    })),
    defaultValues: {
      nombre: selectedUser?.nombre || "",
      apellido: selectedUser?.apellido || "",
      telefono: selectedUser?.telefono || "",
    }
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 py-2">
      <Input
          autoFocus
          label="Nombre"
          placeholder="Ingresa su nuevo nombre"
          variant="bordered"
          isInvalid={!!errors.nombre}
          errorMessage={!!errors.nombre && "Error, ingrese un nombre valido"}
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
      <Input
          label="Telefono"
          placeholder="Ingresa su telefono"
          variant="bordered"
          {...register('telefono')}
          isDisabled={isUpdating}
        />
        <Link color="primary" showAnchorIcon href={`/clientes/${selectedUser?.id_cliente}`}>
          Mas opciones
        </Link>
      <div className="flex justify-end pb-2 pt-3">
        <Button isDisabled={isUpdating} type="button" color="danger" variant="light" onPress={() => {
          reset()
          onClose()
        }}>
          Close
        </Button>
        <Button isDisabled={isUpdating} type="submit" color="primary">
          Guardar
        </Button>
      </div>
    </form>
  )
}
