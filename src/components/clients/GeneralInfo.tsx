'use client'
import { trpc } from "@/app/_trpc/client"

export default function GeneralInfo() {
  const getTodos = trpc.getTodos.useQuery();
  
  return (
    <>
      <section className="flex gap-x-3">
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-users text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Total de clientes</h3>
          <span>26</span>
        </article>
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-users text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Clientes de hoy</h3>
          <span>2</span>
        </article>
        <article className="border border-[#d3d3d3] flex-1 p-3 rounded-md">
          <div className="border-[#d3d3d3] rounded-xl border flex items-center justify-center w-16 h-16">
            <i className="fa fa-wind text-black before:align-middle text-2xl"></i>
          </div>
          <h3 className="text-gray-700 font-semibold text-xl">Equipos de cliente</h3>
          <span>10</span>
        </article>
      </section>
        {/* {JSON.stringify(getTodos.data)} */}
    </>
  )
}