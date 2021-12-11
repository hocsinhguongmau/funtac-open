import express from 'express'
const app = express()
import { Request, Response } from 'express'
import { bmiArguments } from './bmiCalculator'
import { exerciseArguments } from './exerciseCalculator'

app.get('/bmi', (req: Request, res: Response) => {
  console.log(req.query)
  const height = req.query.height
  const weight = req.query.weight
  try {
    res.send(bmiArguments(['', '', height as string, weight as string]))
  } catch {
    res.send({ error: 'malformatted parameters' })
  }
})

app.get('/exercise', (req: Request, res: Response) => {
  const array = req.query.daily_exercises
  const target = req.query.target
  try {
    res.send(exerciseArguments(['', '', array as string, target as string]))
  } catch {
    res.send({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
