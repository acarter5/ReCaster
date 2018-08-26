import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './shoutOut.css';

const ShoutOut = (props) => {
  return (
    <div styleName='shoutOut-container'>
      <div styleName='img-container'>
        <img src={props.data.img} height='100' width='100'/>
      </div>
      <div styleName='title-container'>
        <h1>{props.data.title}</h1>
      </div>
      <div styleName='short-container'>
        <p>{props.data.short}</p>
      </div>
      <div styleName='long-container'>
        <p>
        {props.data.long}
          <a href={props.data.link} target="_blank">Read more</a>
        </p>       
      </div>
    </div>
  )
}

export default CSSModules(ShoutOut, styles);

module.exports.ShoutOut = ShoutOut;