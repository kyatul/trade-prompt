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
      <span>
        <h3>Pivot Points</h3>
        <h4>{this.props.instrument}</h4>
        <h4>R2 {this.state.R2}</h4>
        <h4>R1 {this.state.R1}</h4>
        <h4>PP {this.state.PP}</h4>
        <h4>S1 {this.state.S1}</h4>
        <h4>S2 {this.state.S2}</h4>
      </span>
    );
  }
}
