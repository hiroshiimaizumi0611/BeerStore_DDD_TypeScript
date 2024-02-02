import { ValueObject } from 'Domain/Models/common/ValueObject'
import { nanoid } from 'nanoid'

export class StockId extends ValueObject<string, 'StockId'> {
  static readonly MAX_LENGTH = 100
  static readonly MIN_LENGTH = 1

  constructor(value: string = nanoid()) {
    super(value)
  }

  protected validate(value: string): void {
    if (
      value.length < StockId.MIN_LENGTH ||
      value.length > StockId.MAX_LENGTH
    ) {
      throw new Error(
        `The StockId must be at least ${StockId.MIN_LENGTH} characters and no more than ${StockId.MAX_LENGTH} characters long.`,
      )
    }
  }
}
