import React from 'react';
import HttpService from '../services/http_service'
import Crawler from '../services/crawler';
import Notifier from "react-desktop-notification";

export default class Topic extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount(){
    let crawler = new Crawler(this.props.instrument, this.props.instrumentToken, this.props.interval, this.props.volumeThreshold, this.props.longCandleLength, this.addMessage);
    crawler.start();
  }

  addMessage(msg){
    this.setState({ messages: this.state.messages.concat(msg) })
    Notifier.focus("Trade Propmt",msg);
  }

  render(){
    return(
      <div>
        <h3>Topic</h3>
        <h4>{this.props.instrument}</h4>
        {this.state.messages.map((msg, index) => <h5 key={index}>{msg}</h5>)}
      </div>
    );
  }
}
