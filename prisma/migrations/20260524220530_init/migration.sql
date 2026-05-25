/*
  Warnings:

  - You are about to drop the `PushSubscription` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Score` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PushSubscription";

-- DropTable
DROP TABLE "Score";

-- CreateTable
CREATE TABLE "Puntuacion" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "puntos" INTEGER NOT NULL,
    "pantalla" INTEGER NOT NULL,
    "dificultad" INTEGER NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Puntuacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuscripcionPush" (
    "id" SERIAL NOT NULL,
    "endpoint" TEXT NOT NULL,
    "auth" TEXT NOT NULL,
    "p256dh" TEXT NOT NULL,
    "creadoEn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SuscripcionPush_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Puntuacion_puntos_idx" ON "Puntuacion"("puntos");

-- CreateIndex
CREATE UNIQUE INDEX "SuscripcionPush_endpoint_key" ON "SuscripcionPush"("endpoint");
