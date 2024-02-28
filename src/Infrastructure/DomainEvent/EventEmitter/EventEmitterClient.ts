import EventEmitter from 'events'
import { singleton } from 'tsyringe'

@singleton()
export class EventEmitterClient {
  public eventEmitter: EventEmitter

  constructor() {
    this.eventEmitter = new EventEmitter()
  }
}
