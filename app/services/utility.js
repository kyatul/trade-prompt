export default class Utility{
  static getPublicApi(instrumentToken, period, fromDate, toDate){
    
  }

  static today(){
    return formatDate('2017-07-24');
  }

  static lastWorkingDay(){
    return formatDate('2017-07-21');
  }

  static formatDate(date){
    return (new Date(date)).toISOString().substring(0, 10);
  }
}