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
  editUser: publicProcedure.input(
    z.object({
      nombre: z.string(),
      id: z.number()
    }),
  ).mutation(async ({ input }) => {
    const user = await prisma.cliente.update({
      where: {
        id_cliente: input.id
      },
      data: {
        nombre: input.nombre
      }
    });

    return user;
  })
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;