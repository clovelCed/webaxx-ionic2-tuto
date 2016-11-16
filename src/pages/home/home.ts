import { Component } from '@angular/core';
import {WeatherService} from '../../services/WeatherService';
import {HourForecast} from '../../entities/HourForecast';
import {DailyForecast} from '../../entities/DailyForecast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public hoursForecast: HourForecast[];
  public dailyForecast: DailyForecast[];

  public temp: number[];
  public hours: string[];
  public searchCity: string;
  public citySelected: string;
  public storage: Storage;

  public currentWeather: number;
  public currentWeatherIcon: string;
  public currentWeatherDate: Date;

  constructor(private weather: WeatherService) { }

  /**
  * Get city
  */
  public getCity(city): void {
    this.citySelected = city;
    this._getWeather(city);
  }

  private _getWeather(city: string): void {

    // get hour forecast
    this.weather.getWeather('forecast?cnt=7&q=', city).subscribe(data => {

      let forecasts = this._getHoursForecast(data.list);

      let d: number[] = [];
      let l: string[] = [];

      for (let f of forecasts) {
        d.push(f.temp);
        l.push(f.hour + 'h');
      }

      this.temp = d;
      this.hours = l;
    });

    // get current weather
    this.weather.getWeather('weather?q=', city).subscribe(data => {
      this.currentWeather = Math.round(data.main.temp);
      this.currentWeatherIcon = data.weather[0].icon;
      this.currentWeatherDate = new Date(data.dt * 1000);
    });

    this.weather.getWeather('forecast/daily?q=', city).subscribe(data => {
      this.dailyForecast = this._getDailyForecast(data.list);
    });
  }

  /**
  * We take the first seven days
  */
  private _getDailyForecast(data: any[]): DailyForecast[] {

    let array: DailyForecast[] = [];

    for (let i = 0; i < data.length; i++) {
      let weather = new DailyForecast();

      weather.maxTemp = Math.round(data[i].temp.max);
      weather.minTemp = Math.round(data[i].temp.min);
      weather.icon = data[i].weather[0].icon;
      weather.date = new Date(data[i].dt * 1000);

      array.push(weather);
    }

    return array;
  }


  /**
  * We take the first eight
  */
  private _getHoursForecast(data: any[]): HourForecast[] {

    let array: HourForecast[] = [];

    for (let i = 0; i < data.length; i++) {
      let weather = new HourForecast();
      weather.hour = new Date(data[i].dt * 1000).getHours();
      weather.temp = Math.round(data[i].main.temp);
      array.push(weather);
    }
    return array;
  }

}
