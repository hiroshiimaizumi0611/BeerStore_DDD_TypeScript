import { Beer } from 'Domain/Models/Beer/Beer'
import { Status } from 'Domain/Models/Beer/Stock/Status'
import { DomainEvent } from '../DomainEvent'

export type BeerDomainEventBody = {
  beerId: string
  beerName: string
  price: number
  quantity: number
  status: Status
}

export const BEER_EVENT_NAME = {
  CREATED: 'StockManagement.BeerCreated',
  DEPLETED: 'StockManagement.BeerDepleted',
  DELETED: 'StockManagement.BeerDeleted',
} as const

export class BeerDomainEventFactory {
  constructor(private beer: Beer) {}

  public createEvent(
    eventName: (typeof BEER_EVENT_NAME)[keyof typeof BEER_EVENT_NAME],
  ) {
    return DomainEvent.create(this.entityToEventBody(), eventName)
  }

  private entityToEventBody(): BeerDomainEventBody {
    return {
      beerId: this.beer.getBeerId.getValue,
      beerName: this.beer.getBeerName.getValue,
      price: this.beer.getPrice.getAmount,
      quantity: this.beer.getQuantity.getValue,
      status: this.beer.getStatus,
    }
  }
}
