/*
  Warnings:

  - A unique constraint covering the columns `[id_servicio]` on the table `ingreso` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- CreateIndex
ALTER TABLE [dbo].[ingreso] ADD CONSTRAINT [ingreso_id_servicio_key] UNIQUE NONCLUSTERED ([id_servicio]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
