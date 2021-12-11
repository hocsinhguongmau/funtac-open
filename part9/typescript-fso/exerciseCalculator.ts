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

// interface exerciseValues {
//   array: number[]
//   target: number
// }

export const exerciseArguments = (args: Array<string>): ResultType => {
  if (args.length < 4) throw new Error('Not enough arguments')
  const myArray = args[2].slice(1, args[2].length - 1).split(',')
  const hmm: number[] = []
  myArray.map((arg, index) => {
    if (index > 1 && isNaN(Number(arg))) {
      throw new Error('Provided values were not numbers!')
    }
    hmm.push(Number(arg))
  })
  return exerciseCalculator(hmm, Number(args[3]))
}

// try {
//   const { array, target } = exerciseArguments(process.argv)
//   console.log(exerciseCalculator(array, target))
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened.'
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message
//   }
//   console.log(errorMessage)
// }
