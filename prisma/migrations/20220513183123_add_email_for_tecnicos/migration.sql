/*
  Warnings:

  - Added the required column `email` to the `Tecnicos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_Tecnicos" ("id", "nome") SELECT "id", "nome" FROM "Tecnicos";
DROP TABLE "Tecnicos";
ALTER TABLE "new_Tecnicos" RENAME TO "Tecnicos";
CREATE UNIQUE INDEX "Tecnicos_nome_key" ON "Tecnicos"("nome");
CREATE UNIQUE INDEX "Tecnicos_email_key" ON "Tecnicos"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
