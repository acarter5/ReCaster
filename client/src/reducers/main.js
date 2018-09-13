import { combineReducers } from 'redux';
import shoutOutsList from './shoutOutsList.js';
import src from './source.js';
import duration from './durationChange.js';
import shoutOutsToRender from './shoutOutsToRender.js';
import currentShoutOut from './currentShoutOut.js';
import currentTime from './currentTime.js';
import isPlaying from './togglePlay.js';
import listRef from './listRef.js';

var rootReducer = combineReducers( {shoutOutsList, shoutOutsToRender, currentShoutOut, src, duration, currentTime, isPlaying, listRef} );

//TODO: define the root reducer for this app

//HINT: you'll need to combine the other two reducers in this
//  app into a single reducer using the 'combineReducers' method
//  listed above.

export default rootReducer;
