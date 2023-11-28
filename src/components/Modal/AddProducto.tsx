import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, CardBody, Input, ModalBody, ModalHeader, Tab, Tabs, Textarea } from '@nextui-org/react'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'

export default function ModalAddProducto({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.createProveedor.useMutation();
  const [selected, setSelected] = useState<React.Key>("photos");

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
      descripcion: yup.string().optional(),
      stock: yup.number().required(),
      detalles: yup.string().required(),
      costo: yup.number().required(),
    })),
    defaultValues: {
      nombre: "",
      descripcion: "",
      stock: 0,
      detalles: "",
      costo: 0,
    }
  })

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Agrega un producto
      </ModalHeader>
      <ModalBody>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex w-full flex-col">
            <Tabs 
              aria-label="Options"         
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="producto" title="Producto">
                <div className="flex flex-col gap-3 py-2">
                  <Input
                    label="Nombre"
                    placeholder="Nombre del producto"
                    variant="bordered"
                    isInvalid={!!errors.nombre}
                    errorMessage={!!errors.nombre && "Ingrese un nombre valido"}
                    {...register('nombre')}
                    isDisabled={isUpdating}
                  />
                  <Input
                    label="Costo"
                    placeholder="Costo del producto"
                    variant="bordered"
                    type='number'
                    {...register('costo')}
                    isInvalid={!!errors.costo}
                    errorMessage={!!errors.costo && "Costo del producto"}
                    isDisabled={isUpdating}
                  />
                  <Input
                    label="Stock"
                    placeholder="Stock comprado"
                    variant="bordered"
                    type='number'
                    {...register('stock')}
                    isInvalid={!!errors.stock}
                    errorMessage={!!errors.stock && "Ingresa la cantidad de stock"}
                    isDisabled={isUpdating}
                  />
                  <Textarea
                    label="Descripcion"
                    placeholder="Descripción del producto"
                    variant="bordered"
                    {...register('descripcion')}
                    isInvalid={!!errors.descripcion}
                    errorMessage={!!errors.descripcion && "Ingresa valores validos"}
                    isDisabled={isUpdating}
                  />
                </div>
              </Tab>
              <Tab key="egreso" title="Egreso">
                <Input
                  label="Detalles"
                  placeholder="Detalles de este egreso"
                  variant="bordered"
                  isInvalid={!!errors.detalles}
                  errorMessage={!!errors.detalles && "Ingrese un nombre valido"}
                  {...register('detalles')}
                  isDisabled={isUpdating}
                />
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
