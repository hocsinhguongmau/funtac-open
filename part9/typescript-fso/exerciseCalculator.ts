interface ResultType {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const ratings = ['bad', 'not too bad but could be better', 'good']

const exerciseCalculator = (array: number[], target: number): ResultType => {
  const periodLength = array.length
  let trainingDays = 0
  let total = 0
  array.map((day) => {
    if (day > 0) {
      trainingDays++
    }
    total = total + day
  })
  const average = total / periodLength
  const success = average >= target
  const rating = average > target ? 3 : average === target ? 2 : 1
  const ratingDescription = ratings[rating - 1]

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

interface exerciseValues {
  array: number[]
  target: number
}

const exerciseArguments = (args: Array<string>): exerciseValues => {
  if (args.length < 7) throw new Error('Not enough arguments')
  console.log(args[0])
  let hmm: number[] = []
  args.map((arg, index) => {
    if (index > 1 && isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers!')
    }
    if (index > 1 && index < args.length) {
      hmm.push(Number(arg))
    }
  })

  return {
    array: hmm,
    target: Number(args[args.length - 1]),
  }
}

try {
  const { array, target } = exerciseArguments(process.argv)
  console.log(exerciseCalculator(array, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
