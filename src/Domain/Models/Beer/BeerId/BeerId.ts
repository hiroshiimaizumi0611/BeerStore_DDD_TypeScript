import { ValueObject } from 'Domain/Models/common/ValueObject'

export default class BeerId extends ValueObject<string, 'BeerId'> {
  static MAX_LENGTH = 15
  static MIN_LENGTH = 10

  constructor(value: string) {
    super(value)
  }

  protected validate(value: string): void {
    if (value.length < BeerId.MIN_LENGTH || value.length > BeerId.MAX_LENGTH) {
      throw new Error('The number of characters in BeerId is invalid.')
    }

    if (!value.startsWith('Beer')) {
      throw new Error('The format of the BeerId is invalid.')
    }
  }
}
