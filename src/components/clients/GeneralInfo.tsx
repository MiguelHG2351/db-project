'use client'
import { trpc } from "@/app/_trpc/client"
import { serverClient } from "@/app/_trpc/serverClient";

export default function GeneralInfo({ initialClients }: { initialClients: Awaited<ReturnType<(typeof serverClient)['getAllClientes']>> }) {
  const getTodos = trpc.getAllClientes.useQuery(undefined,{
    initialData: initialClients,
    refetchOnMount: false,
    refetchOnReconnect: false
  });
  
  return (
    <>
      <section className="flex gap-x-3">
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-users text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Total de clientes</h3>
          <span>{ getTodos.data.length }</span>
        </article>
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-users text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Clientes juridicos</h3>
          <span>{ getTodos.data.filter(cliente => cliente.tipocliente.tipo === 'Juridico').length }</span>
        </article>
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-wind text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Clientes Naturales</h3>
          <span>{ getTodos.data.filter(cliente => cliente.tipocliente.tipo === 'Natural').length }</span>
        </article>
      </section>
        {/* {JSON.stringify(getTodos.data)} */}
    </>
  )
}