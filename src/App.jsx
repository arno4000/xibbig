import React, { Component } from 'react';
import './App.css';

import MovingGibbix from './MovingGibbix';
import GibbixJump from './GibbixJump';

import top from './img/top_edit.jpg';
import infra from './img/infra.png';
import audio from './audio/kekw.ogg';
import AudioPlayer from 'react-h5-audio-player';

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
    this.onPlay = this.onPlay.bind(this);
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
      if (this.state.gibbixes.length >= 10) {
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
    }, 4500); // Changed to 45 seconds
    console.log('Jumping');
  }

  playAudio(){
    new Audio(audio).play();
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
            <AudioPlayer
              style={{ zIndex: 20 }}
              src={audio}
              autoPlay={true}
              loop={true}
              showSkipControls={false}
              showJumpControls={false}
              onPlay={this.onPlay}
            />
          </div>
        </div>
        {this.state.showJump && <GibbixJump />}
      </div>
    );
  }
}

export default App;