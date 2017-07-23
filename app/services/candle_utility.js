import Candle from '../services/candle';

export default class CandleUtility {
  constructor(data) {
    this.candle = new Candle(data);
  }

  isBearish(){
    return this.candle.open > this.candle.close;
  }

  isBullish(){
    return this.candle.open < this.candle.close;
  }

  isLongCandle(length){
    return Math.abs(this.candle.open - this.candle.close) >= length;
  }
}