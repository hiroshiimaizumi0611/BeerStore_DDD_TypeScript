import { isEqual } from 'lodash'

export abstract class ValueObject<T, U> {
  // @ts-expect-error
  private type: U
  protected readonly value: T

  constructor(value: T) {
    this.validate(value)
    this.value = value
  }

  protected abstract validate(value: T): void

  get getValue(): T {
    return this.value
  }

  equals(other: ValueObject<T, U>): boolean {
    return isEqual(this.value, other.value)
  }
}
