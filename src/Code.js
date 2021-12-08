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
  }
}
