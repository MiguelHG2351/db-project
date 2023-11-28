import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button,Chip,Input, Kbd, ModalBody, ModalHeader, Select, SelectItem, Tab, Tabs, Textarea } from '@nextui-org/react'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { errorNotification } from '../Notifications';

interface IDireccion {
  direccion: string
}

export default function ModalAddCliente({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.createCliente.useMutation();
  const { data: tipoClienteList } = trpc.getAllTipoCliente.useQuery()
  const [direcciones, setDirecciones] = useState<IDireccion[]>([])

  const [selected, setSelected] = useState<React.Key>("photos");

  function onSubmit(data: any) {

    console.log({
      nombre: data.nombre, apellido: data.apellido, telefono: data.telefono, direcciones: direcciones, id_tipocliente: data.tipo - 0
    })
    mutate({
      nombre: data.nombre, apellido: data.apellido, telefono: data.telefono, direcciones: direcciones, id_tipocliente: data.tipo - 0
    }, {
      onSuccess: () => {
        utils.getAllProveedor.invalidate()
        utils.getAllProductos.invalidate()
        onClose()
        reset()
      },
      onError: (error) => {
        errorNotification("Revisa los datos ingresados")
      }
    })
  }

  const utils = trpc.useUtils()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(yup.object({
      nombre: yup.string().min(3).required(),
      apellido: yup.string().optional(),
      telefono: yup.string().length(8).required(),
      direccion: yup.string().optional(),
      tipo: yup.string().required(),
    })),
    defaultValues: {
      nombre: "",
      apellido: "",
      telefono: undefined,
      direccion: "",
      tipo: "",
    }
  })

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Tab') {
      e.preventDefault()
      const value = e.currentTarget.value
      if (value !== "") {
        setDirecciones([...direcciones, { direccion: value }])
        e.currentTarget.value = ""
      }
    }
  }

  console.log(direcciones)

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Agrega un cliente
      </ModalHeader>
      <ModalBody>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex w-full flex-col">
            <Tabs 
              aria-label="Options"         
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="general" title="General">
                <div className="flex flex-col gap-3 py-2">
                  <Input
                    label="Nombre"
                    placeholder="Nombre del cliente"
                    variant="bordered"
                    isInvalid={!!errors.nombre}
                    errorMessage={!!errors.nombre && "Ingrese un nombre valido"}
                    {...register('nombre')}
                    isDisabled={isUpdating}
                  />
                  <Input
                    label="Apellido"
                    placeholder="Apellido del cliente"
                    variant="bordered"
                    type='text'
                    {...register('apellido')}
                    isInvalid={!!errors.apellido}
                    errorMessage={!!errors.apellido && "Apellido invalido"}
                    isDisabled={isUpdating}
                  />
                  <Select
                    label="Tipo de cliente"
                    placeholder="Juridico"
                    variant="bordered"
                    {...register('tipo')}
                    isInvalid={!!errors.tipo}
                    errorMessage={!!errors.tipo && "Selecciona el tipo de cliente"}
                    isDisabled={isUpdating}
                  >
                    {tipoClienteList!?.map((tipo) => (
                      <SelectItem key={tipo.id_tipocliente} value={tipo.tipo}>
                        {tipo.tipo}
                      </SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Telefono"
                    placeholder="Telefono del cliente"
                    variant="bordered"
                    type='number'
                    {...register('telefono')}
                    isInvalid={!!errors.telefono}
                    errorMessage={!!errors.telefono && "Ingresa el número de telefono"}
                    isDisabled={isUpdating}
                  />
                </div>
              </Tab>
              <Tab key="direcciones" title="Direcciones">
                <div className="flex flex-col gap-3 py-2">
                  <div className="flex gap-4">
                    <Kbd keys={["tab"]}>Presiona tab para agregar</Kbd>
                  </div>
                  <Input
                    label="Dirección"
                    placeholder="Su dirección"
                    variant="bordered"
                    isInvalid={!!errors.direccion}
                    errorMessage={!!errors.direccion && "Ingrese una dirección valido"}
                    onKeyDown={onKeyDownHandler}
                    {...register('direccion')}
                    isDisabled={isUpdating}
                  />
                  <div className="flex flex-wrap gap-y-2 gap-x-2">
                    {/* list of directions with a option that allowed */}
                    {
                      direcciones.map((direccion) => (
                        <Chip key={direccion.direccion}  onClose={() => console.log("close")} classNames={{
                          base: "h-auto whitespace-normal py-1",
                        }}>
                          {direccion.direccion}
                        </Chip>
                      ))
                    }
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
          
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
