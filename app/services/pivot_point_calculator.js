import HttpService from '../services/http_service';
import Utility from '../services/utility';

export default class PivotPointCalculator{
  constructor(instrumentToken) {
    this.instrumentToken = instrumentToken;
    this.ohlc = null;
    this.pivots = {}
    this.saveData = this.saveData.bind(this);	
    this.lastWorkingDay = (new Date('2017-07-21')).toISOString().substring(0, 10);
  }

  calculate(){
    return new Promise((resolve, reject) => {
      HttpService.get(Utility.getPublicApi(this.instrumentToken, 'day', this.lastWorkingDay, this.lastWorkingDay), 
        (response) => {
          if(response.status == 'success'){
            this.saveData(response.data.candles[0]);
            resolve(this.pivots);
          }
        });
    })
  }

  saveData(candle){
    this.ohlc = { open: candle[1], high: candle[2], low: candle[3], close: candle[4] }
    let PP = Math.round((this.ohlc.high + this.ohlc.low + this.ohlc.close)/3);
    this.pivots['PP'] = PP;
    this.pivots['R1'] = (2*PP - this.ohlc.low);
    this.pivots['S1'] = (2*PP - this.ohlc.high);
  }
}