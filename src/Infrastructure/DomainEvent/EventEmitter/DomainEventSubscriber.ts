import { DomainEvent } from 'Domain/common/DomainEvent/DomainEvent'
import { IDomainEventSubscriber } from 'Domain/common/DomainEvent/IDomainEventSubscriber'
import { EventEmitterClient } from './EventEmitterClient'
import { container } from 'tsyringe'

export class DomainEvenSubscriber implements IDomainEventSubscriber {
  subscribe<T extends Record<string, unknown>>(
    eventName: string,
    callback: (event: DomainEvent<T>) => void,
  ): void {
    container.resolve(EventEmitterClient).eventEmitter.once(eventName, callback)
  }
}
