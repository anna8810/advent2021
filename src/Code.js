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
          acc.depth1 -= curr.distance
          acc.aim -= curr.distance
          break
        }
        case 'down': {
          acc.depth1 += curr.distance
          acc.aim += curr.distance
          break
        }
        default: {
          acc.horizontal += curr.distance
          acc.depth2 += (acc.aim * curr.distance)
          break
        }
      }

      return acc
    }, { horizontal: 0, depth1: 0, depth2: 0, aim: 0 })

    const first = result.horizontal * result.depth1
    const second = result.horizontal * result.depth2

    return { first, second }
  },

  3: () => {
    const data = require('./data/input3')
    const input = data.input

    const length = input.length

    const result = input.reduce((acc, curr) => {
      for (let i = 0; i < curr.length; i++) {
        const bit = curr[i]

        if (!acc[i]) acc[i] = 0

        acc[i] += Number(bit)
      }

      return acc
    }, []).map(v => (v > length / 2) ? 1 : 0)

    const binarys = result.reduce((acc, curr) => {
      acc.gamma += curr ? '1' : '0'
      acc.epsilon += curr ? '0' : '1'

      return acc
    }, { gamma: '', epsilon: '' })

    const first = parseInt(binarys.gamma, 2) * parseInt(binarys.epsilon, 2)


    const findCommon = (array, pos, type) => {
      const sum = array.reduce((acc, curr) => acc + Number(curr[pos]), 0)

      if (type === 'most') {
        return (sum >= array.length / 2) ? '1' : '0'
      } else {
        return (sum < array.length / 2) ? '1' : '0'
      }
    }

    const filterCommon = ({ array, index, type }) => {
      const most = findCommon(array, index, type)
      const filtered = array.filter(binary => binary[index] === most)

      if (filtered.length > 1) {
        return filterCommon({ array: filtered, index: index + 1, type})
      } else {
        return parseInt(filtered[0], 2)
      }
    }

    const oxygen = filterCommon({ array: input, index: 0, type: 'most'})
    const co2 = filterCommon({ array: input, index: 0, type: 'least'})
    const second = oxygen * co2

    return { first, second}
  },

  4: () => {
    const data = require('./data/input4')
    const input = data.input

    const boardData = input.boards.reduce((acc, curr) => {
      const data = { rows: [], cols: [], sum: 0, won: false}

      curr.forEach((row, r) => {
        data.rows.push(0)
        data.cols.push(0)

        data.sum += row.reduce((sum, value) => sum + value)
      })

      acc.push(data)

      return acc
    }, [])

    const drawNumber = (numberIndex, result) => {
      if (numberIndex > input.numbers.length) return result

      const number = input.numbers[numberIndex]

      let bingo = false
      input.boards.forEach((board, b) => {
        if (!boardData[b].won) {
          board.find((row, r) => {
            return row.find((value, c) => {
              if (value === number) {
                boardData[b].rows[r]++
                boardData[b].cols[c]++
                boardData[b].sum -= value

                if (boardData[b].rows.find(hits => hits === 5) ||boardData[b].cols.find(hits => hits === 5)) {
                  boardData[b].won = true
                  bingo = boardData[b].sum * number
                }
              }

              return value === number
            })
          })
        }
      })

      if (bingo) {
        result.second = bingo

        if (!result.first) result.first = bingo

        return drawNumber(numberIndex + 1, result)
      } else {
        return drawNumber(numberIndex + 1, result)
      }
    }

    const { first, second } = drawNumber(0, {})

    return { first, second }
  },

  5: () => {
    const data = require('./data/input5')
    const input = data.input

    const grid1 = []
    const grid2 = []

    const { first, second } = input.reduce((result, line) => {
      let x1 = line[0][0]
      let y1 = line[0][1]

      const x2 = line[1][0]
      const y2 = line[1][1]

      const diagonal = (x1 !== x2) && (y1 !== y2)

      let done = false
      while (!done) {
        done = ((x1 === x2) && (y1 === y2))

        if (!diagonal) {
          grid1[x1] = grid1[x1] === undefined ? [] : grid1[x1]
          grid1[x1][y1] = grid1[x1][y1] === undefined ? 1 : grid1[x1][y1] + 1

          grid1[x1][y1] === 2 && result.first++
        }

        grid2[x1] = grid2[x1] === undefined ? [] : grid2[x1]
        grid2[x1][y1] = grid2[x1][y1] === undefined ? 1 : grid2[x1][y1] + 1

        grid2[x1][y1] === 2 && result.second++

        if (x1 < x2) x1++
        else if (x1 > x2) x1--

        if (y1 < y2) y1++
        else if (y1 > y2) y1--
      }

      return result
    }, { first: 0, second: 0})

    return { first, second }
  },

  6: () => {
    const data = require('./data/input6')
    const input = data.input

    const countFishes = (days) => {
      const timers = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
      input.forEach(timer => {
        timers[timer]++
      })

      for (let i = 0; i < days; i++) {
        const newFishes = timers.shift()

        timers.push(newFishes)
        timers[6] += newFishes
      }

      return timers.reduce((a, b) => a + b, 0)
    }

    const first = countFishes(80)
    const second = countFishes(256)

    return { first, second }
  },

  7: () => {
    const data = require('./data/input7')
    const input = data.input

    const sorted = input.slice().sort((a, b) => a - b)
    const index = Math.floor(sorted.length / 2)
    const median = sorted[index]

    const first = input.reduce((total, pos) => {
      const fuel = Math.abs(pos - median)

      return total += fuel
    }, 0)


    const total = input.reduce((total, pos) => total += pos)
    const mean = Math.floor(total / input.length)

    const second = input.reduce((total, pos) => {
      const n = Math.abs(pos - mean)
      const fuel = (n / 2) * (1 + n)

      return total += fuel
    }, 0)

    return { first, second }
  },

  8: () => {
    const data = require('./data/input8')
    const input = data.input

    const unique = [ 2, 3, 4, 7 ]
    const first = input.reduce((instances, data) => {
      data.outputValues.forEach(value => unique.includes(value.length) && instances++ )

      return instances
    }, 0)

    const sortedInput = input.map(data => {
      const signalPatterns = data.signalPatterns.map(p => p.split('').sort().join(''))
      const outputValues = data.outputValues.map(v => v.split('').sort().join(''))

      return { signalPatterns, outputValues }
    })

    const includes = (a, b) => {
      return a.split('').filter(letter => b.includes(letter)).length === b.length
    }

    const getKey = (signalPatterns) => {
      const key = []

      // UNIQUES
      key[1] = signalPatterns.find(p => p.length === 2)
      key[4] = signalPatterns.find(p => p.length === 4)
      key[7] = signalPatterns.find(p => p.length === 3)
      key[8] = signalPatterns.find(p => p.length === 7)

      // FIVES
      const fives = signalPatterns.filter(p => p.length === 5)

      key[3] = fives.find(p => includes(p, key[1]))
      fives.splice(fives.indexOf(key[3]), 1)

      key[5] = fives.find(p => p.split('').filter(letter => key[4].includes(letter)).length === (key[4].length - 1))
      fives.splice(fives.indexOf(key[5]), 1)

      key[2] = fives[0]

      // SIXES
      const sixes = signalPatterns.filter(p => p.length === 6)

      key[6] = sixes.find(p => !includes(p, key[1]))
      sixes.splice(sixes.indexOf(key[6]), 1)

      key[9] = sixes.find(p => includes(p, key[3]))
      sixes.splice(sixes.indexOf(key[9]), 1)

      key[0] = sixes[0]

      return key
    }

    const getValue = (outputValues, key) => {
      const value = outputValues.reduce((value, output) => {
        const digit = key.indexOf(output.split('').sort().join(''))

        return value + digit
      }, '')

      return value
    }

    const second = sortedInput.reduce((total, { signalPatterns, outputValues }) => {
      const key = getKey(signalPatterns)
      const value = getValue(outputValues, key)

      return total + parseInt(value)
    }, 0)

    return { first, second }
  }
}
