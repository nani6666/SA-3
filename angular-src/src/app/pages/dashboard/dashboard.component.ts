import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from "../../app.config";
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'az-dashboard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ DashboardService ] 
})
export class DashboardComponent  { 
    public config:any;
    public configFn:any; 
    public bgColor:any;
    public date = new Date(); 
    public weatherData:any;

    constructor(private _appConfig:AppConfig, private _dashboardService:DashboardService){
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;
        this.weatherData = _dashboardService.getWeatherData();       
    } 
}
