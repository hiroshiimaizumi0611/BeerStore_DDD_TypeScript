import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { BeerName } from 'Domain/Models/Beer/BeerName/BeerName'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import Price from 'Domain/Models/Beer/Price/Price'
import { Quantity } from 'Domain/Models/Beer/Stock/Quantity'
import { Status, StatusEnum } from 'Domain/Models/Beer/Stock/Status'
import { Stock } from 'Domain/Models/Beer/Stock/Stock'
import { StockId } from 'Domain/Models/Beer/Stock/StockId'

export const beerTestDataCreator =
  (beerRepository: IBeerRepository) =>
  async ({
    beerId = 'Beer_2938437462',
    beerName = 'ipa',
    price = 1000,
    stockId = 'test-stock-id',
    quantity = 0,
    status = StatusEnum.OutOfStock,
  }): Promise<Beer> => {
    const entity = Beer.reconstruct(
      new BeerId(beerId),
      new BeerName(beerName),
      new Price({ amount: price, currency: 'JPY' }),
      Stock.reconstruct(
        new StockId(stockId),
        new Quantity(quantity),
        new Status(status),
      ),
    )

    await beerRepository.save(entity)

    return entity
  }
