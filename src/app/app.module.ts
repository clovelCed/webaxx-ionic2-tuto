import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {WeatherService} from '../services/WeatherService';
import {ChartComponent} from '../components/ChartComponent';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChartComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [WeatherService]
})
export class AppModule { }
