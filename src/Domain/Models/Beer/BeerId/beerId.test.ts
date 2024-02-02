import BeerId from './BeerId'

describe('BeerId', () => {
  test('', () => {
    expect(new BeerId('Beer_20240202').getValue).toBe('Beer_20240202')
  })

  test('equals', () => {
    const beerId1 = new BeerId('Beer_20240202')
    const beerId2 = new BeerId('Beer_20240202')
    expect(beerId1.equals(beerId2)).toBeTruthy()
  })

  test('不正な文字数の場合にエラーを投げる', () => {
    // 境界値のテスト
    expect(() => new BeerId('1'.repeat(20))).toThrow(
      'The number of characters in BeerId is invalid.',
    )
    expect(() => new BeerId('1')).toThrow(
      'The number of characters in BeerId is invalid.',
    )
  })

  test('不正なフォーマットの場合にエラーを投げる', () => {
    expect(() => new BeerId('20223490222')).toThrow(
      'The format of the BeerId is invalid.',
    )
  })
})
