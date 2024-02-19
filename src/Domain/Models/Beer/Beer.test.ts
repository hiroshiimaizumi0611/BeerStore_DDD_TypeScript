import { Beer } from './Beer'
import BeerId from './BeerId/BeerId'
import { BeerName } from './BeerName/BeerName'
import Price from './Price/Price'
import { Quantity } from './Stock/Quantity'
import { Status, StatusEnum } from './Stock/Status'
import { Stock } from './Stock/Stock'
import { StockId } from './Stock/StockId'
import { BEER_EVENT_NAME } from 'Domain/common/DomainEvent/Beer/BeerDomainEventFactory'

describe('Book', () => {
  const stockId = new StockId()
  const quantity = new Quantity(100)
  const status = new Status(StatusEnum.InStock)
  const stock = Stock.reconstruct(stockId, quantity, status)

  const beerId = new BeerId('Beer_2023020300')
  const beerName = new BeerName('ipa')
  const price = new Price({
    amount: 1000,
    currency: 'JPY',
  })

  describe('create', () => {
    it('ドメインイベントが生成されていること', () => {
      const beer = Beer.create(beerId, beerName, price)
      expect(beer.getDomainEvents()[0].eventName).toBe(BEER_EVENT_NAME.CREATED)
    })
  })

  describe('incrementStock', () => {
    it('stock.incrementQuantityが呼ばれているか', () => {
      const beer = Beer.reconstruct(beerId, beerName, price, stock)
      const spy = jest.spyOn(stock, 'incrementQuantity')
      beer.incrementStock(20)
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('decrementStock', () => {
    it('stock.decrementQuantityが呼ばれているか', () => {
      const book = Beer.reconstruct(beerId, beerName, price, stock)
      const spy = jest.spyOn(stock, 'decrementQuantity')
      book.decrementStock(20)
      expect(spy).toHaveBeenCalled()
    })
  })
})
