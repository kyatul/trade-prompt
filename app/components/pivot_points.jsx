import React from 'react';

import Utility from '../services/utility';
import PivotPointCalculator from '../services/pivot_point_calculator';

export default class PivotPoints extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount(){
    let calculator = new PivotPointCalculator(this.props.instrumentToken);
    calculator.calculate().then((pivots) => {
      this.setState(pivots);  
    })
  }

  render(){
    return(
      <div>
        <h3>Pivot Points</h3>
        <h4>{this.props.instrument}</h4>
        <h4>{this.state.R1}</h4>
        <h4>{this.state.PP}</h4>
        <h4>{this.state.S1}</h4>
      </div>
    );
  }
}
