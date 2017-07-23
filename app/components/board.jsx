import React from 'react';
import Topic from './topic';

export default class Board extends React.Component {
  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <Topic
          instrument="SILVER"
          instrumentToken="53359111"
          interval="5"
          volumeThreshold="2800"
          longCandleLength=""/>
        <Topic
          instrument="CRUDEOIL"
          instrumentToken="53429767"
          interval="5"
          volumeThreshold="500"
          longCandleLength="40"/>
        <Topic
          instrument="NATURALGAS"
          instrumentToken="53473031"
          interval="5"
          volumeThreshold="30"
          longCandleLength="0.5"/>
      </div>
    );
  }
}