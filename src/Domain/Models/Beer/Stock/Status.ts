import { ValueObject } from 'Domain/Models/common/ValueObject'

export enum StatusEnum {
  InStock = 'InStock',
  LowStock = 'LowStock',
  OutOfStock = 'OutOfStock',
}

export class Status extends ValueObject<StatusEnum, 'Status'> {
  constructor(value: StatusEnum) {
    super(value)
  }

  protected validate(value: StatusEnum): void {
    if (!Object.values(StatusEnum).includes(value)) {
      throw new Error('Invalid status.')
    }
  }
}
