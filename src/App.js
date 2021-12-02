import React from 'react'
import Snow from './Snow'
import Week from './Week'
import Footer from './Footer'

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Snow />

        <h1>Advent of Code 2021</h1>

        <Week {...{
          type: 'header'
        }} />

        <Week {...{
          dates:[ undefined, undefined, 1, 2, 3, 4, 5]
        }} />

        <Week {...{
          dates:[ 6, 7, 8, 9, 10, 11, 12]
        }} />

        <Week {...{
          dates:[ 13, 14, 15, 16, 17, 18, 19]
        }} />

        <Week {...{
          dates:[ 20, 21, 22, 23, 24, 25, undefined]
        }} />

        <Footer />
      </div>
    )
  }
}
