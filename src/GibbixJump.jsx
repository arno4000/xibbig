import React, { Component } from 'react';

import gibbixHd from './img/gibbix_hd.jpg';
import explosion from './img/explosion.gif';

class GibbixJump extends Component {
  componentDidMount() {
    const newImage = () => {
      const animation = new Image();
      animation.src = explosion;
      animation.style.height = '1080px';

      return animation;
    };

    this.wrapper.appendChild(newImage());
    
  }

  render() {
    return (
      <div
        className="gibbix-jumpscare"
        style={{ backgroundImage: 'url(' + gibbixHd + ')', display: 'flex' }}
        ref={e => {
          this.wrapper = e;
        }}
      />
    );
  }
}

export default GibbixJump;
