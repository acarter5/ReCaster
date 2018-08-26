import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './bigIcon.css';

const BigIcon = (props) => {
  const left = `${(props.timeSpot/props.max) * 100}%`
  return (
    <div styleName='big-icon' style={{ left }}>     
    </div>
  )
}

export default CSSModules(BigIcon, styles);

module.exports.BigIcon = BigIcon;