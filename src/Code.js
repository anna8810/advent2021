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

    const grid = []
    input.forEach(line => {
      const l1 = line[0]
      const l2 = line[1]

      // COL - Vertical
      if (l1[0] === l2[0]) {
        const min = Math.min(l2[1], l1[1])
        const max = Math.max(l2[1], l1[1])

        if (!grid[l1[0]]) grid[l1[0]] = []

        const row = grid[l1[0]]
        for (let i = min; i <= max; i++) {
          row[i] = row[i] === undefined ? 1 : row[i] + 1
        }
      }

      // ROW - Horisontal
      if (l1[1] === l2[1]) {
        const min = Math.min(l2[0], l1[0])
        const max = Math.max(l2[0], l1[0])

        for (let i = min; i <= max; i++) {
          if (!grid[i]) grid[i] = []

          const row = grid[i]

          row[l1[1]] = row[l1[1]] === undefined ? 1 : row[l1[1]] + 1
        }
      }
    })
    const first = grid.reduce((total, row) => {
      const count = row.reduce((count, value) => {
        return value >= 2 ? count + 1 : count
      }, 0)

      return total + count
    }, 0)

    return { first, second: false }
  }
}
