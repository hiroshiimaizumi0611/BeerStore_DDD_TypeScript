import { BeerRepository } from 'Infrastructure/Prisma/Beer/BeerRepository'
import { PrismaClientManager } from 'Infrastructure/Prisma/PrismaClientManager'
import { PrismaTransactionManager } from 'Infrastructure/Prisma/PrismaTransactionManager'
import {
  RegisterBeerCommand,
  RegisterBeerUseCase,
} from 'UseCase/Beer/RegisterBeerUseCase/RegisterBeerUseCase'
import express, { json } from 'express'

const app = express()
const port = 3000

app.get('/', (_, res) => {
  res.send('Hello')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

app.use(json())

app.post('/beer', async (req, res) => {
  try {
    const body = req.body as {
      beerId: string
      name: string
      priceAmount: number
    }

    const prismaManager = new PrismaClientManager()
    const transactionManager = new PrismaTransactionManager(prismaManager)
    const repository = new BeerRepository(prismaManager)
    const redisterUseCase = new RegisterBeerUseCase(
      repository,
      transactionManager,
    )

    const command: RegisterBeerCommand = body
    await redisterUseCase.execute(command)

    res.status(200).json({ message: 'success' })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})
