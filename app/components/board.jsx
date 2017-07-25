import React from 'react';
import Topic from './topic';

export default class Board extends React.Component {
  render(){
    return(
      <div style={{textAlign: 'center'}}>
        <div  style={{ width: "30%", float: "left" }}>
          <Topic
            instrument="SILVER"
            instrumentToken="53359111"
            interval="5"
            volumeThreshold="500"
            longCandleLength="40"/>
        </div>
        <div  style={{ width: "30%", float: "left" }}>
          <Topic
            instrument="CRUDEOIL"
            instrumentToken="53429767"
            interval="5"
            volumeThreshold="2800"
            longCandleLength="6"/>
        </div>
        <div  style={{ width: "40%", float: "left" }}>
          <Topic
            instrument="NATURALGAS"
            instrumentToken="53473031"
            interval="5"
            volumeThreshold="30"
            longCandleLength="0.5"/>
        </div>
      </div>
    );
  }
}