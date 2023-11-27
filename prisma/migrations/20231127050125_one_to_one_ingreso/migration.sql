/*
  Warnings:

  - You are about to drop the column `id_servicio` on the `ingreso` table. All the data in the column will be lost.
  - You are about to drop the column `id_servicio` on the `reporte` table. All the data in the column will be lost.
  - Added the required column `id_ingreso` to the `servicio` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ingreso] DROP CONSTRAINT [FK__ingreso__id_serv__0F624AF8];

-- DropForeignKey
ALTER TABLE [dbo].[reporte] DROP CONSTRAINT [FK__reporte__id_serv__17F790F9];

-- DropIndex
ALTER TABLE [dbo].[ingreso] DROP CONSTRAINT [ingreso_id_servicio_key];

-- AlterTable
ALTER TABLE [dbo].[ingreso] DROP COLUMN [id_servicio];

-- AlterTable
ALTER TABLE [dbo].[reporte] DROP COLUMN [id_servicio];

-- AlterTable
ALTER TABLE [dbo].[servicio] ADD [id_ingreso] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__servicio__id_ing__16CE6296] FOREIGN KEY ([id_ingreso]) REFERENCES [dbo].[ingreso]([id_ingreso]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__id_serv__reporte__17F790F9] FOREIGN KEY ([id_servicio]) REFERENCES [dbo].[reporte]([id_reporte]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
