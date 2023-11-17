-- CreateTable
CREATE TABLE "cargo" (
    "id_cargo" SERIAL NOT NULL,
    "cargo" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "cargo_pkey" PRIMARY KEY ("id_cargo")
);

-- CreateTable
CREATE TABLE "categoria" (
    "id_categoria" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "categoria_pkey" PRIMARY KEY ("id_categoria")
);

-- CreateTable
CREATE TABLE "cliente" (
    "id_cliente" SERIAL NOT NULL,
    "id_tipocliente" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "apellido" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255) NOT NULL,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id_cliente")
);

-- CreateTable
CREATE TABLE "direccion" (
    "id_direccion" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,

    CONSTRAINT "direccion_pkey" PRIMARY KEY ("id_direccion")
);

-- CreateTable
CREATE TABLE "egreso" (
    "id_egreso" SERIAL NOT NULL,
    "fecha" DATE NOT NULL,
    "monto" INTEGER NOT NULL,
    "detalles" VARCHAR(255) NOT NULL,

    CONSTRAINT "egreso_pkey" PRIMARY KEY ("id_egreso")
);

-- CreateTable
CREATE TABLE "empleado" (
    "id_empleado" SERIAL NOT NULL,
    "id_cargo" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255) NOT NULL,

    CONSTRAINT "empleado_pkey" PRIMARY KEY ("id_empleado")
);

-- CreateTable
CREATE TABLE "equipocliente" (
    "id_equipocliente" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_direccion" INTEGER NOT NULL,
    "id_tipoequipo" INTEGER NOT NULL,
    "numerodeserie" VARCHAR(255) NOT NULL,
    "capacidad" VARCHAR(255),
    "tamano" VARCHAR(255),

    CONSTRAINT "equipocliente_pkey" PRIMARY KEY ("id_equipocliente")
);

-- CreateTable
CREATE TABLE "gastovarios" (
    "id_gastosvarios" SERIAL NOT NULL,
    "id_egreso" INTEGER NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "gastovarios_pkey" PRIMARY KEY ("id_gastosvarios")
);

-- CreateTable
CREATE TABLE "ingreso" (
    "id_ingreso" SERIAL NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "monto" INTEGER NOT NULL,
    "detalles" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "ingreso_pkey" PRIMARY KEY ("id_ingreso")
);

-- CreateTable
CREATE TABLE "inventario" (
    "id_inventario" SERIAL NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,

    CONSTRAINT "inventario_pkey" PRIMARY KEY ("id_inventario")
);

-- CreateTable
CREATE TABLE "pagoempleado" (
    "id_pagoempleado" SERIAL NOT NULL,
    "id_egreso" INTEGER NOT NULL,
    "id_empleado" INTEGER NOT NULL,

    CONSTRAINT "pagoempleado_pkey" PRIMARY KEY ("id_pagoempleado")
);

-- CreateTable
CREATE TABLE "pagoimpuesto" (
    "id_pagoimpuesto" SERIAL NOT NULL,
    "id_tipoimpuesto" INTEGER NOT NULL,
    "id_egreso" INTEGER NOT NULL,

    CONSTRAINT "pagoimpuesto_pkey" PRIMARY KEY ("id_pagoimpuesto")
);

-- CreateTable
CREATE TABLE "post" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,

    CONSTRAINT "post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "producto" (
    "id_producto" SERIAL NOT NULL,
    "id_categoria" INTEGER NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "producto_pkey" PRIMARY KEY ("id_producto")
);

-- CreateTable
CREATE TABLE "proveedor" (
    "id_proveedor" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(255) NOT NULL,

    CONSTRAINT "proveedor_pkey" PRIMARY KEY ("id_proveedor")
);

-- CreateTable
CREATE TABLE "recursos" (
    "id_recursos" SERIAL NOT NULL,
    "id_inventario" INTEGER NOT NULL,
    "id_empleado" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "recursos_pkey" PRIMARY KEY ("id_recursos")
);

-- CreateTable
CREATE TABLE "reporte" (
    "id_reporte" SERIAL NOT NULL,
    "id_servicio" INTEGER NOT NULL,
    "detalles" VARCHAR(255) NOT NULL,
    "fecha" DATE NOT NULL,

    CONSTRAINT "reporte_pkey" PRIMARY KEY ("id_reporte")
);

-- CreateTable
CREATE TABLE "servicio" (
    "id_servicio" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_tiposervicio" INTEGER NOT NULL,
    "id_equipocliente" INTEGER NOT NULL,
    "id_recursos" INTEGER NOT NULL,

    CONSTRAINT "servicio_pkey" PRIMARY KEY ("id_servicio")
);

-- CreateTable
CREATE TABLE "suministro" (
    "id_suministro" SERIAL NOT NULL,
    "id_proveedor" INTEGER NOT NULL,
    "id_producto" INTEGER NOT NULL,
    "id_egreso" INTEGER NOT NULL,
    "cantidad" INTEGER NOT NULL,

    CONSTRAINT "suministro_pkey" PRIMARY KEY ("id_suministro")
);

-- CreateTable
CREATE TABLE "tipocliente" (
    "id_tipocliente" SERIAL NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipocliente_pkey" PRIMARY KEY ("id_tipocliente")
);

-- CreateTable
CREATE TABLE "tipoequipo" (
    "id_tipoequipo" INTEGER NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255),

    CONSTRAINT "tipoequipo_pkey" PRIMARY KEY ("id_tipoequipo")
);

-- CreateTable
CREATE TABLE "tipoimpuesto" (
    "id_tipoimpuesto" SERIAL NOT NULL,
    "tipo" VARCHAR(255) NOT NULL,

    CONSTRAINT "tipoimpuesto_pkey" PRIMARY KEY ("id_tipoimpuesto")
);

-- CreateTable
CREATE TABLE "tiposervicio" (
    "id_tiposervicio" SERIAL NOT NULL,
    "nombre" VARCHAR(255) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "tiposervicio_pkey" PRIMARY KEY ("id_tiposervicio")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipocliente_id_direccion_key" ON "equipocliente"("id_direccion");

-- AddForeignKey
ALTER TABLE "cliente" ADD CONSTRAINT "cliente_id_tipocliente_fkey" FOREIGN KEY ("id_tipocliente") REFERENCES "tipocliente"("id_tipocliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "direccion" ADD CONSTRAINT "direccion_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "empleado" ADD CONSTRAINT "empleado_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "cargo"("id_cargo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipocliente" ADD CONSTRAINT "equipocliente_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipocliente" ADD CONSTRAINT "equipocliente_id_direccion_fkey" FOREIGN KEY ("id_direccion") REFERENCES "direccion"("id_direccion") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "equipocliente" ADD CONSTRAINT "equipocliente_id_tipoequipo_fkey" FOREIGN KEY ("id_tipoequipo") REFERENCES "tipoequipo"("id_tipoequipo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "gastovarios" ADD CONSTRAINT "gastovarios_id_egreso_fkey" FOREIGN KEY ("id_egreso") REFERENCES "egreso"("id_egreso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ingreso" ADD CONSTRAINT "ingreso_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "servicio"("id_servicio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventario" ADD CONSTRAINT "inventario_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagoempleado" ADD CONSTRAINT "pagoempleado_id_egreso_fkey" FOREIGN KEY ("id_egreso") REFERENCES "egreso"("id_egreso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagoempleado" ADD CONSTRAINT "pagoempleado_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "empleado"("id_empleado") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagoimpuesto" ADD CONSTRAINT "pagoimpuesto_id_egreso_fkey" FOREIGN KEY ("id_egreso") REFERENCES "egreso"("id_egreso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "pagoimpuesto" ADD CONSTRAINT "pagoimpuesto_id_tipoimpuesto_fkey" FOREIGN KEY ("id_tipoimpuesto") REFERENCES "tipoimpuesto"("id_tipoimpuesto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "producto" ADD CONSTRAINT "producto_id_categoria_fkey" FOREIGN KEY ("id_categoria") REFERENCES "categoria"("id_categoria") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_id_empleado_fkey" FOREIGN KEY ("id_empleado") REFERENCES "empleado"("id_empleado") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "recursos" ADD CONSTRAINT "recursos_id_inventario_fkey" FOREIGN KEY ("id_inventario") REFERENCES "inventario"("id_inventario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "reporte" ADD CONSTRAINT "reporte_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "servicio"("id_servicio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "cliente"("id_cliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_id_equipocliente_fkey" FOREIGN KEY ("id_equipocliente") REFERENCES "equipocliente"("id_equipocliente") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_id_recursos_fkey" FOREIGN KEY ("id_recursos") REFERENCES "recursos"("id_recursos") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "servicio" ADD CONSTRAINT "servicio_id_tiposervicio_fkey" FOREIGN KEY ("id_tiposervicio") REFERENCES "tiposervicio"("id_tiposervicio") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_id_egreso_fkey" FOREIGN KEY ("id_egreso") REFERENCES "egreso"("id_egreso") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_id_producto_fkey" FOREIGN KEY ("id_producto") REFERENCES "producto"("id_producto") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "suministro" ADD CONSTRAINT "suministro_id_proveedor_fkey" FOREIGN KEY ("id_proveedor") REFERENCES "proveedor"("id_proveedor") ON DELETE NO ACTION ON UPDATE NO ACTION;
