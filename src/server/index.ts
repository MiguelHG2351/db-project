import { inferRouterOutputs } from "@trpc/server";
import { publicProcedure, router } from "./trpc";

import { prisma } from "./prisma";
import { z } from "zod";

export const appRouter = router({
  
  getTodos: publicProcedure.query(async () => {
    // const data = await prisma.cliente.findMany();
    return [10, 20, 30, {
      // data
    }]
  }),
  getAllClientes: publicProcedure.query(async () => {
    // const data = await prisma.cliente.findMany();
    return await prisma.cliente.findMany({
      include: {
        tipocliente: true,
        equipocliente: {
          include: {
            tipoequipo: true
          }
        }
      }
    });
  }),
  getCliente: publicProcedure.input(
    z.object({
      id: z.number()
    }),
  ).query(async ({ input }) => {
    const data = await prisma.cliente.findUnique({
      where: {
        id_cliente: input.id
      },
      include: {
        tipocliente: true,
        equipocliente: {
          include: {
            tipoequipo: true
          }
        }
      }
    });
    return data;
  }),
  editUser: publicProcedure.input(
    z.object({
      nombre: z.string(),
      apellido: z.string().optional(),
      telefono: z.string(),
      id: z.number()
    }),
  ).mutation(async ({ input }) => {
    const user = await prisma.cliente.update({
      where: {
        id_cliente: input.id
      },
      data: {
        nombre: input.nombre,
        apellido: input.apellido,
        telefono: input.telefono,
        
      }
    });

    return user;
  }),
  getDireccionesByClient: publicProcedure.input(
    z.object({
      id: z.number()
      }),
  ).query(async ({ input }) => {
    const data = await prisma.direccion.findMany({
      where: {
        id_cliente: input.id,
      },
      include: {
        cliente: true
      }
    });
    return data;
  }),
  getAllServicios: publicProcedure.query(async () => {
    const data = await prisma.servicio.findMany({
      include: {
        cliente: true,
        tiposervicio: true,
        equipocliente: true
      }
    });
    return data;
  }),
  getAllProveedor: publicProcedure.query(async () => {
    const data = await prisma.proveedor.findMany();
    return data;
  }),
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;