import React from 'react';
import ShoutOut from './ShoutOut.jsx';
import CSSModules from 'react-css-modules';
import styles from './list.css';

const List = (props) => {
  return (
    <div styleName='list-container'>
      <div styleName='flex-container'>
        {props.shoutOuts.map(
          (shoutout) => <ShoutOut data={shoutout}/>
        )}
      </div>
    </div>
  )
}

export default CSSModules(List, styles);

module.exports.List = List;