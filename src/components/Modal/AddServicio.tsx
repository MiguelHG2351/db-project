'use client'
import { trpc } from '@/app/_trpc/client';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button,Checkbox,Input, ModalBody, ModalHeader, Select, SelectItem, Tab, Tabs, Textarea } from '@nextui-org/react'
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import { useForm } from 'react-hook-form';
import * as yup from 'yup'
import { errorNotification } from '../Notifications';

export default function ModalAddServices({ onClose }: {onClose: () => void}) {
  const { mutate, isLoading: isUpdating } = trpc.addProducto.useMutation();
  const { data: getAllTipoServicio } = trpc.getAllTipoServicio.useQuery()
  const { data: getAllReporte } = trpc.getAllReportes.useQuery()
  const { data: clientes } = trpc.getAllClientes.useQuery()
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isEquipoEnabled, setIsEquipoEnabled] = useState(false)
  const [cliente, setCliente] = useState(0)
  const [isNewReport, setIsNewReport] = useState(true)

  const [selected, setSelected] = useState<React.Key>("photos");

  function onSubmit(data: any) {
    console.log('???')
    console.log(data)

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
      tipo_servicio: yup.number().min(1).required(),
      cliente: yup.number().min(1).required(),
      equipo: yup.number().min(1).required(),
      fecha: yup.date().required(),
      reporte: yup.number().min(1).optional(),
      reporte_name: yup.number().min(1).optional(),
    })),
    defaultValues: {
      tipo_servicio: 0,
      cliente: 0,
      equipo: 0,
      fecha: new Date(),
      reporte: 0,
      reporte_name: 0,
    }
  })
  console.log(errors)

  function onChangeHandler(event: any) {
    const { value } = event.target
    setCliente(value)
    setIsEquipoEnabled(true)
  }

  function onChangeReporteHandler(event: any) {
    const { checked } = event.target
    console.log(event)
    console.log(checked)
    setIsNewReport(!checked)
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        Reporte de Servicios
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
                  <Select
                    label="Selecciona un tipo de servicio"
                    placeholder="Instalación, Reparación, etc"
                    className="flex-1"
                    isInvalid={!!errors.tipo_servicio}
                    errorMessage={!!errors.tipo_servicio && "Ingrese un proveedor"}
                    {...register('tipo_servicio')}
                    isDisabled={isUpdating}
                  >
                    {getAllTipoServicio!?.map((tipo_servicio) => (
                      <SelectItem key={tipo_servicio.id_tiposervicio} value={tipo_servicio.id_tiposervicio}>
                        {tipo_servicio.nombre}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Selecciona un cliente"
                    placeholder="Juan pablo ll"
                    className="flex-1"
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
                    isEquipoEnabled && (
                      <Equipo errors={errors} isUpdating={isUpdating} register={register} user_id={cliente} />
                    )
                  }
                  <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                  <Checkbox defaultChecked checked={isNewReport} onChange={onChangeReporteHandler}
                    isDisabled={isUpdating}>Crear un reporte nuevo</Checkbox>
                  {
                    isNewReport ? (
                      <Select
                        label="Selecciona un registro"
                        placeholder="Servicios de instalación de Abril"
                        className="flex-1"
                        isInvalid={!!errors.reporte}
                        errorMessage={!!errors.reporte && "Ingrese un proveedor"}
                        {...register('reporte', { onChange: onChangeHandler })}
                        isDisabled={isUpdating}
                      >
                        {getAllReporte!?.map((reporte) => (
                          <SelectItem key={reporte.id_reporte} value={reporte.id_reporte}>
                            {reporte.detalles}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <Input
                        label="Nombre del reporte"
                        placeholder="Servicios 1"
                        variant="bordered"
                        {...register('reporte_name')}
                        isInvalid={!!errors.reporte_name}
                        errorMessage={!!errors.reporte_name && "No puede estar vacio"}
                        isDisabled={isUpdating}
                      />
                    )
                  }
                </div>
              </Tab>
              <Tab key="recursos" title="Recursos">
                <div className="flex flex-col gap-3 py-2">
                  
                  
                </div>
              </Tab>
              <Tab key="revisar" title="Revisar">
                {/* <Input
                  label="Detalles"
                  placeholder="Detalles de este egreso"
                  variant="bordered"
                  isInvalid={!!errors.detalles}
                  errorMessage={!!errors.detalles && "Ingresa los detalles del egreos"}
                  {...register('detalles')}
                  isDisabled={isUpdating}
                /> */}
              </Tab>
            </Tabs>
          </div>
          
          <div className="flex justify-end pb-2 pt-3">
            <Button isDisabled={isUpdating} type="submit" color="primary">
              Revisar
            </Button>
          </div>
        </form>
      </ModalBody>
    </>
  )
}

function Equipo({ user_id, isUpdating, errors, register }: { user_id: number, isUpdating: boolean, errors: any, register: any }) {
  const { data: equipos } = trpc.getEquipoByClient.useQuery({ id: user_id - 0 })
  
  return (
    <Select
      label="Selecciona las direcciones del equipo"
      placeholder="Mi casa"
      className="max-w-xs"
      isInvalid={!!errors.direccion}
      errorMessage={!!errors.direccion && "Error al seleccionar la dirección"}
      {...register('equipo')}
      isDisabled={isUpdating}
    >
      {equipos!?.map((equipo) => (
        <SelectItem key={equipo.id_equipocliente} value={equipo.id_equipocliente}>
          {equipo.numerodeserie}
        </SelectItem>
      ))}
    </Select>
  )
}