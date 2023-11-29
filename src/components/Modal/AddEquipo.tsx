import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button,Input, ModalBody, ModalHeader, Select, SelectItem, Tab, Tabs } from '@nextui-org/react'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { errorNotification } from '../Notifications';

export default function ModalAddEquipo({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.addEquipo.useMutation();
  const { data:clientes } = trpc.getAllClientes.useQuery()
  const { data:tiposEquipo } = trpc.getAllTipoEquipo.useQuery()
  // state for the direccion enabled or disabled
  const [isDireccionEnabled, setIsDireccionEnabled] = useState(false)
  const [cliente, setCliente] = useState(0)

  const [selected, setSelected] = useState<React.Key>("photos");

  function onSubmit(data: any) {
    
    // validate categorias y proveedores
    // if (data.categorias === "") {
    //   errorNotification("Selecciona una categoria")
    //   return
    // }
    // if (data.proveedor === "") {
    //   errorNotification("Selecciona un proveedor")
    //   return
    // }

    console.log('dataa:')
    console.log(data)
    mutate({
      numerodeserie: data.num_serie, capacidad: data.capacidad, id_cliente: data.cliente - 0, id_direccion: data.direccion - 0,
      id_tipoequipo: data.tipo - 0, tamano: data.size
    }, {
      onSuccess: () => {
        utils.getAllEquipos.invalidate()
        utils.getAllTipoEquipo.invalidate()
        utils.getAllClientes.invalidate()
        onClose()
        reset()
      },
      onError: (error) => {
        errorNotification("Revisa los datos ingresados")
      }
    })
  }

  const utils = trpc.useUtils()
  const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm({
    resolver: yupResolver(yup.object({
      num_serie: yup.string().min(3).required(),
      capacidad: yup.string().optional(),
      size: yup.string().optional(),
      cliente: yup.string().required(),
      direccion: yup.string().required().min(1),
      tipo: yup.string().required().min(1),
    })),
    defaultValues: {
      num_serie: "",
      capacidad: "",
      size: "",
      cliente: "",
      direccion: "",
      tipo: "",
    }
  })

  const onChangeHandler = (e: any) => {
    setIsDireccionEnabled(true)
    setCliente(e.target.value)
  }
  console.log(errors)
  console.log(getValues('size'))

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Agrega un nuevo equipo
      </ModalHeader>
      <ModalBody>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex w-full flex-col">
            <Tabs 
              aria-label="Options"         
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="equipo" title="Equipo">
                <div className="flex flex-col gap-3 py-2">
                  <Input
                    label="Número de serie"
                    placeholder="Número de serie del equipo"
                    variant="bordered"
                    isInvalid={!!errors.num_serie}
                    errorMessage={!!errors.num_serie && "Ingrese un número de serie valido"}
                    {...register('num_serie')}
                    isDisabled={isUpdating}
                  />
                  <Input
                    label="Capacidad (si aplica)"
                    placeholder="1000 BTU"
                    variant="bordered"
                    {...register('capacidad')}
                    isInvalid={!!errors.capacidad}
                    errorMessage={!!errors.capacidad && "La información ingresada no es valida"}
                    isDisabled={isUpdating}
                  />
                  <Input
                    label="Tamaño del refri (si aplica)"
                    placeholder="Grande"
                    variant="bordered"
                    {...register('size')}
                    isInvalid={!!errors.size}
                    errorMessage={!!errors.size && "Ingresa un tamaño valido"}
                    isDisabled={isUpdating}
                  />
                  <Select
                    label="Selecciona un tipo de Equipo"
                    placeholder="Central inverter"
                    className="max-w-xs"
                    isInvalid={!!errors.tipo}
                    errorMessage={!!errors.tipo && "Seleccione un tipo de cliente"}
                    {...register('tipo', { onChange: onChangeHandler })}
                    isDisabled={isUpdating}
                  >
                    {tiposEquipo!?.map((tipo) => (
                      <SelectItem key={tipo.id_tipoequipo} value={tipo.id_tipoequipo}>
                        {tipo.tipo}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </Tab>
              <Tab key="cliente" title="Cliente">
                <div className="flex flex-col gap-3 py-2">
                  
                  <Select
                    label="Selecciona un cliente"
                    placeholder="Juan mecanico"
                    className="max-w-xs"
                    isInvalid={!!errors.cliente}
                    errorMessage={!!errors.cliente && "Ingrese un proveedor"}
                    {...register('cliente', { onChange: onChangeHandler })}
                    isDisabled={isUpdating}
                  >
                    {clientes!?.map((cliente) => (
                      <SelectItem key={cliente.id_cliente} value={cliente.id_cliente}>
                        {cliente.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                  {
                    isDireccionEnabled && (
                      <Direcciones errors={errors} isUpdating={isUpdating} register={register} user_id={cliente} />
                    )
                  }
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

function Direcciones({ user_id, isUpdating, errors, register }: { user_id: number, isUpdating: boolean, errors: any, register: any }) {
  console.log('user id', user_id)
  const { data: direcciones } = trpc.getDireccionesByClient.useQuery({ id: user_id - 0 })
  
  return (
    <Select
      label="Selecciona las direcciones del equipo"
      placeholder="Mi casa"
      className="max-w-xs"
      isInvalid={!!errors.direccion}
      errorMessage={!!errors.direccion && "Error al seleccionar la dirección"}
      {...register('direccion')}
      isDisabled={isUpdating}
    >
      {direcciones!?.map((direccion) => (
        <SelectItem key={direccion.id_direccion} value={direccion.id_direccion}>
          {direccion.direccion}
        </SelectItem>
      ))}
    </Select>
  )
}
