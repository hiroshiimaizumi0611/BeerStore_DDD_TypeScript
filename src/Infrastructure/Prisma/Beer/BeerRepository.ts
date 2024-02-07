import { $Enums, PrismaClient } from '@prisma/client'
import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import Price from 'Domain/Models/Beer/Price/Price'
import { Quantity } from 'Domain/Models/Beer/Stock/Quantity'
import { Status, StatusEnum } from 'Domain/Models/Beer/Stock/Status'
import { Stock } from 'Domain/Models/Beer/Stock/Stock'
import { StockId } from 'Domain/Models/Beer/Stock/StockId'

const prisma = new PrismaClient()

export class BeerRepository implements IBeerRepository {
  async save(beer: Beer): Promise<void> {
    await prisma.beer.create({
      data: {
        beerId: beer.getBeerId.getValue,
        beerName: beer.getBeerName.getValue,
        price: beer.getPrice.getAmount,
        stock: {
          create: {
            stockId: beer.getStockId.getValue,
            quantity: beer.getQuantity.getValue,
            status: this.statusMapper(beer.getStatus.getValue),
          },
        },
      },
    })
  }

  async update(beer: Beer): Promise<void> {
    await prisma.beer.update({
      where: { beerId: beer.getBeerId.getValue },
      data: {
        beerName: beer.getBeerName.getValue,
        price: beer.getPrice.getAmount,
        stock: {
          update: {
            quantity: beer.getQuantity.getValue,
            status: this.statusMapper(beer.getStatus.getValue),
          },
        },
      },
    })
  }

  async delete(beerId: BeerId): Promise<void> {
    await prisma.beer.delete({ where: { beerId: beerId.getValue } })
  }

  async find(beerId: BeerId): Promise<Beer | null> {
    const beer = await prisma.beer.findUnique({
      where: { beerId: beerId.getValue },
      include: { stock: true },
    })

    if (!beer || !beer.stock) return null

    return Beer.reconstruct(
      new BeerId(beer.beerId),
      new BeerName(beer.beerName),
      new Price({ amount: beer.price, currency: 'JPY' }),
      Stock.reconstruct(
        new StockId(beer.stock.stockId),
        new Quantity(beer.stock.quantity),
        this.statusEnumMapper(beer.stock.status),
      ),
    )
  }

  private statusMapper(
    status: StatusEnum,
  ): 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' {
    switch (status) {
      case StatusEnum.InStock:
        return 'IN_STOCK'
      case StatusEnum.LowStock:
        return 'LOW_STOCK'
      case StatusEnum.OutOfStock:
        return 'OUT_OF_STOCK'
    }
  }

  private statusEnumMapper(status: $Enums.Status): Status {
    switch (status) {
      case 'IN_STOCK':
        return new Status(StatusEnum.InStock)
      case 'LOW_STOCK':
        return new Status(StatusEnum.LowStock)
      case 'OUT_OF_STOCK':
        return new Status(StatusEnum.OutOfStock)
    }
  }
}
