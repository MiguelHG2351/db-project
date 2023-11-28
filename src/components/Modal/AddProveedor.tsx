import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, ModalBody, ModalHeader } from '@nextui-org/react'
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

export default function ModalAddProveedor({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.createProveedor.useMutation();
  
  function onSubmit(data: any) {
    console.log('???')
    if (errors.nombre) return
    mutate({ nombre: data.nombre, telefono: data.telefono  }, {
      onSuccess: () => {
        utils.getAllProveedor.invalidate()
        onClose()
        reset()
      }
    })
  }

  const utils = trpc.useUtils()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(yup.object({
      nombre: yup.string().min(3).required(),
      telefono: yup.string().length(8).required(),
    })),
    defaultValues: {
      nombre: "",
      telefono: "",
    }
  })

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Agrega un proveedor
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 py-2">
          <Input
            label="Nombre"
            placeholder="Ingrese el nombre del proveedor"
            variant="bordered"
            isInvalid={!!errors.nombre}
            errorMessage={!!errors.nombre && "Ingrese un nombre valido"}
            {...register('nombre')}
            isDisabled={isUpdating}
          />
          <Input
            label="Telefono"
            placeholder="Ingrese el telefono del proveedor"
            variant="bordered"
            {...register('telefono')}
            isInvalid={!!errors.telefono}
            errorMessage={!!errors.telefono && "Ingrese un número valido de 8 digitos"}
            isDisabled={isUpdating}
          />
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
      </ModalBody>
    </>
  )
}
