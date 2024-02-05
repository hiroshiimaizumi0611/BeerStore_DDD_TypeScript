import { InMemoryBeerRepository } from 'Infrastructure/InMemory/Beer/InMemoryBeerRepository'
import { BeerIdDuplicateChecker } from './BeerIdDuplicateChecker'
import BeerId from './BeerId'
import { BeerName } from '../BeerName/BeerName'
import Price from '../Price/Price'
import { Beer } from '../Beer'

describe('BeerIdDuplicateChecker', () => {
  let checker: BeerIdDuplicateChecker
  let inMemoryBeerRepository: InMemoryBeerRepository

  beforeEach(() => {
    inMemoryBeerRepository = new InMemoryBeerRepository()
    checker = new BeerIdDuplicateChecker(inMemoryBeerRepository)
  })

  test('重複がある場合はtrueが返却されること', async () => {
    const beerId = new BeerId('Beer_2023020311')
    const beerName = new BeerName('ipa')
    const price = new Price({ amount: 1000, currency: 'JPY' })
    const beer = Beer.create(beerId, beerName, price)

    await inMemoryBeerRepository.save(beer)

    const result = await checker.execute(beerId)
    expect(result).toBeTruthy()
  })

  test('重複がない場合はfalseが返却されること', async () => {
    const beerId = new BeerId('Beer_2023020311')
    const result = await checker.execute(beerId)
    expect(result).toBeFalsy
  })
})
