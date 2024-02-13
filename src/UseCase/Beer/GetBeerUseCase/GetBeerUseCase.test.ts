import { InMemoryBeerRepository } from 'Infrastructure/InMemory/Beer/InMemoryBeerRepository'
import { GetBeerUseCase } from './GetBeerUseCase'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import Price from 'Domain/Models/Beer/Price/Price'
import { Beer } from 'Domain/Models/Beer/Beer'
import { BeerDto } from '../BeerDto'

describe('GetBeerUseCase', () => {
  it('Beerが存在しない場合はnullが返却される', async () => {
    const repository = new InMemoryBeerRepository()
    const useCase = new GetBeerUseCase(repository)

    const data = await useCase.execute('Beer_111111111')

    expect(data).toBeNull()
  })

  it('Beerが存在する場合はdtoが返却される', async () => {
    const repository = new InMemoryBeerRepository()
    const beerId = new BeerId('Beer_2022022200')
    const beerName = new BeerName('ipa')
    const price = new Price({ amount: 10000, currency: 'JPY' })
    const beer = Beer.create(beerId, beerName, price)
    await repository.save(beer)

    const useCase = new GetBeerUseCase(repository)
    const data = await useCase.execute(beerId.getValue)

    expect(data).toEqual(new BeerDto(beer))
  })
})
