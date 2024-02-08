import { PrismaClient } from '@prisma/client'
import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import Price from 'Domain/Models/Beer/Price/Price'
import { BeerRepository } from './BeerRepository'

const prisma = new PrismaClient()

describe('BeerRepository', () => {
  beforeEach(async () => {
    await prisma.$transaction([prisma.beer.deleteMany()])
    await prisma.$disconnect()
  })

  const repository = new BeerRepository()

  test('save and find', async () => {
    const beer = Beer.create(
      new BeerId('Beer_2024020200'),
      new BeerName('ipa'),
      new Price({ amount: 1000, currency: 'JPY' }),
    )
    await repository.save(beer)

    const entity = await repository.find(beer.getBeerId)
    expect(entity?.getBeerId.getValue).toBe(beer.getBeerId)
    expect(entity?.getBeerName.getValue).toBe(beer.getBeerName)
    expect(entity?.getPrice.getAmount).toBe(beer.getPrice.getAmount)
    expect(entity?.getStockId.getValue).toBe(beer.getStockId)
    expect(entity?.getQuantity.getValue).toBe(beer.getQuantity)
    expect(entity?.getStatus.getValue).toBe(beer.getStatus)
  })

  // to be continued...
})
