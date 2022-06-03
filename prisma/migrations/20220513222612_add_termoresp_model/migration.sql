-- DropIndex
DROP INDEX "Tecnicos_nome_key";

-- CreateTable
CREATE TABLE "TermoResp" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "ticket" INTEGER NOT NULL,
    "datahora" DATETIME NOT NULL,
    "motivo" TEXT NOT NULL,
    "usuario_nome" TEXT NOT NULL,
    "usuario_email" TEXT NOT NULL,
    "usuario_bp" INTEGER NOT NULL,
    "usuario_localidade" TEXT NOT NULL,
    "tecnico_nome" TEXT NOT NULL,
    "tecnico_email" TEXT NOT NULL,
    "equip_new_nome" TEXT NOT NULL,
    "equip_new_tipo" TEXT NOT NULL,
    "equip_new_serial" TEXT NOT NULL,
    "equip_new_patrimonio" TEXT NOT NULL,
    "equip_new_perifericos" TEXT NOT NULL,
    "equip_old_recolhido" BOOLEAN NOT NULL,
    "equip_old_nome" TEXT,
    "equip_old_tipo" TEXT,
    "equip_old_serial" TEXT,
    "equip_old_patrimonio" TEXT,
    "equip_old_perifericos" TEXT
);
