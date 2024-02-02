import Price from './Price'

describe('Price', () => {
  it('Priceを作成できること', () => {
    const amount = 10000
    const price = new Price({ amount, currency: 'JPY' })
    expect(price.amount).toBe(amount)
    expect(price.currency).toBe('JPY')
  })

  it('無効な通貨コードの場合エラーを投げる', () => {
    const amount = 10000
    const currency = 'USD'
    expect(() => {
      // @ts-expect-error テストのために無効な値を渡す
      new Price({ amount, currency })
    }).toThrow('Invalid currency: only JPY is accepted for the Price object.')
  })

  it('MIN未満の値でPriceを生成するとエラーを投げる', () => {
    const amount = Price.MIN - 1
    const currency = 'JPY'
    expect(() => {
      new Price({ amount, currency })
    }).toThrow(`The price must be between ¥${Price.MIN} and ¥${Price.MAX}.`)
  })

  it('MAX超の値でPriceを生成するとエラーを投げる', () => {
    const amount = Price.MAX + 1
    const currency = 'JPY'
    expect(() => {
      new Price({ amount, currency })
    }).toThrow(`The price must be between ¥${Price.MIN} and ¥${Price.MAX}.`)
  })
})
