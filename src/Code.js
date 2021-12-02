exports.Code = {
  1: () => {
    const data = require('./data/input1.js')
    const input = data.input

    const result = input.reduce((acc, curr, i) => {
      curr > input[i - 1] && acc.first++

      const sum1 = curr + input[i + 1] + input[i + 2]
      const sum2 = input[i + 1] + input[i + 2]+ input[i + 3]

      sum2 > sum1 && acc.second++
      return acc
    }, { first: 0, second: 0})

    return result
  },

  2: () => {
    const data = require('./data/input2.js')
    const input = data.input

    const result = input.reduce((acc, curr) => {
      switch (curr.direction) {
        case 'up': {
          acc.depth -= curr.distance
          break
        }
        case 'down': {
          acc.depth += curr.distance
          break
        }
        default: {
          acc.horizontal += curr.distance
          break
        }
      }

      return acc
    }, { horizontal: 0, depth: 0 })

    const first = result.horizontal * result.depth

    return { first, second: false }
  }
}
