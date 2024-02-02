import { ValueObject } from 'Domain/Models/common/ValueObject'

export class Quantity extends ValueObject<number, 'Quantity'> {
  static readonly MAX: number = 10000
  static readonly MIN: number = 0

  constructor(value: number) {
    super(value)
  }

  protected validate(value: number): void {
    if (value < Quantity.MIN || value > Quantity.MAX) {
      throw new Error(
        `The quantity must be between ${Quantity.MIN} and ${Quantity.MAX}.`,
      )
    }
  }

  increment(amount: number): Quantity {
    const newValue = this._value + amount
    this.validate(newValue)
    return new Quantity(newValue)
  }

  decrement(amount: number): Quantity {
    const newValue = this._value - amount
    this.validate(newValue)
    return new Quantity(newValue)
  }
}
