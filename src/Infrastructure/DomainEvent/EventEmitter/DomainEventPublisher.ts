import { DomainEvent } from 'Domain/common/DomainEvent/DomainEvent'
import { IDomainEventPublisher } from 'Domain/common/DomainEvent/IDomainEventPublisher'
import { container } from 'tsyringe'
import { EventEmitterClient } from './EventEmitterClient'

export class DomainEventPublisher implements IDomainEventPublisher {
  publish(domainEvent: DomainEvent) {
    container
      .resolve(EventEmitterClient)
      .eventEmitter.emit(domainEvent.eventName, domainEvent)
  }
}
