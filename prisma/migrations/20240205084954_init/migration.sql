-- CreateEnum
CREATE TYPE "Status" AS ENUM ('IN_STOCK', 'LOW_STOCK', 'OUT_OF_STOCK');

-- CreateTable
CREATE TABLE "Beer" (
    "beerId" TEXT NOT NULL,
    "beerName" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Beer_pkey" PRIMARY KEY ("beerId")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stockId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'OUT_OF_STOCK',
    "beerId" TEXT NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stockId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Stock_beerId_key" ON "Stock"("beerId");

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_beerId_fkey" FOREIGN KEY ("beerId") REFERENCES "Beer"("beerId") ON DELETE CASCADE ON UPDATE CASCADE;
