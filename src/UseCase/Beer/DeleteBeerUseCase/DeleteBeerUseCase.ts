import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import { ITransactionManager } from 'UseCase/common/ITransactionManager'

export type DeleteBeerCommand = {
  beerId: string
}

export class DeleteBeerUseCase {
  constructor(
    private beerRepository: IBeerRepository,
    private transactionManager: ITransactionManager,
  ) {}

  async execute(command: DeleteBeerCommand): Promise<void> {
    await this.transactionManager.begin(async () => {
      const beer = await this.beerRepository.find(new BeerId(command.beerId))

      if (!beer) throw new Error('Beer is not found.')

      beer.delete()

      await this.beerRepository.delete(beer.getBeerId)
    })
  }
}
