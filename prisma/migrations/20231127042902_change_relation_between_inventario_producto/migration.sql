BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[cargo] (
    [id_cargo] INT NOT NULL IDENTITY(1,1),
    [cargo] VARCHAR(255) NOT NULL,
    [descripcion] VARCHAR(255),
    CONSTRAINT [cargo_pkey] PRIMARY KEY CLUSTERED ([id_cargo])
);

-- CreateTable
CREATE TABLE [dbo].[categoria] (
    [id_categoria] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [descripcion] VARCHAR(255),
    CONSTRAINT [categoria_pkey] PRIMARY KEY CLUSTERED ([id_categoria])
);

-- CreateTable
CREATE TABLE [dbo].[cliente] (
    [id_cliente] INT NOT NULL IDENTITY(1,1),
    [id_tipocliente] INT NOT NULL,
    [nombre] VARCHAR(255) NOT NULL,
    [apellido] VARCHAR(255),
    [telefono] VARCHAR(255) NOT NULL,
    CONSTRAINT [cliente_pkey] PRIMARY KEY CLUSTERED ([id_cliente])
);

-- CreateTable
CREATE TABLE [dbo].[direccion] (
    [id_direccion] INT NOT NULL IDENTITY(1,1),
    [direccion] VARCHAR(255) NOT NULL,
    [id_cliente] INT NOT NULL,
    CONSTRAINT [direccion_pkey] PRIMARY KEY CLUSTERED ([id_direccion])
);

-- CreateTable
CREATE TABLE [dbo].[egreso] (
    [id_egreso] INT NOT NULL IDENTITY(1,1),
    [fecha] DATE NOT NULL,
    [monto] INT NOT NULL,
    [detalles] VARCHAR(255) NOT NULL,
    CONSTRAINT [egreso_pkey] PRIMARY KEY CLUSTERED ([id_egreso])
);

-- CreateTable
CREATE TABLE [dbo].[empleado] (
    [id_empleado] INT NOT NULL IDENTITY(1,1),
    [id_cargo] INT NOT NULL,
    [nombre] VARCHAR(255) NOT NULL,
    [telefono] VARCHAR(255) NOT NULL,
    CONSTRAINT [empleado_pkey] PRIMARY KEY CLUSTERED ([id_empleado])
);

-- CreateTable
CREATE TABLE [dbo].[equipocliente] (
    [id_equipocliente] INT NOT NULL IDENTITY(1,1),
    [id_cliente] INT NOT NULL,
    [id_direccion] INT NOT NULL,
    [id_tipoequipo] INT NOT NULL,
    [numerodeserie] VARCHAR(255) NOT NULL,
    [capacidad] VARCHAR(255),
    [tamano] VARCHAR(255),
    CONSTRAINT [equipocliente_pkey] PRIMARY KEY CLUSTERED ([id_equipocliente])
);

-- CreateTable
CREATE TABLE [dbo].[gastovarios] (
    [id_gastosvarios] INT NOT NULL IDENTITY(1,1),
    [id_egreso] INT NOT NULL,
    [descripcion] VARCHAR(255) NOT NULL,
    CONSTRAINT [gastovarios_pkey] PRIMARY KEY CLUSTERED ([id_gastosvarios])
);

-- CreateTable
CREATE TABLE [dbo].[ingreso] (
    [id_ingreso] INT NOT NULL IDENTITY(1,1),
    [id_servicio] INT NOT NULL,
    [monto] INT NOT NULL,
    [detalles] VARCHAR(255) NOT NULL,
    [fecha] DATE NOT NULL,
    CONSTRAINT [ingreso_pkey] PRIMARY KEY CLUSTERED ([id_ingreso])
);

-- CreateTable
CREATE TABLE [dbo].[inventario] (
    [id_inventario] INT NOT NULL IDENTITY(1,1),
    [id_producto] INT NOT NULL,
    [stock] INT NOT NULL,
    CONSTRAINT [inventario_pkey] PRIMARY KEY CLUSTERED ([id_inventario]),
    CONSTRAINT [inventario_id_producto_key] UNIQUE NONCLUSTERED ([id_producto])
);

-- CreateTable
CREATE TABLE [dbo].[pagoempleado] (
    [id_pagoempleado] INT NOT NULL IDENTITY(1,1),
    [id_egreso] INT NOT NULL,
    [id_empleado] INT NOT NULL,
    CONSTRAINT [pagoempleado_pkey] PRIMARY KEY CLUSTERED ([id_pagoempleado])
);

-- CreateTable
CREATE TABLE [dbo].[pagoimpuesto] (
    [id_pagoimpuesto] INT NOT NULL IDENTITY(1,1),
    [id_tipoimpuesto] INT NOT NULL,
    [id_egreso] INT NOT NULL,
    CONSTRAINT [pagoimpuesto_pkey] PRIMARY KEY CLUSTERED ([id_pagoimpuesto])
);

-- CreateTable
CREATE TABLE [dbo].[producto] (
    [id_producto] INT NOT NULL IDENTITY(1,1),
    [id_categoria] INT NOT NULL,
    [nombre] VARCHAR(255) NOT NULL,
    [descripcion] VARCHAR(255),
    CONSTRAINT [producto_pkey] PRIMARY KEY CLUSTERED ([id_producto])
);

-- CreateTable
CREATE TABLE [dbo].[proveedor] (
    [id_proveedor] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [telefono] VARCHAR(255),
    CONSTRAINT [proveedor_pkey] PRIMARY KEY CLUSTERED ([id_proveedor])
);

-- CreateTable
CREATE TABLE [dbo].[recursos] (
    [id_recursos] INT NOT NULL IDENTITY(1,1),
    [id_inventario] INT NOT NULL,
    [id_empleado] INT NOT NULL,
    [cantidad] INT NOT NULL,
    [fecha] DATE NOT NULL,
    CONSTRAINT [recursos_pkey] PRIMARY KEY CLUSTERED ([id_recursos])
);

-- CreateTable
CREATE TABLE [dbo].[reporte] (
    [id_reporte] INT NOT NULL IDENTITY(1,1),
    [id_servicio] INT NOT NULL,
    [detalles] VARCHAR(255) NOT NULL,
    [fecha] DATE NOT NULL,
    CONSTRAINT [reporte_pkey] PRIMARY KEY CLUSTERED ([id_reporte])
);

-- CreateTable
CREATE TABLE [dbo].[servicio] (
    [id_servicio] INT NOT NULL IDENTITY(1,1),
    [id_cliente] INT NOT NULL,
    [id_tiposervicio] INT NOT NULL,
    [id_equipocliente] INT NOT NULL,
    [id_recursos] INT NOT NULL,
    CONSTRAINT [servicio_pkey] PRIMARY KEY CLUSTERED ([id_servicio])
);

-- CreateTable
CREATE TABLE [dbo].[suministro] (
    [id_suministro] INT NOT NULL IDENTITY(1,1),
    [id_proveedor] INT NOT NULL,
    [id_producto] INT NOT NULL,
    [id_egreso] INT NOT NULL,
    [cantidad] INT NOT NULL,
    CONSTRAINT [suministro_pkey] PRIMARY KEY CLUSTERED ([id_suministro])
);

-- CreateTable
CREATE TABLE [dbo].[tipocliente] (
    [id_tipocliente] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(255) NOT NULL,
    CONSTRAINT [tipocliente_pkey] PRIMARY KEY CLUSTERED ([id_tipocliente])
);

-- CreateTable
CREATE TABLE [dbo].[tipoequipo] (
    [id_tipoequipo] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(255) NOT NULL,
    [descripcion] VARCHAR(255),
    CONSTRAINT [tipoequipo_pkey] PRIMARY KEY CLUSTERED ([id_tipoequipo])
);

-- CreateTable
CREATE TABLE [dbo].[tipoimpuesto] (
    [id_tipoimpuesto] INT NOT NULL IDENTITY(1,1),
    [tipo] VARCHAR(255) NOT NULL,
    CONSTRAINT [tipoimpuesto_pkey] PRIMARY KEY CLUSTERED ([id_tipoimpuesto])
);

-- CreateTable
CREATE TABLE [dbo].[tiposervicio] (
    [id_tiposervicio] INT NOT NULL IDENTITY(1,1),
    [nombre] VARCHAR(255) NOT NULL,
    [descripcion] VARCHAR(255),
    CONSTRAINT [tiposervicio_pkey] PRIMARY KEY CLUSTERED ([id_tiposervicio])
);

-- CreateTable
CREATE TABLE [dbo].[sysdiagrams] (
    [name] NVARCHAR(128) NOT NULL,
    [principal_id] INT NOT NULL,
    [diagram_id] INT NOT NULL IDENTITY(1,1),
    [version] INT,
    [definition] VARBINARY(max),
    CONSTRAINT [PK__sysdiagr__C2B05B610A89338C] PRIMARY KEY CLUSTERED ([diagram_id]),
    CONSTRAINT [UK_principal_name] UNIQUE NONCLUSTERED ([principal_id],[name])
);

-- AddForeignKey
ALTER TABLE [dbo].[cliente] ADD CONSTRAINT [FK__cliente__id_tipo__08B54D69] FOREIGN KEY ([id_tipocliente]) REFERENCES [dbo].[tipocliente]([id_tipocliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[direccion] ADD CONSTRAINT [FK__direccion__id_cl__09A971A2] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[cliente]([id_cliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[empleado] ADD CONSTRAINT [FK__empleado__id_car__0A9D95DB] FOREIGN KEY ([id_cargo]) REFERENCES [dbo].[cargo]([id_cargo]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipocliente] ADD CONSTRAINT [FK__equipocli__id_cl__0B91BA14] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[cliente]([id_cliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipocliente] ADD CONSTRAINT [FK__equipocli__id_di__0C85DE4D] FOREIGN KEY ([id_direccion]) REFERENCES [dbo].[direccion]([id_direccion]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[equipocliente] ADD CONSTRAINT [FK__equipocli__id_ti__0D7A0286] FOREIGN KEY ([id_tipoequipo]) REFERENCES [dbo].[tipoequipo]([id_tipoequipo]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[gastovarios] ADD CONSTRAINT [FK__gastovari__id_eg__0E6E26BF] FOREIGN KEY ([id_egreso]) REFERENCES [dbo].[egreso]([id_egreso]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[ingreso] ADD CONSTRAINT [FK__ingreso__id_serv__0F624AF8] FOREIGN KEY ([id_servicio]) REFERENCES [dbo].[servicio]([id_servicio]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[inventario] ADD CONSTRAINT [FK__inventari__id_pr__10566F31] FOREIGN KEY ([id_producto]) REFERENCES [dbo].[producto]([id_producto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pagoempleado] ADD CONSTRAINT [FK__pagoemple__id_eg__114A936A] FOREIGN KEY ([id_egreso]) REFERENCES [dbo].[egreso]([id_egreso]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pagoempleado] ADD CONSTRAINT [FK__pagoemple__id_em__123EB7A3] FOREIGN KEY ([id_empleado]) REFERENCES [dbo].[empleado]([id_empleado]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pagoimpuesto] ADD CONSTRAINT [FK__pagoimpue__id_eg__1332DBDC] FOREIGN KEY ([id_egreso]) REFERENCES [dbo].[egreso]([id_egreso]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[pagoimpuesto] ADD CONSTRAINT [FK__pagoimpue__id_ti__14270015] FOREIGN KEY ([id_tipoimpuesto]) REFERENCES [dbo].[tipoimpuesto]([id_tipoimpuesto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[producto] ADD CONSTRAINT [FK__producto__id_cat__151B244E] FOREIGN KEY ([id_categoria]) REFERENCES [dbo].[categoria]([id_categoria]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[recursos] ADD CONSTRAINT [FK__recursos__id_emp__160F4887] FOREIGN KEY ([id_empleado]) REFERENCES [dbo].[empleado]([id_empleado]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[recursos] ADD CONSTRAINT [FK__recursos__id_inv__17036CC0] FOREIGN KEY ([id_inventario]) REFERENCES [dbo].[inventario]([id_inventario]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[reporte] ADD CONSTRAINT [FK__reporte__id_serv__17F790F9] FOREIGN KEY ([id_servicio]) REFERENCES [dbo].[servicio]([id_servicio]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__servicio__id_cli__18EBB532] FOREIGN KEY ([id_cliente]) REFERENCES [dbo].[cliente]([id_cliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__servicio__id_equ__19DFD96B] FOREIGN KEY ([id_equipocliente]) REFERENCES [dbo].[equipocliente]([id_equipocliente]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__servicio__id_rec__1AD3FDA4] FOREIGN KEY ([id_recursos]) REFERENCES [dbo].[recursos]([id_recursos]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__servicio__id_tip__1BC821DD] FOREIGN KEY ([id_tiposervicio]) REFERENCES [dbo].[tiposervicio]([id_tiposervicio]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[suministro] ADD CONSTRAINT [FK__suministr__id_eg__1CBC4616] FOREIGN KEY ([id_egreso]) REFERENCES [dbo].[egreso]([id_egreso]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[suministro] ADD CONSTRAINT [FK__suministr__id_pr__1DB06A4F] FOREIGN KEY ([id_proveedor]) REFERENCES [dbo].[proveedor]([id_proveedor]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[suministro] ADD CONSTRAINT [FK__suministr__id_pr__1EA48E88] FOREIGN KEY ([id_producto]) REFERENCES [dbo].[producto]([id_producto]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
