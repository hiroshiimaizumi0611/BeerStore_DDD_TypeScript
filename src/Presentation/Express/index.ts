import {
  RegisterBeerCommand,
  RegisterBeerUseCase,
} from 'UseCase/Beer/RegisterBeerUseCase/RegisterBeerUseCase'
import express, { json } from 'express'
import { container } from 'tsyringe'

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

    const registerUseCase = container.resolve(RegisterBeerUseCase)

    const command: RegisterBeerCommand = body
    await registerUseCase.execute(command)

    res.status(200).json({ message: 'success' })
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
})
