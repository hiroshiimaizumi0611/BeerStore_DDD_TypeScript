import { PrismaClient } from '@prisma/client'
import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import Price from 'Domain/Models/Beer/Price/Price'
import { BeerRepository } from './BeerRepository'
import { PrismaClientManager } from '../PrismaClientManager'

const prisma = new PrismaClient()

describe('BeerRepository', () => {
  beforeEach(async () => {
    await prisma.$transaction([prisma.beer.deleteMany()])
    await prisma.$disconnect()
  })

  const clientManager = new PrismaClientManager;
  const repository = new BeerRepository(clientManager)

  test('save and find', async () => {
    const beer = Beer.create(
      new BeerId('Beer_2024020200'),
      new BeerName('ipa'),
      new Price({ amount: 1000, currency: 'JPY' }),
    )
    await repository.save(beer)

    const entity = await repository.find(beer.getBeerId)
    expect(entity?.getBeerId.getValue).toBe(beer.getBeerId.getValue)
    expect(entity?.getBeerName.getValue).toBe(beer.getBeerName.getValue)
    expect(entity?.getPrice.getAmount).toBe(beer.getPrice.getAmount)
    expect(entity?.getStockId.getValue).toBe(beer.getStockId.getValue)
    expect(entity?.getQuantity.getValue).toBe(beer.getQuantity.getValue)
    expect(entity?.getStatus.getValue).toBe(beer.getStatus.getValue)
  })

  // to be continued...
})
