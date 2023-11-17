/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_servicio]` on the table `ingreso` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_servicio]` on the table `reporte` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
CREATE SEQUENCE tipoequipo_id_tipoequipo_seq;
ALTER TABLE "tipoequipo" ALTER COLUMN "id_tipoequipo" SET DEFAULT nextval('tipoequipo_id_tipoequipo_seq');
ALTER SEQUENCE tipoequipo_id_tipoequipo_seq OWNED BY "tipoequipo"."id_tipoequipo";

-- DropTable
DROP TABLE "post";

-- CreateIndex
CREATE UNIQUE INDEX "ingreso_id_servicio_key" ON "ingreso"("id_servicio");

-- CreateIndex
CREATE UNIQUE INDEX "reporte_id_servicio_key" ON "reporte"("id_servicio");
