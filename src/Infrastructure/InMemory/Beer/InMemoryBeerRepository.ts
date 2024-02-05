import { Beer } from 'Domain/Models/Beer/Beer'
import BeerId from 'Domain/Models/Beer/BeerId/BeerId'
import { IBeerRepository } from 'Domain/Models/Beer/IBeerRepository'

export class InMemoryBeerRepository implements IBeerRepository {
  public DB: {
    [id: string]: Beer
  } = {}

  async save(beer: Beer): Promise<void> {
    this.DB[beer.getBeerId.getValue] = beer
  }

  async update(beer: Beer): Promise<void> {
    this.DB[beer.getBeerId.getValue] = beer
  }

  async delete(beerId: BeerId): Promise<void> {
    delete this.DB[beerId.getValue]
  }

  async find(beerId: BeerId): Promise<Beer | null> {
    const beer = Object.entries(this.DB).find(([id]) => {
      return beerId.getValue === id.toString()
    })

    return beer ? beer[1] : null
  }
}
