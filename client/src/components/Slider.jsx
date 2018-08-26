import React from 'react';
import BigIcon from './BigIcon.jsx'
import SmallIcon from './SmallIcon.jsx'
import CSSModules from 'react-css-modules';
import styles from './slider.css';

class Slider extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { max, value } = this.props;
    const width = `${(value / max) * 100}%`

    return (
      <div styleName='slider-container'>
        <div styleName='slider'>
          <div styleName='slider-bar'>
            {max > 0
              ? (
                  <div styleName='slider-bar-fill' style={{ width }}>
                    <div styleName='slider-handle'>
                    </div>
                  </div>
                ) : null
            }
            {this.props.shoutOuts.map(
              (shoutOut) => {
                return shoutOut === this.props.currentShoutOut ? <BigIcon max={max} timeSpot={shoutOut.timespot}/> 
                : <SmallIcon timeSpot={shoutOut.timespot} max={max}/> 
              }
            )}           
          </div>
        </div>
      </div>
    )
  }
}

export default CSSModules(Slider, styles, {allowMultiple: true});

module.exports.Slider = Slider;