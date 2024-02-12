import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerIdDuplicateChecker } from 'Domain/Models/Beer/BeerId/BeerIdDuplicateChecker'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import Price from 'Domain/Models/Beer/Price/Price'
import { ITransactionManager } from 'UseCase/common/ITransactionManager'

export type RegisterBeerCommand = {
  beerId: string
  name: string
  priceAmount: number
}

export class RegisterBeerUseCase {
  constructor(
    private beerRepository: IBeerRepository,
    private transactionManager: ITransactionManager,
  ) {}

  async execute(command: RegisterBeerCommand) {
    await this.transactionManager.begin(async () => {
      const isDuplicated = await new BeerIdDuplicateChecker(
        this.beerRepository,
      ).execute(new BeerId(command.beerId))

      if (isDuplicated) {
        throw new Error('Its already an existing Beer.')
      }

      const beer = Beer.create(
        new BeerId(command.beerId),
        new BeerName(command.name),
        new Price({ amount: command.priceAmount, currency: 'JPY' }),
      )

      await this.beerRepository.save(beer)
    })
  }
}
