import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default class Week extends React.Component {

  render() {
    return (
      <div className="footer">
        <div>
          <a {...{
            href: 'https://github.com/anna8810',
            rel: 'noopener noreferrer',
            target: '_blank'
          }}>
            <FaGithub />
          </a>
          <a {...{
            href: 'https://linkedin.com/in/annaflisberg',
            rel: 'noopener noreferrer',
            target: '_blank'
          }}>
            <FaLinkedin />
          </a>
        </div>

        <a {...{
          href: 'https://adventofcode.com/2021',
          rel: 'noopener noreferrer',
          target: '_blank'
        }}>
          Advent Of Code
        </a>

        <div> Anna Flisberg </div>
      </div>
    )
  }
}
