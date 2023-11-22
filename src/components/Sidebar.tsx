import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="h-screen bg-light-blue">
      <Link href="/" className="flex px-4 items-center justify-start gap-x-4 py-4">
        <div className="bg-celeste p-2 rounded-lg">
          <Image src="/images/refrikar.png" width={18} height={18} alt="Logo of Refrikar" />
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
            <Link href="/" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-wrench text-white before:align-middle"></i>
                Servicios
            </Link>
          </li>
          <li>
            <Link href="/" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-user-tie text-white before:align-middle"></i>
                Proveedores
            </Link>
          </li>
          <li>
            <Link href="/" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-box-open text-white before:align-middle"></i>
                Productos
            </Link>
          </li>
          <li>
            <Link href="/" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-money-bill text-white before:align-middle"></i>
                Ingresos
            </Link>
          </li>
          <li>
            <Link href="/" className="text-white w-full flex justify-start items-center gap-x-4 py-2 px-2 rounded-md transition-transform hover:scale-95">
                <i className="fa fa-money-bill text-white before:align-middle"></i>
                Egresos
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}
