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
  },

  9: () => {
    const data = require('./data/input9')
    const input = data.input

    const cols = input.length - 1
    const rows = input[0].length - 1

    const clustered = input.map(row => row.slice())

    const floodFill = (y, x, matrix) => {
      if (matrix[y][x] === 9) return 0

      matrix[y][x] = 9

      let size = 1

      if (y - 1 >= 0) size += floodFill(y - 1, x, matrix)
      if (y + 1 < matrix.length) size += floodFill(y + 1, x, matrix)
      if (x - 1 >= 0) size += floodFill(y, x - 1, matrix)
      if (x + 1 < matrix[y].length) size += floodFill(y, x + 1, matrix)

      return size
    }

    const output = input.reduce((output, row, y) => {
      row.forEach((point, x) => {
        const above = (y > 0 && (input[y - 1][x] <= point)) || false
        const below = (y < cols && (input[y + 1][x] <= point)) || false
        const left = (x > 0 && (input[y][x - 1] <= point)) || false
        const right = (x < rows && (input[y][x + 1] <= point)) || false

        if (!above && !below && !left && ! right) {
          output.lowPoints.push(point)
        }

        const size = floodFill(y, x, clustered)
        if (size > 0) {
          output.basins.push(size)
        }

      })

      return output
    }, { lowPoints: [], basins: [] })

    const first = output.lowPoints.reduce((riskLevel, height) => {
      return riskLevel + height + 1
    }, 0)

    const second = output.basins.sort((a, b) => b - a).slice(0, 3).reduce((result, size) => result * size, 1)

    return { first, second }
  },

  10: () => {
    const data = require('./data/input10')
    const input = data.input

    const pairs = {
      '(' : ')',
      '[' : ']',
      '{' : '}',
      '<' : '>',
    }

    const corruptPoints = {
      ')' : 3,
      ']' : 57,
      '}' : 1197,
      '>' : 25137
    }

    const autocompletePoints = {
      '(' : 1 ,
      '[' : 2,
      '{' : 3,
      '<' : 4
    }

    const { first, autocomplete } = input.reduce((output, line) => {
      const stack = []

      const corrupt = line.split('').find(character => {
        if (pairs[character]) {
          stack.push(character)
        } else {
          const last = stack.pop()
          return pairs[last] !== character
        }

        return false
      })

      if (corrupt) {
        output.first += corruptPoints[corrupt]
      } else {
        const score = stack.reverse().reduce((score, character) => {
          return score * 5 + autocompletePoints[character]
        }, 0)

        output.autocomplete.push(score)
      }

      return output
    }, { first: 0, autocomplete: [] })

    const second = autocomplete.sort((a, b) => a - b)[Math.floor(autocomplete.length / 2)]

    return { first, second }
  },

  11: () => {
    const data = require('./data/input11')
    const input = data.input

    const { matrix, octopuses } = input.reduce((data, line) => {
      data.matrix.push((line.split('')))
      data.octopuses += line.length

      return data
    }, { matrix: [], octopuses: 0 })

    const increaseEnergy = (y, x, flashed) => {
      // Octopus has alredy flashed
      if (flashed.has(`${y} : ${x}`)) return

      matrix[y][x]++

      if (matrix[y][x] > 9) {
        // FLASH
        matrix[y][x] = 0
        flashed.add(`${y} : ${x}`)

        // Check all 8 adjacent octopuses
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {

            // Skip current octopus
            if (i === 0 && j === 0) continue

            // Check if octopus is actually in matrix
            if ( 0 <= y + i && y + i < matrix.length
            && 0 <= x + j && x + j < matrix[y].length) {
              increaseEnergy(y + i, x + j, flashed)
            }
          }
        }
      }
    }

    const doStep = () => {
      const flashed = new Set()

      for (let y = 0; y < matrix.length; y++) {
        const row = matrix[y]

        for (let x = 0; x < row.length; x++) {
          increaseEnergy(y, x, flashed)
        }
      }

      return flashed.size
    }

    let first = 0
    let second = 0

    let flashes = 0
    while (flashes !== octopuses) {
      flashes = doStep()

      first += flashes
      second++
    }

    return { first, second }
  },

  12: () => {
    const data = require('./data/input12')
    const input = data.input

    const connections = {}
    input.forEach(data => {
      const from = data[0]
      const to = data[1]

      if (!connections[from]) connections[from] = []
      if (!connections[to]) connections[to] = []

      connections[from].push(to)
      connections[to].push(from)
    })

    const isSmallCave = (cave) => {
      return cave === cave.toLowerCase()
    }

    const dfs = (cave, visitedCaves1, visitedCaves2, doubleVisit) => {
        // FIRST
      if (visitedCaves1) {
        visitedCaves1.push(cave)

        if (cave === 'end') {
          paths1.push(visitedCaves1)
          return
        }
      }

      // SECOND
      if (visitedCaves2) {
        visitedCaves2.push(cave)

        if (cave === 'end') {
          paths2.push(visitedCaves2)
          return
        }
      }

      connections[cave].forEach(neighbour => {
        // FIRST
        if (visitedCaves1) {
          // Skip if the neighbouring cave is small and already visited
          if (!(isSmallCave(neighbour) && visitedCaves1.includes(neighbour))) {
            dfs(neighbour, visitedCaves1.slice(), false)
          }
        }

        // SECOND
        if (visitedCaves2 && neighbour !== 'start') {
          if (isSmallCave(neighbour) && visitedCaves2.includes(neighbour)) {
            if (!doubleVisit && (visitedCaves2.filter(c => c === neighbour).length < 2)) {
              dfs(neighbour, false, visitedCaves2.slice(), true)
            }
          } else {
            dfs(neighbour, false, visitedCaves2.slice(), doubleVisit)
          }
        }
      })
    }

    const paths1 = []
    const paths2 = []

    dfs('start', [], [])

    const first = paths1.length
    const second = paths2.length

    return { first, second }
  },

  13: () => {
    const data = require('./data/input13')
    const input = data.input

    const dots = input.dots.reduce((dotSet, dot) => {
      return dotSet.add(dot)
    }, new Set())

    const axes = [ 'x', 'y' ]

    const getMax = (dots) => {
      const max =  [ 0, 0 ]

      dots.forEach(dot => {
        const dotArray = dot.split(',')
        max[0] = Math.max(max[0], dotArray[0])
        max[1] = Math.max(max[1], dotArray[1])
      })

      return max
    }

    const fold = (instructions, dots) => {
      const { axis, value } = instructions

      const pos = axes.indexOf(axis)
      const max = getMax(dots)

      const newDots = new Set()
      dots.forEach(dot => {
        const dotArray = dot.split(',')

        if (dotArray[pos] < value) {
          newDots.add(dot)
        } else if (dotArray[pos] > value) {
          dotArray[pos] = max[pos] - dotArray[pos]
          newDots.add(dotArray.join(','))
        }
      })

      return newDots
    }

    const draw = (dots) => {
      const max = getMax(dots)

      let output = ''
      for (let y = 0; y <= max[1]; y++) {
        output += '\n'

        for (let x = 0; x <= max[0]; x++) {
          output += dots.has(`${x},${y}`) ? '¤' : ' '
        }
      }

      // console.log("Day 13", output)
      return { output, second: 'RLBCJGLU'}
    }

    const firstFold = fold(input.folds[0], dots)
    const first = firstFold.size

    let finalFold = dots
    input.folds.forEach(instructions => {
      finalFold = fold(instructions, finalFold)
    })

    const { second } = draw(finalFold)

    return { first, second }
  }
}
