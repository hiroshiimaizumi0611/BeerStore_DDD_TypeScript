import { BeerName } from './BeerName'

describe('BeerName', () => {
  test('最小値以下の値で生成するとエラーを投げる', () => {
    expect(() => new BeerName('')).toThrow(
      'The beer name must be at least 1 characters and no more than 100 characters long.',
    )
  })

  test('最大値以上の値で生成するとエラーを投げる', () => {
    const name = 'a'.repeat(1001)
    expect(() => new BeerName(name)).toThrow(
      'The beer name must be at least 1 characters and no more than 100 characters long.',
    )
  })
})
