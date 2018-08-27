import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './smallIcon.css';

const SmallIcon = (props) => {
  const left = `${(props.timeSpot/props.max) * 100}%`
  return (
    <div styleName='small-icon' style={{left: `${(props.timeSpot/props.max) * 100}%`}}>     
    </div>
  )
}

export default CSSModules(SmallIcon, styles);

module.exports.SmallIcon = SmallIcon;