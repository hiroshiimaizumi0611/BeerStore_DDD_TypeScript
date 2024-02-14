import { InMemoryBeerRepository } from 'Infrastructure/InMemory/Beer/InMemoryBeerRepository'
import { MockTransactionManager } from '../RegisterBeerUseCase/RegisterBeerUseCase.test'
import { DeleteBeerUseCase } from './DeleteBeerUseCase'
import { beerTestDataCreator } from 'Infrastructure/common/BeerTestDataCreator'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'

describe('DeleteBeerUseCase', () => {
  it('ビールの削除ができること', async () => {
    const repository = new InMemoryBeerRepository()
    const mockTransactionManager = new MockTransactionManager()
    const deleteBeerUseCase = new DeleteBeerUseCase(
      repository,
      mockTransactionManager,
    )

    const beerId = 'Beer_2034543211'
    await beerTestDataCreator(repository)({
      beerId,
    })

    const command = { beerId }
    await deleteBeerUseCase.execute(command)

    const deletedBeer = await repository.find(new BeerId(beerId))
    expect(deletedBeer).toBeNull
  })
})
