/*
  Warnings:

  - You are about to drop the column `cidade` on the `Localidades` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Localidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "iata" TEXT NOT NULL
);
INSERT INTO "new_Localidades" ("iata", "id", "nome") SELECT "iata", "id", "nome" FROM "Localidades";
DROP TABLE "Localidades";
ALTER TABLE "new_Localidades" RENAME TO "Localidades";
CREATE UNIQUE INDEX "Localidades_nome_key" ON "Localidades"("nome");
CREATE UNIQUE INDEX "Localidades_iata_key" ON "Localidades"("iata");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
