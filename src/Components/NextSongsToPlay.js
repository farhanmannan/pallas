import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import React, { Component } from 'react';

class NextSongsToPlay extends Component {
  constructor() {
    super();
    this.state = {
      json: [],
    }

    fetch('http://localhost:4000/next-songs-to-play')
      .then(response => response.json())
      .then(json => this.setState({ json }))

  }

  render() {
    const rows = this.state.json.map(
      ({ title, count, last_played }) => { 
      return (
        <tr key={title}>
          <td>{title}</td>
          <td>{count}</td>
          <td>{
            humanizeDuration(
              moment.duration(
                moment(last_played).diff(moment())
              ), { units: ['y', 'mo', 'w', 'd'], largest: 2 })

          }</td>
        </tr>
      );
    });

    return (
      <div>
        <table>
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default NextSongsToPlay;
