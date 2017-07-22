import React from 'react';
import Topic from './topic';

export default class Board extends React.Component {
  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Topic
          instrument="SILVERMIC"
          instrumentToken="53397511"
          interval="15"
          volumeThreshold="5000"/>
        <Topic
          instrument="CRUDEOILM"
          instrumentToken="53430023"
          interval="5"
          volumeThreshold="5000"/>
      </div>
    );
  }
}