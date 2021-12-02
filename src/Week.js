import React from 'react'
import Day from './Day'

const weekDays = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default class Week extends React.Component {
  render() {
    const { type, dates } = this.props
    const array = dates || weekDays

    return (
      <div className="week">

       {array.map((text, i) =>
        <Day key={i} {...{
          type,
          text
        }}/>
       )}

      </div>
    )
  }
}
