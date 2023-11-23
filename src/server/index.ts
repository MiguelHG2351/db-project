import { inferRouterOutputs } from "@trpc/server";
import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
        tipocliente: true
      }
    });
  }),
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;