/*
  Warnings:

  - You are about to drop the column `tipoId` on the `TipoEquip` table. All the data in the column will be lost.
  - Added the required column `nome_tipo` to the `TipoEquip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoId` to the `Equipamentos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TipoEquip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome_tipo" TEXT NOT NULL
);
INSERT INTO "new_TipoEquip" ("id") SELECT "id" FROM "TipoEquip";
DROP TABLE "TipoEquip";
ALTER TABLE "new_TipoEquip" RENAME TO "TipoEquip";
CREATE UNIQUE INDEX "TipoEquip_nome_tipo_key" ON "TipoEquip"("nome_tipo");
CREATE TABLE "new_Equipamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipoId" INTEGER NOT NULL,
    "modelo" TEXT NOT NULL,
    CONSTRAINT "Equipamentos_tipoId_fkey" FOREIGN KEY ("tipoId") REFERENCES "TipoEquip" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Equipamentos" ("id", "modelo") SELECT "id", "modelo" FROM "Equipamentos";
DROP TABLE "Equipamentos";
ALTER TABLE "new_Equipamentos" RENAME TO "Equipamentos";
CREATE UNIQUE INDEX "Equipamentos_modelo_key" ON "Equipamentos"("modelo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
