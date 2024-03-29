import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'
import { BeerDto } from '../BeerDto'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetBeerUseCase {
  constructor(
    @inject('IBeerRepository')
    private beerRepository: IBeerRepository,
  ) {}

  async execute(beerId: string): Promise<BeerDto | null> {
    const beer = await this.beerRepository.find(new BeerId(beerId))
    return beer ? new BeerDto(beer) : null
  }
}
