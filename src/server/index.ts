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
  createProveedor: publicProcedure.input(
    z.object({
      nombre: z.string(),
      telefono: z.string(),
    }),
  ).mutation(async ({ input }) => {
    const data = await prisma.proveedor.create({
      data: {
        nombre: input.nombre,
        telefono: input.telefono,
      }
    });
    return data;
  }),
  getAllProductos: publicProcedure.query(async () => {
    const data = await prisma.producto.findMany({
      include: {
        categoria: true,
        suministro: {
          include: {
            proveedor: true
          }
        }
      }
    });
    return data;
  }),
  getAllCategorias: publicProcedure.query(async () => {
    const data = await prisma.categoria.findMany();
    return data;
  }),
  addProducto: publicProcedure.input(
    z.object({
      nombre: z.string(),
      stock: z.number(),
      costo: z.number(),
      descripcion: z.string().optional(),
      detalles: z.string(),
      id_categoria: z.number(),
      id_proveedor: z.number(),
    }),
  ).mutation(async ({ input }) => {
    const egreso = await prisma.egreso.create({
      data: {
        fecha: new Date(),
        detalles: input.detalles,
        monto: input.costo * input.stock,
      }
    });
    
    const producto = await prisma.producto.create({
      data: {
        nombre: input.nombre,
        inventario: {
          create: {
            stock: input.stock
          }
        },
        descripcion: input.descripcion,
        categoria: {
          connect: {
            id_categoria: input.id_categoria
          }
        },
        suministro: {
          create: {
            cantidad: input.stock,
            id_proveedor: input.id_proveedor,
            id_egreso: egreso.id_egreso
          }
        }
      }
    });
    return producto;
  }),
  getAllIngresos: publicProcedure.query(async () => {
    const data = await prisma.ingreso.findMany();
    return data;
  }),
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;