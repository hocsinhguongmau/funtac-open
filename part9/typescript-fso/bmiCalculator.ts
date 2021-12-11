const calculateBmi = (height: number, weight: number): string => {
  height = height / 100
  const bmi = weight / (height * height)
  if (bmi < 16) {
    return 'Underweight (Severe thinness)'
  } else if (bmi >= 16 && bmi < 16.9) {
    return 'Underweight (Moderate thinness)'
  } else if (bmi >= 17 && bmi < 18.4) {
    return 'Underweight (Mild thinness)'
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal range'
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight (Pre-obese)'
  } else if (bmi >= 30 && bmi < 34.9) {
    return 'Obese (Class I)'
  } else if (bmi >= 35 && bmi < 39.9) {
    return 'Obese (Class II)'
  } else {
    return 'Obese (Class III)'
  }
}

interface BmiValues {
  value1: number
  value2: number
}

const bmiArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!')
  }
}

try {
  const { value1, value2 } = bmiArguments(process.argv)
  console.log(calculateBmi(value1, value2))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}
