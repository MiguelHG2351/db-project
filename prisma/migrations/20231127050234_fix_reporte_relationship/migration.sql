/*
  Warnings:

  - Added the required column `id_reporte` to the `servicio` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[servicio] DROP CONSTRAINT [FK__id_serv__reporte__17F790F9];

-- AlterTable
ALTER TABLE [dbo].[servicio] ADD [id_reporte] INT NOT NULL;

-- AddForeignKey
ALTER TABLE [dbo].[servicio] ADD CONSTRAINT [FK__id_serv__reporte__17F790F9] FOREIGN KEY ([id_reporte]) REFERENCES [dbo].[reporte]([id_reporte]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
