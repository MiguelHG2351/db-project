'use client'

import { usePathname } from "next/navigation";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

const routes = [
  {
    name: 'Clientes',
    icon: 'fa fa-user',
    path: '/clientes'
  },
  {
    name: 'Servicios',
    icon: 'fa fa-wrench',
    path: '/servicios'
  },
  {
    name: 'Proveedores',
    icon: 'fa fa-user-tie',
    path: '/proveedores'
  },
  {
    name: 'Productos',
    icon: 'fa fa-box-open',
    path: '/productos'
  },
  {
    name: 'Ingresos',
    icon: 'fa fa-money-bill',
    path: '/ingresos'
  },
  {
    name: 'Egresos',
    icon: 'fa fa-money-bill',
    path: '/egresos'
  },
  {
    name: 'Empleados',
    icon: 'fa fa-user-shield',
    path: '/empleados'
  }
]

export default function Sidebar() {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className="h-screen bg-light-blue">
      <Link href="/" className="flex px-4 items-center justify-start gap-x-4 py-4">
        <div className="bg-celeste rounded-lg">
          <Image src="/images/logo.png" width={34} height={34} alt="Logo of Refrikar" />
        </div>
        <span className="text-celeste font-semibold">Refrikar</span>
      </Link>
      <Divider orientation="horizontal" className="bg-celeste" />
      <div className="p-4">
        <ul className="flex flex-col gap-y-2">
          <li>
            <Link href="/clientes" className="bg-celeste/20 text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md border border-dark-blue/80 transition-transform hover:scale-95">
                <i className="fa fa-user text-white before:align-middle"></i>
                Clientes
            </Link>
          </li>
          <li>
            <Link href="/servicios" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-wrench text-white before:align-middle"></i>
                Servicios
            </Link>
          </li>
          <li>
            <Link href="/proveedores" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-user-tie text-white before:align-middle"></i>
                Proveedores
            </Link>
          </li>
          <li>
            <Link href="/productos" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-box-open text-white before:align-middle"></i>
                Productos
            </Link>
          </li>
          <li>
            <Link href="/ingresos" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-money-bill text-white before:align-middle"></i>
                Ingresos
            </Link>
          </li>
          <li>
            <Link href="/egresos" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-money-bill text-white before:align-middle"></i>
                Egresos
            </Link>
          </li>
          <li>
            <Link href="/egresos" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-user-shield text-white before:align-middle"></i>
                Empleados
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
