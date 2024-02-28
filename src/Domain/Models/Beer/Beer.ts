import { DomainEventStorable } from 'Domain/common/DomainEvent/DomainEventStorable'
import BeerId from './BeerId/BeerId'
import { BeerName } from './BeerName/BeerName'
import Price from './Price/Price'
import { StatusEnum } from './Stock/Status'
import { Stock } from './Stock/Stock'
import {
  BEER_EVENT_NAME,
  BeerDomainEventFactory,
} from 'Domain/common/DomainEvent/Beer/BeerDomainEventFactory'

export class Beer extends DomainEventStorable {
  private constructor(
    private readonly beerId: BeerId,
    private beerName: BeerName,
    private price: Price,
    private readonly stock: Stock,
  ) {
    super()
  }

  static create(beerId: BeerId, beerName: BeerName, price: Price) {
    const beer = new Beer(beerId, beerName, price, Stock.create())
    beer.addDomainevent(
      new BeerDomainEventFactory(beer).createEvent(BEER_EVENT_NAME.CREATED),
    )

    return beer
  }

  static reconstruct(
    beerId: BeerId,
    beerName: BeerName,
    price: Price,
    stock: Stock,
  ) {
    return new Beer(beerId, beerName, price, stock)
  }

  delete() {
    this.stock.delete()
    this.addDomainevent(
      new BeerDomainEventFactory(this).createEvent(BEER_EVENT_NAME.DELETED),
    )
  }

  updateBeerName(beerName: BeerName) {
    this.beerName = beerName
  }

  updatePrice(price: Price) {
    this.price = price
  }

  isSaleable() {
    return (
      this.stock.getQuantity.getValue > 0 &&
      this.stock.getStatus.getValue !== StatusEnum.OutOfStock
    )
  }

  incrementStock(amount: number) {
    this.stock.incrementQuantity(amount)
  }

  decrementStock(amount: number) {
    this.stock.decrementQuantity(amount)

    if (this.getStatus.getValue === StatusEnum.OutOfStock) {
      this.addDomainevent(
        new BeerDomainEventFactory(this).createEvent(BEER_EVENT_NAME.DELETED),
      )
    }
  }

  get getBeerId(): BeerId {
    return this.beerId
  }

  get getBeerName(): BeerName {
    return this.beerName
  }

  get getPrice(): Price {
    return this.price
  }

  get getStockId() {
    return this.stock.getStockId
  }

  get getQuantity() {
    return this.stock.getQuantity
  }

  get getStatus() {
    return this.stock.getStatus
  }
}
