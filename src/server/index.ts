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
  getAllTipoCliente: publicProcedure.query(async () => {
    const data = await prisma.tipocliente.findMany();
    return data;
  }),
  createCliente: publicProcedure.input(
    z.object({
      nombre: z.string(),
      apellido: z.string().optional(),
      telefono: z.string(),
      direcciones: z.array(z.object({ direccion: z.string()  })),
      id_tipocliente: z.number(),
    }),
  ).mutation(async ({ input }) => {
    const user = await prisma.cliente.create({
      data: {
        nombre: input.nombre,
        apellido: input.apellido,
        telefono: input.telefono,
        id_tipocliente: input.id_tipocliente,
        direccion: {
          createMany: {
            data: input.direcciones
          }
        }
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
  getAllTipoServicio: publicProcedure.query(async () => {
    const data = await prisma.tiposervicio.findMany();
    return data;
  }),
  addServicio: publicProcedure.input(
    z.object({
      id_cliente: z.number(),
      id_tiposervicio: z.number(),
      id_equipocliente: z.number(),
      detalles: z.string(),
      fecha: z.date(),
      monto: z.number(),
      detalle_reporte: z.string(),
    }),
  ).mutation(async ({ input }) => {
    const ingreso = await prisma.ingreso.create({
      data: {
        fecha: input.fecha,
        detalles: input.detalles,
        monto: input.monto,
      }
    });

    const reporte = await prisma.reporte.create({
      data: {
        detalles: input.detalle_reporte,
        fecha: input.fecha,
      }
    });
    
    const data = await prisma.servicio.create({
      data: {
        id_cliente: input.id_cliente,
        id_tiposervicio: input.id_tiposervicio,
        id_equipocliente: input.id_equipocliente,
        id_ingreso: ingreso.id_ingreso,
        id_reporte: reporte.id_reporte,
        id_recursos: 1,
      }
    });
    return data;
  }),
  getAllProveedor: publicProcedure.query(async () => {
    const data = await prisma.proveedor.findMany({
      include: {
        suministro: true
      }
    });
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
  getAllEmpleado: publicProcedure.query(async () => {
    const data = await prisma.empleado.findMany({
      include: {
        cargo: true
      }
    });
    return data;
  }),
  getAllEquipos: publicProcedure.query(async () => {
    const data = await prisma.equipocliente.findMany({
      include: {
        cliente: true,
        tipoequipo: true
      }
    });
    return data;
  }),
  getEquipoByClient: publicProcedure.input(
    z.object({
      id: z.number()
      }),
  ).query(async ({ input }) => {
    const data = await prisma.equipocliente.findMany({
      where: {
        id_cliente: input.id,
      },
      include: {
        cliente: true,
        tipoequipo: true
      }
    });
    return data;
  }),
  getAllReportes: publicProcedure.query(async () => {
    const data = await prisma.reporte.findMany({
      include: {
        servicios: true
      }
    });
    return data;
  }),
  getAllTipoEquipo: publicProcedure.query(async () => {
    const data = await prisma.tipoequipo.findMany();
    return data;
  }),
  addEquipo: publicProcedure.input(
    z.object({
      id_cliente: z.number(),
      id_tipoequipo: z.number(),
      id_direccion: z.number(),
      numerodeserie: z.string(),
      capacidad: z.string(),
      tamano: z.string(),
    }),
  ).mutation(async ({ input }) => {
    const data = await prisma.equipocliente.create({
      data: {
        id_cliente: input.id_cliente,
        id_tipoequipo: input.id_tipoequipo,
        id_direccion: input.id_direccion,
        numerodeserie: input.numerodeserie,
        capacidad: input.capacidad,
        tamano: input.tamano,
      }
    });
    return data;
  }),
});

export type AppRouter = typeof appRouter;
export type RouterOutputs = inferRouterOutputs<AppRouter>;