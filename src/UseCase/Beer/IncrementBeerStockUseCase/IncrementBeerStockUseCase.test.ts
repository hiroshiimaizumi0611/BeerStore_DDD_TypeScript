import { InMemoryBeerRepository } from 'Infrastructure/InMemory/Beer/InMemoryBeerRepository'
import { beerTestDataCreator } from 'Infrastructure/common/BeerTestDataCreator'
import { MockTransactionManager } from '../RegisterBeerUseCase/RegisterBeerUseCase.test'
import { IncrementBeerStockUseCase } from './IncrementBeerStockUseCase'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'

describe('IncrementBeerStockUseCase', () => {
  it('在庫が増えること', async () => {
    const repository = new InMemoryBeerRepository()
    const mockManager = new MockTransactionManager()
    const useCase = new IncrementBeerStockUseCase(repository, mockManager)

    const beerId = 'Beer_2022022200'
    await beerTestDataCreator(repository)({ beerId, quantity: 0 })

    await useCase.execute({ beerId, amount: 10 })

    const beer = await repository.find(new BeerId(beerId))
    expect(beer?.getQuantity.getValue).toBe(10)
  })

  it('Beerが存在しない場合はエラーを投げる', async () => {
    const repository = new InMemoryBeerRepository()
    const mockManager = new MockTransactionManager()
    const useCase = new IncrementBeerStockUseCase(repository, mockManager)

    await expect(
      useCase.execute({ beerId: 'Beer_111111111', amount: 10 }),
    ).rejects.toThrow()
  })
})
