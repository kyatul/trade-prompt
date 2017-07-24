import React from 'react';
import Topic from './topic';

export default class Board extends React.Component {
  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Topic
          instrument="SILVER"
          instrumentToken="53359111"
          interval="3"
          volumeThreshold="100"
          longCandleLength="40"/>
        <Topic
          instrument="CRUDEOIL"
          instrumentToken="53429767"
          interval="3"
          volumeThreshold="100"
          longCandleLength="6"/>
        <Topic
          instrument="NATURALGAS"
          instrumentToken="53473031"
          interval="3"
          volumeThreshold="30"
          longCandleLength="0.5"/>
      </div>
    );
  }
}