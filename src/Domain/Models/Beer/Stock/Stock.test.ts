import { Quantity } from './Quantity'
import { Status, StatusEnum } from './Status'
import { Stock } from './Stock'
import { StockId } from './StockId'

describe('Stock', () => {
  const stockId = new StockId()
  const quantity = new Quantity(100)
  const status = new Status(StatusEnum.InStock)

  describe('create', () => {
    it('在庫を作成できること', () => {
      const stock = Stock.create()

      expect(stock.getQuantity.equals(new Quantity(0))).toBeTruthy()
      expect(
        stock.getStatus.equals(new Status(StatusEnum.OutOfStock)),
      ).toBeTruthy()
    })

    describe('delete', () => {
      it('在庫ある場合は削除できないこと', () => {
        const stock = Stock.reconstruct(stockId, quantity, status)

        expect(() => stock.delete()).toThrow(
          'Cannot be deleted if there is stock.',
        )
      })
    })
  })
})
