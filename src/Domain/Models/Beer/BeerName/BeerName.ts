import { ValueObject } from 'Domain/Models/common/ValueObject'

export class BeerName extends ValueObject<string, 'BeerName'> {
  static readonly MAX_LENGTH = 100
  static readonly MIN_LENGTH = 1

  constructor(value: string) {
    super(value)
  }

  protected validate(value: string): void {
    if (
      value.length < BeerName.MIN_LENGTH ||
      value.length > BeerName.MAX_LENGTH
    ) {
      throw new Error(
        `The beer name must be at least ${BeerName.MIN_LENGTH} characters and no more than ${BeerName.MAX_LENGTH} characters long.`,
      )
    }
  }
}
