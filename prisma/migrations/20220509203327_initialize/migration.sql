-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Desktops" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Notebooks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "modelo" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Tecnicos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Localidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "iata" TEXT NOT NULL,
    "nome" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_username_key" ON "Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Desktops_modelo_key" ON "Desktops"("modelo");

-- CreateIndex
CREATE UNIQUE INDEX "Notebooks_modelo_key" ON "Notebooks"("modelo");

-- CreateIndex
CREATE UNIQUE INDEX "Tecnicos_nome_key" ON "Tecnicos"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "Localidades_iata_key" ON "Localidades"("iata");

-- CreateIndex
CREATE UNIQUE INDEX "Localidades_nome_key" ON "Localidades"("nome");
