import BeerId from './BeerId/BeerId'
import { BeerName } from './BeerName/BeerName'
import Price from './Price/Price'
import { StatusEnum } from './Stock/Status'
import { Stock } from './Stock/Stock'

export class Beer {
  private constructor(
    private readonly beerId: BeerId,
    private beerName: BeerName,
    private price: Price,
    private readonly stock: Stock,
  ) {}

  static create(beerId: BeerId, beerName: BeerName, price: Price) {
    return new Beer(beerId, beerName, price, Stock.create())
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
