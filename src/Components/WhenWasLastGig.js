import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import { baseUrl } from '../utils/api';
import React, { Component } from 'react';

class WhenWasLastGig extends Component {
  constructor() {
    super();
    this.state = {
      whenWasLastGigHumanized: Infinity
    }

    fetch(`${baseUrl}/last-gig-date`)
      .then(response => response.json())
      .then(({ lastGigDate }) => this.setState({
        whenWasLastGigHumanized: humanizeDuration(moment.duration(moment().diff(moment(lastGigDate))), {
          units: [
            'y', 'mo', 'w', 'd'
          ],
          largest: 2,
          round: true,
        })
      }));
  }

  render() {
    const { whenWasLastGigHumanized } = this.state;
    const lastPlayedLiveString = `I last played live ${whenWasLastGigHumanized} ago - time for another one?`;

    return <div>{lastPlayedLiveString}</div>;
  };
}

export default WhenWasLastGig;
