import { ValueObject } from 'Domain/Models/common/ValueObject'

type PriceProps = {
  amount: number
  currency: 'JPY'
}

export default class Price extends ValueObject<PriceProps, 'Price'> {
  static readonly MAX = 100000
  static readonly MIN = 1

  constructor(value: PriceProps) {
    super(value)
  }

  protected validate(value: PriceProps): void {
    if (value.currency !== 'JPY') {
      throw new Error(
        'Invalid currency: only JPY is accepted for the Price object.',
      )
    }

    if (value.amount < Price.MIN || value.amount > Price.MAX) {
      throw new Error(
        `The price must be between ¥${Price.MIN} and ¥${Price.MAX}.`,
      )
    }
  }

  get getAmount(): PriceProps['amount'] {
    return this.value.amount
  }

  get getCurrency(): PriceProps['currency'] {
    return this.value.currency
  }
}
