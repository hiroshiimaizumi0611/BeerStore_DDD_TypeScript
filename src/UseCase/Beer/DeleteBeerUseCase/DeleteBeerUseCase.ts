import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import { ITransactionManager } from 'UseCase/common/ITransactionManager'
import { inject, injectable } from 'tsyringe'

export type DeleteBeerCommand = {
  beerId: string
}

@injectable()
export class DeleteBeerUseCase {
  constructor(
    @inject('IBeerRepository')
    private beerRepository: IBeerRepository,
    @inject('ITransactionManager')
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
