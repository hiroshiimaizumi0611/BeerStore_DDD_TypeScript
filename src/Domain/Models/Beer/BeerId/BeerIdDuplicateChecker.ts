import { IBeerRepository } from '../IBeerRepository'
import BeerId from './BeerId'

export class BeerIdDuplicateChecker {
  constructor(private beerRepository: IBeerRepository) {}

  async execute(id: BeerId): Promise<boolean> {
    const duplicateBeer = await this.beerRepository.find(id)
    return !!duplicateBeer
  }
}
