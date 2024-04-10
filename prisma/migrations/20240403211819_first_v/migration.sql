-- CreateTable
CREATE TABLE `cargo` (
    `id_cargo` INTEGER NOT NULL AUTO_INCREMENT,
    `cargo` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`id_cargo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria` (
    `id_categoria` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`id_categoria`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente` (
    `id_cliente` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tipocliente` INTEGER NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `apellido` VARCHAR(255) NULL,
    `telefono` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_cliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `direccion` (
    `id_direccion` INTEGER NOT NULL AUTO_INCREMENT,
    `direccion` VARCHAR(255) NOT NULL,
    `id_cliente` INTEGER NOT NULL,

    PRIMARY KEY (`id_direccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egreso` (
    `id_egreso` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `monto` INTEGER NOT NULL,
    `detalles` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_egreso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `empleado` (
    `id_empleado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cargo` INTEGER NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_empleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipocliente` (
    `id_equipocliente` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_direccion` INTEGER NOT NULL,
    `id_tipoequipo` INTEGER NOT NULL,
    `numerodeserie` VARCHAR(255) NOT NULL,
    `capacidad` VARCHAR(255) NULL,
    `tamano` VARCHAR(255) NULL,

    PRIMARY KEY (`id_equipocliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gastovarios` (
    `id_gastosvarios` INTEGER NOT NULL AUTO_INCREMENT,
    `id_egreso` INTEGER NOT NULL,
    `descripcion` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_gastosvarios`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingreso` (
    `id_ingreso` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` INTEGER NOT NULL,
    `detalles` VARCHAR(255) NOT NULL,
    `fecha` DATE NOT NULL,

    PRIMARY KEY (`id_ingreso`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventario` (
    `id_inventario` INTEGER NOT NULL AUTO_INCREMENT,
    `stock` INTEGER NOT NULL,

    PRIMARY KEY (`id_inventario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagoempleado` (
    `id_pagoempleado` INTEGER NOT NULL AUTO_INCREMENT,
    `id_egreso` INTEGER NOT NULL,
    `id_empleado` INTEGER NOT NULL,

    PRIMARY KEY (`id_pagoempleado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pagoimpuesto` (
    `id_pagoimpuesto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_tipoimpuesto` INTEGER NOT NULL,
    `id_egreso` INTEGER NOT NULL,

    PRIMARY KEY (`id_pagoimpuesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `producto` (
    `id_producto` INTEGER NOT NULL AUTO_INCREMENT,
    `id_categoria` INTEGER NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,
    `id_inventario` INTEGER NOT NULL,

    UNIQUE INDEX `producto_id_inventario_key`(`id_inventario`),
    PRIMARY KEY (`id_producto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proveedor` (
    `id_proveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `telefono` VARCHAR(255) NULL,

    PRIMARY KEY (`id_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recursos` (
    `id_recursos` INTEGER NOT NULL AUTO_INCREMENT,
    `id_inventario` INTEGER NOT NULL,
    `id_empleado` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `fecha` DATE NOT NULL,

    PRIMARY KEY (`id_recursos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reporte` (
    `id_reporte` INTEGER NOT NULL AUTO_INCREMENT,
    `detalles` VARCHAR(255) NOT NULL,
    `fecha` DATE NOT NULL,

    PRIMARY KEY (`id_reporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `servicio` (
    `id_servicio` INTEGER NOT NULL AUTO_INCREMENT,
    `id_cliente` INTEGER NOT NULL,
    `id_tiposervicio` INTEGER NOT NULL,
    `id_equipocliente` INTEGER NOT NULL,
    `id_recursos` INTEGER NOT NULL,
    `id_ingreso` INTEGER NOT NULL,
    `id_reporte` INTEGER NOT NULL,

    UNIQUE INDEX `servicio_id_ingreso_key`(`id_ingreso`),
    PRIMARY KEY (`id_servicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suministro` (
    `id_suministro` INTEGER NOT NULL AUTO_INCREMENT,
    `id_proveedor` INTEGER NOT NULL,
    `id_producto` INTEGER NOT NULL,
    `id_egreso` INTEGER NOT NULL,
    `cantidad` INTEGER NOT NULL,

    UNIQUE INDEX `suministro_id_producto_key`(`id_producto`),
    PRIMARY KEY (`id_suministro`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipocliente` (
    `id_tipocliente` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_tipocliente`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoequipo` (
    `id_tipoequipo` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`id_tipoequipo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipoimpuesto` (
    `id_tipoimpuesto` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id_tipoimpuesto`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tiposervicio` (
    `id_tiposervicio` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` VARCHAR(255) NULL,

    PRIMARY KEY (`id_tiposervicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cliente` ADD CONSTRAINT `cliente_id_tipocliente_fkey` FOREIGN KEY (`id_tipocliente`) REFERENCES `tipocliente`(`id_tipocliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `direccion` ADD CONSTRAINT `direccion_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `empleado` ADD CONSTRAINT `empleado_id_cargo_fkey` FOREIGN KEY (`id_cargo`) REFERENCES `cargo`(`id_cargo`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipocliente` ADD CONSTRAINT `equipocliente_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipocliente` ADD CONSTRAINT `equipocliente_id_direccion_fkey` FOREIGN KEY (`id_direccion`) REFERENCES `direccion`(`id_direccion`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `equipocliente` ADD CONSTRAINT `equipocliente_id_tipoequipo_fkey` FOREIGN KEY (`id_tipoequipo`) REFERENCES `tipoequipo`(`id_tipoequipo`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `gastovarios` ADD CONSTRAINT `gastovarios_id_egreso_fkey` FOREIGN KEY (`id_egreso`) REFERENCES `egreso`(`id_egreso`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagoempleado` ADD CONSTRAINT `pagoempleado_id_egreso_fkey` FOREIGN KEY (`id_egreso`) REFERENCES `egreso`(`id_egreso`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagoempleado` ADD CONSTRAINT `pagoempleado_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id_empleado`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagoimpuesto` ADD CONSTRAINT `pagoimpuesto_id_egreso_fkey` FOREIGN KEY (`id_egreso`) REFERENCES `egreso`(`id_egreso`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `pagoimpuesto` ADD CONSTRAINT `pagoimpuesto_id_tipoimpuesto_fkey` FOREIGN KEY (`id_tipoimpuesto`) REFERENCES `tipoimpuesto`(`id_tipoimpuesto`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria`(`id_categoria`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `producto` ADD CONSTRAINT `producto_id_inventario_fkey` FOREIGN KEY (`id_inventario`) REFERENCES `inventario`(`id_inventario`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_id_empleado_fkey` FOREIGN KEY (`id_empleado`) REFERENCES `empleado`(`id_empleado`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recursos` ADD CONSTRAINT `recursos_id_inventario_fkey` FOREIGN KEY (`id_inventario`) REFERENCES `inventario`(`id_inventario`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_cliente_fkey` FOREIGN KEY (`id_cliente`) REFERENCES `cliente`(`id_cliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_equipocliente_fkey` FOREIGN KEY (`id_equipocliente`) REFERENCES `equipocliente`(`id_equipocliente`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_ingreso_fkey` FOREIGN KEY (`id_ingreso`) REFERENCES `ingreso`(`id_ingreso`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_recursos_fkey` FOREIGN KEY (`id_recursos`) REFERENCES `recursos`(`id_recursos`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_reporte_fkey` FOREIGN KEY (`id_reporte`) REFERENCES `reporte`(`id_reporte`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `servicio` ADD CONSTRAINT `servicio_id_tiposervicio_fkey` FOREIGN KEY (`id_tiposervicio`) REFERENCES `tiposervicio`(`id_tiposervicio`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_id_egreso_fkey` FOREIGN KEY (`id_egreso`) REFERENCES `egreso`(`id_egreso`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_id_producto_fkey` FOREIGN KEY (`id_producto`) REFERENCES `producto`(`id_producto`) ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `suministro` ADD CONSTRAINT `suministro_id_proveedor_fkey` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE RESTRICT ON UPDATE NO ACTION;
