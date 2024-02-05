import { Beer } from './Beer'
import BeerId from './BeerId/BeerId'

export interface IBeerRepository {
  save(beer: Beer): Promise<void>
  update(beer: Beer): Promise<void>
  delete(beerId: BeerId): Promise<void>
  find(beerId: BeerId): Promise<Beer | null>
}
