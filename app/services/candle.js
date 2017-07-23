export default class Candle{
  constructor(candle){
    this.timeStamp = candle[0];
    this.open = candle[1];
    this.high = candle[2];
    this.low = candle[3];
    this.close = candle[4];
    this.volume = candle[5];
  }
}