/*
  Warnings:

  - You are about to drop the `Desktops` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Notebooks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Desktops";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Notebooks";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Equipamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoId" INTEGER NOT NULL,
    "modelo" TEXT NOT NULL,
    CONSTRAINT "Equipamentos_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoEquip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TipoEquip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);

-- CreateIndex
CREATE UNIQUE INDEX "Equipamentos_modelo_key" ON "Equipamentos"("modelo");
