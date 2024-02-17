import { BeerRepository } from 'Infrastructure/Prisma/Beer/BeerRepository'
import { PrismaClientManager } from 'Infrastructure/Prisma/PrismaClientManager'
import { PrismaTransactionManager } from 'Infrastructure/Prisma/PrismaTransactionManager'
import { Lifecycle, container } from 'tsyringe'

container.register('IBeerRepository', {
  useClass: BeerRepository,
})

container.register('ITransactionManager', {
  useClass: PrismaTransactionManager,
})

container.register(
  'IDataAccessClientManager',
  {
    useClass: PrismaClientManager,
  },
  { lifecycle: Lifecycle.ResolutionScoped },
)
