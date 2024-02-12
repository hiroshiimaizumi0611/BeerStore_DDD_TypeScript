import { InMemoryBeerRepository } from 'Infrastructure/InMemory/Beer/InMemoryBeerRepository'
import { RegisterBeerCommand, RegisterBeerUseCase } from './RegisterBeerUseCase'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'

export class MockTransactionManager {
  async begin<T>(callback: () => Promise<T>) {
    return await callback()
  }
}

describe('RegisterBeerUseCase', () => {
  it('重複がない場合はビールが作成できること', async () => {
    const repository = new InMemoryBeerRepository()
    const mockManager = new MockTransactionManager()
    const useCase = new RegisterBeerUseCase(repository, mockManager)

    const command: RegisterBeerCommand = {
      beerId: 'Beer_2938437462',
      name: 'ipa',
      priceAmount: 1000,
    }

    await useCase.execute(command)

    const beer = await repository.find(new BeerId(command.beerId))
    expect(beer).not.toBeNull()
  })

  it('重複している場合はエラーを投げる', async () => {
    const repository = new InMemoryBeerRepository()
    const mockManager = new MockTransactionManager()
    const useCase = new RegisterBeerUseCase(repository, mockManager)

    const berId = 'Beer_2222333344'

    const command: RegisterBeerCommand = {
      beerId: berId,
      name: 'ipa',
      priceAmount: 1000,
    }

    await useCase.execute(command)

    await expect(useCase.execute(command)).rejects.toThrow()
  })
})
