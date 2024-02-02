import { Quantity } from './Quantity'
import { Status, StatusEnum } from './Status'
import { StockId } from './StockId'

export class Stock {
  private constructor(
    private readonly stockId: StockId,
    private quantity: Quantity,
    private status: Status,
  ) {}

  static create() {
    const stockId = new StockId()
    const quantity = new Quantity(0)
    const status = new Status(StatusEnum.OutOfStock)

    return new Stock(stockId, quantity, status)
  }

  static reconstruct(stockId: StockId, quantity: Quantity, status: Status) {
    return new Stock(stockId, quantity, status)
  }

  delete() {
    if (this.status.getValue !== StatusEnum.OutOfStock) {
      throw new Error('Cannot be deleted if there is stock.')
    }
  }

  public updateStatus(status: Status) {
    this.status = status
  }

  public updateQuantity(quantity: Quantity) {
    this.quantity = quantity
  }

  incrementQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('The increment must be greater than or equal to 0.')
    }

    const newQuantity = this.quantity.increment(amount).getValue

    this.quantity = new Quantity(newQuantity)

    if (newQuantity <= 10) {
      this.updateStatus(new Status(StatusEnum.LowStock))
    }
  }

  decrementQuantity(amount: number) {
    if (amount < 0) {
      throw new Error('The decrement must be greater than or equal to 0.')
    }

    const newQuantity = this.quantity.decrement(amount).getValue

    if (newQuantity < 0) {
      throw new Error(
        'The stock quantity will become less than 0 after the reduction.',
      )
    }

    this.quantity = new Quantity(newQuantity)

    if (newQuantity <= 10) {
      this.updateStatus(new Status(StatusEnum.LowStock))
    }

    // 在庫数が0になったらステータスを在庫切れにする
    if (newQuantity === 0) {
      this.updateStatus(new Status(StatusEnum.OutOfStock))
    }
  }

  get getStockId(): StockId {
    return this.stockId
  }

  get getQuantity(): Quantity {
    return this.quantity
  }

  get getStatus(): Status {
    return this.status
  }
}
