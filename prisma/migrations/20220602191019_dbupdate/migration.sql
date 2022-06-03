/*
  Warnings:

  - You are about to drop the column `tipoId` on the `Equipamentos` table. All the data in the column will be lost.
  - You are about to drop the column `nome_tipo` on the `TipoEquip` table. All the data in the column will be lost.
  - You are about to drop the column `equip_new_nome` on the `TermoResp` table. All the data in the column will be lost.
  - You are about to drop the column `equip_old_nome` on the `TermoResp` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[iata_nome]` on the table `Localidades` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tipo` to the `Equipamentos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `TipoEquip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equip_new_entregue_perif` to the `TermoResp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equip_new_modelo` to the `TermoResp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equip_old_recolhido_perif` to the `TermoResp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario_departamento` to the `TermoResp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Localidades" ADD COLUMN "iata_nome" TEXT;

-- CreateTable
CREATE TABLE "Perifericos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "estoque" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Emails" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Equipamentos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "modelo" TEXT NOT NULL
);
INSERT INTO "new_Equipamentos" ("id", "modelo") SELECT "id", "modelo" FROM "Equipamentos";
DROP TABLE "Equipamentos";
ALTER TABLE "new_Equipamentos" RENAME TO "Equipamentos";
CREATE UNIQUE INDEX "Equipamentos_modelo_key" ON "Equipamentos"("modelo");
CREATE TABLE "new_TipoEquip" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL
);
INSERT INTO "new_TipoEquip" ("id") SELECT "id" FROM "TipoEquip";
DROP TABLE "TipoEquip";
ALTER TABLE "new_TipoEquip" RENAME TO "TipoEquip";
CREATE UNIQUE INDEX "TipoEquip_tipo_key" ON "TipoEquip"("tipo");
CREATE TABLE "new_TermoResp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ticket" INTEGER NOT NULL,
    "datahora" DATETIME NOT NULL,
    "motivo" TEXT NOT NULL,
    "usuario_nome" TEXT NOT NULL,
    "usuario_email" TEXT NOT NULL,
    "usuario_bp" INTEGER NOT NULL,
    "usuario_departamento" TEXT NOT NULL,
    "usuario_localidade" TEXT NOT NULL,
    "tecnico_nome" TEXT NOT NULL,
    "tecnico_email" TEXT NOT NULL,
    "equip_new_tipo" TEXT NOT NULL,
    "equip_new_modelo" TEXT NOT NULL,
    "equip_new_serial" TEXT NOT NULL,
    "equip_new_patrimonio" TEXT NOT NULL,
    "equip_new_entregue_perif" BOOLEAN NOT NULL,
    "equip_new_perifericos" TEXT,
    "equip_old_recolhido" BOOLEAN NOT NULL,
    "equip_old_recolhido_motivo" TEXT,
    "equip_old_tipo" TEXT,
    "equip_old_modelo" TEXT,
    "equip_old_serial" TEXT,
    "equip_old_patrimonio" TEXT,
    "equip_old_recolhido_perif" BOOLEAN NOT NULL,
    "equip_old_perifericos" TEXT
);
INSERT INTO "new_TermoResp" ("datahora", "equip_new_patrimonio", "equip_new_perifericos", "equip_new_serial", "equip_new_tipo", "equip_old_patrimonio", "equip_old_perifericos", "equip_old_recolhido", "equip_old_serial", "equip_old_tipo", "id", "motivo", "tecnico_email", "tecnico_nome", "ticket", "usuario_bp", "usuario_email", "usuario_localidade", "usuario_nome") SELECT "datahora", "equip_new_patrimonio", "equip_new_perifericos", "equip_new_serial", "equip_new_tipo", "equip_old_patrimonio", "equip_old_perifericos", "equip_old_recolhido", "equip_old_serial", "equip_old_tipo", "id", "motivo", "tecnico_email", "tecnico_nome", "ticket", "usuario_bp", "usuario_email", "usuario_localidade", "usuario_nome" FROM "TermoResp";
DROP TABLE "TermoResp";
ALTER TABLE "new_TermoResp" RENAME TO "TermoResp";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Perifericos_nome_key" ON "Perifericos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Emails_email_key" ON "Emails"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Localidades_iata_nome_key" ON "Localidades"("iata_nome");
