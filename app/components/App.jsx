import React from 'react';
import Board from './board';
import PivotPoints from './pivot_points';

export default class App extends React.Component {
  render() {
    return (
     <div style={{textAlign: 'center'}}>
       <div>
         <PivotPoints
            instrument="SILVERMIC"
            instrumentToken="53397511"/>
          <PivotPoints
            instrument="CRUDEOILM"
            instrumentToken="53430023"/>
        </div>
        <div>
         <Board/>
        </div>
      </div>);
  }
}