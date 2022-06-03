/*
  Warnings:

  - Added the required column `iata_nome` to the `Localidades` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Localidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "iata" TEXT NOT NULL,
    "iata_nome" TEXT NOT NULL
);
INSERT INTO "new_Localidades" ("iata", "id", "nome") SELECT "iata", "id", "nome" FROM "Localidades";
DROP TABLE "Localidades";
ALTER TABLE "new_Localidades" RENAME TO "Localidades";
CREATE UNIQUE INDEX "Localidades_nome_key" ON "Localidades"("nome");
CREATE UNIQUE INDEX "Localidades_iata_key" ON "Localidades"("iata");
CREATE UNIQUE INDEX "Localidades_iata_nome_key" ON "Localidades"("iata_nome");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
