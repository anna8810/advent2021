import React from 'react';
import { Code } from './Code'

export default class Day extends React.Component {
  create = (answers) => {
    const { first = false, second = false } = answers

    return (
      <div className="solution">
        {first && '✯'}
        {second && '✯'}
      </div>
    )
  }

  render() {
    const { type, text } = this.props

    const className = `day ${type || !isNaN(text)}`
    const number = !isNaN(text) ? text : false

    let answers = null
    if (number && Code[number]) {
      answers = this.create(Code[number]())
    }

    return (
      <div className={className}>
        {text && text}
        {answers && answers}
      </div>
    )
  }
}
