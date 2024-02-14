import BeerId from "Domain/Models/Beer/BeerId/BeerId"
import { IBeerRepository } from "Domain/Models/Beer/IBeerRepository"
import { ITransactionManager } from "UseCase/common/ITransactionManager"

type IncrementBeerStockCommand = {
    beerId: string
    amount: number
}
export class IncrementBeerStockUseCase {
    constructor(private beerRepository: IBeerRepository, private transactionManager: ITransactionManager) {}

    async execute(command: IncrementBeerStockCommand): Promise<void> {
        await this.transactionManager.begin(async () => {
            const beer = await this.beerRepository.find(new BeerId(command.beerId))
            if (!beer) throw new Error('Beer not found')

            beer.incrementStock(command.amount)
            await this.beerRepository.update(beer)
        })
    }
}
