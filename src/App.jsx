import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './App.css';

import MovingGibbix from './MovingGibbix';
import GibbixJump from './GibbixJump';

import top from './img/top_edit.jpg';
import infra from './img/infra.jpg';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gibbixes: [],
      showJump: false,
      infraX: 0,
      infraStatus: true
    };

    this.move = this.move.bind(this);
  }

  move() {
    if (this.state.infraX > document.documentElement.offsetWidth - this.infra.clientWidth) {
      this.setState({ infraStatus: false });
    }
    if (this.state.infraX <= 0) {
      this.setState({ infraStatus: true });
    }

    this.setState({
      infraX: this.state.infraStatus ? this.state.infraX + 5 : this.state.infraX - 5
    })
  }

  componentDidMount() {
    setInterval(() => {
      if (this.state.gibbixes.length > 50) {
        return;
      }
      this.setState({
        gibbixes: [...this.state.gibbixes, <MovingGibbix key={Date.now()} />]
      });
    }, 1000);

    setInterval(this.move, 1);
  }

  onPlay() {
    console.log('Started playing');
    setTimeout(() => {
      this.setState({ showJump: true });
      setTimeout(() => {
        this.setState({ showJump: false });
      }, 2000);
    }, 56000);
    //}, 2000);
  }

  render() {
    return (
      <div>
        <div
          className="full-bg"
          style={{
            backgroundImage: 'url(' + top + ')',
            display: this.state.showJump ? 'none' : 'block'
          }}
        >
          {this.state.gibbixes}
          <img style={{
            position: 'absolute',
            left: this.state.infraX,
            zIndex: 10
          }} src={infra} alt="infrasturcture" ref={elem => { this.infra = elem; }} />
          <div className="hidden-player">
            <YouTube
              videoId="Eh3nSx9V89s"
              id="Eh3nSx9V89s"
              className="hidden-player-yt"
              onReady={e => {
                e.target.setVolume(100);
                this.onPlay();
              }}
              onEnd={e => {
                e.target.seekTo(0);
                this.onPlay();
              }}
              opts={{
                playerVars: {
                  autoplay: 1
                }
              }}
            />
          </div>
        </div>
        {this.state.showJump && <GibbixJump />}
      </div>
    );
  }
}

export default App;
