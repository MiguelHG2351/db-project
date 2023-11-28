import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button,Input, ModalBody, ModalHeader, Select, SelectItem, Tab, Tabs, Textarea } from '@nextui-org/react'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { errorNotification } from '../Notifications';

export default function ModalAddProducto({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.addProducto.useMutation();
  const { data: proveedores } = trpc.getAllProveedor.useQuery()
  const { data: categorias } = trpc.getAllCategorias.useQuery()

  const [selected, setSelected] = useState<React.Key>("photos");

  function onSubmit(data: any) {
    console.log('???')
    console.log(data)
    
    // validate categorias y proveedores
    if (data.categorias === "") {
      errorNotification("Selecciona una categoria")
      return
    }
    if (data.proveedor === "") {
      errorNotification("Selecciona un proveedor")
      return
    }

    mutate({
      nombre: data.nombre, costo: data.costo, detalles: data.detalles, stock: data.stock,
      id_categoria: data.categoria - 0, id_proveedor: data.proveedor - 0, descripcion: data.descripcion
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
  const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(yup.object({
      nombre: yup.string().min(3).required(),
      descripcion: yup.string().optional(),
      stock: yup.number().required().min(1),
      detalles: yup.string().required(),
      costo: yup.number().required().min(1),
      proveedor: yup.string().required().min(1),
      categoria: yup.string().required().min(1),
    })),
    defaultValues: {
      nombre: "",
      descripcion: "",
      stock: 0,
      detalles: "",
      costo: 0,
      proveedor: "",
      categoria: "",
    }
  })
  console.log(errors)

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
              <Tab key="Conectar" title="Conectar">
                <div className="flex flex-col gap-3 py-2">
                  
                  <Select
                    label="Selecciona un proveedor"
                    placeholder="Juan mecanico"
                    className="max-w-xs"
                    isInvalid={!!errors.proveedor}
                    errorMessage={!!errors.proveedor && "Ingrese un proveedor"}
                    {...register('proveedor')}
                    isDisabled={isUpdating}
                  >
                    {proveedores!?.map((proveedor) => (
                      <SelectItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                        {proveedor.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Selecciona un tipo de producto"
                    placeholder="Repuesto, Material, etc"
                    className="max-w-xs"
                    isInvalid={!!errors.categoria}
                    errorMessage={!!errors.categoria && "Ingrese una categoria valido"}
                    {...register('categoria')}
                    isDisabled={isUpdating}
                  >
                    {categorias!?.map((categoria) => (
                      <SelectItem key={categoria.id_categoria} value={categoria.id_categoria}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </Tab>
              <Tab key="egreso" title="Egreso">
                <Input
                  label="Detalles"
                  placeholder="Detalles de este egreso"
                  variant="bordered"
                  isInvalid={!!errors.detalles}
                  errorMessage={!!errors.detalles && "Ingresa los detalles del egreos"}
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
