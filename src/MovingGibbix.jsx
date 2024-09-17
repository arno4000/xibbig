import React from 'react';
import smartlearnAlpha from './img/smartlearn_alpha.png';

class MovingGibbix extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infraX: Math.floor(window.innerWidth / 2) - 300,
      infraStatus: true,
    };
    this.gibbixRef = React.createRef();
    this.performGibbixMove = this.performGibbixMove.bind(this);
  }

  getRandom = max => Math.floor(Math.random() * max) - max / 2;

  performGibbixMove() {
    if (this.state.infraX > document.documentElement.offsetWidth - this.gibbixRef.current.clientWidth) {
      this.setState({ infraStatus: false });
    }
    if (this.state.infraX <= 0) {
      this.setState({ infraStatus: true });
    }

    this.setState(prevState => ({
      infraX: prevState.infraStatus ? prevState.infraX + 5 : prevState.infraX - 5
    }));

    const topSpeed = this.getRandom(100);
    const leftSpeed = this.getRandom(100);

    this.gibbixRef.current.style.top = this.gibbixRef.current.offsetTop + this.getRandom(50) + 'px';
    this.gibbixRef.current.style.left = this.state.infraX + 'px';

    const rotation = this.getRandom(50);
    let width = this.gibbixRef.current.clientWidth + this.getRandom(50);

    if (width < 50) {
      width = 50;
    }

    this.gibbixRef.current.style.transform = 'rotate(' + rotation + 'deg)';
    this.gibbixRef.current.style.width = width + 'px';
  }

  componentDidMount() {
    this.gibbixRef.current.style.top = Math.floor(window.innerHeight / 2) - 200 + 'px';
    this.gibbixRef.current.style.left = this.state.infraX + 'px';

    this.interval = setInterval(this.performGibbixMove, 1);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <img
        src={smartlearnAlpha}
        style={{
          position: 'absolute',
          transition: 'all 0.1s',
          zIndex: 50
        }}
        ref={this.gibbixRef}
        alt="GibbiX"
      />
    );
  }
}

export default MovingGibbix;