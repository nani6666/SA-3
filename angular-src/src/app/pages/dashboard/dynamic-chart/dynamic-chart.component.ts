import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from "../../../app.config";

@Component({
  selector: 'az-dynamic-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './dynamic-chart.component.html'
})
export class DynamicChartComponent {
    public config:any;
    public configFn:any;

    public lineChartType:string = 'line';
    public lineChartLabels:Array<string>;
    public lineChartData:Array<any>;
    public lineChartColors:any[];
    public lineChartOptions:any;

    public pieChartType:string = 'pie';
    public pieChartLabels:Array<string>;
    public pieChartData:Array<number>;
    public pieChartColors:any[];
    public pieChartOptions:any;

    constructor(private _appConfig:AppConfig){
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;       
    }  

    ngOnInit() { 

        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']; 
        this.lineChartData = [
            {data: [11700, 10320, 25080, 32501, 24556, 49855, 21580], label:'Web' },
            {data: [28080, 42750, 40548, 19256, 29566, 32589, 47500], label:'Mobile' },
        ];
        this.lineChartColors = [
            { 
                borderWidth: 2,
                backgroundColor: this.configFn.rgba(this.config.colors.danger, 0.5),
                borderColor: this.config.colors.danger,
                pointBorderColor: this.config.colors.default,
                pointHoverBorderColor:  this.config.colors.danger,
                pointHoverBackgroundColor: this.config.colors.default,
                hoverBackgroundColor:  this.config.colors.danger
            },
            { 
                borderWidth: 2,
                backgroundColor: this.configFn.rgba(this.config.colors.info, 0.5),
                borderColor: this.config.colors.info,
                pointBorderColor: this.config.colors.default,
                pointHoverBorderColor:  this.config.colors.info,
                pointHoverBackgroundColor: this.config.colors.default,
                hoverBackgroundColor:  this.config.colors.info
            }
        ];
        this.lineChartOptions = {
             scales: {
                yAxes: [{
                    ticks: {
                        fontColor: this.configFn.rgba(this.config.colors.gray, 0.7),
                        beginAtZero:true
                    },
                    gridLines: {
                        display:true,
                        zeroLineColor: this.configFn.rgba(this.config.colors.gray, 0.5),
                        zeroLineWidth: 1,	
                        color: this.configFn.rgba(this.config.colors.gray, 0.1)
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: this.configFn.rgba(this.config.colors.gray, 0.7)
                    },
                    gridLines: {
                        display:true,
                        zeroLineColor: this.configFn.rgba(this.config.colors.gray, 0.5),
                        zeroLineWidth: 1,		
                        color: this.configFn.rgba(this.config.colors.gray, 0.1)
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: this.configFn.rgba(this.config.colors.gray, 0.9),
                }
            }, 
            tooltips:{
                enabled:true,
                backgroundColor: this.configFn.rgba(this.config.colors.main, 0.7)             
            }
        }


        this.pieChartLabels = ['Profit', 'Fees', 'Tax'];
        this.pieChartData = [570, 150, 300]; 
        this.pieChartColors = [
            { 
                backgroundColor: [
                    this.configFn.rgba(this.config.colors.success, 0.7),
                    this.configFn.rgba(this.config.colors.warning, 0.7),
                    this.configFn.rgba(this.config.colors.danger, 0.7)                  
                ],
                hoverBackgroundColor: [
                    this.config.colors.success,
                    this.config.colors.warning,
                    this.config.colors.danger
                ],
                borderColor: this.config.colors.grayLight,
                borderWidth: 1,
                hoverBorderWidth: 3
            } 
        ];      
        this.pieChartOptions = {
            title: {
                display: true,
                text: 'Corporate Info With %',
                fontColor: this.config.colors.gray,
                fontSize: 14,
                fontStyle: 'normal'
            },
            legend: {
                labels: {
                    fontColor: this.configFn.rgba(this.config.colors.gray, 0.9),
                }
            }, 
            tooltips:{
                enabled:true,
                backgroundColor: this.configFn.rgba(this.config.colors.main, 0.7),
                callbacks:{
                    label: function(tooltipItem, data) {
                        var dataset = data.datasets[tooltipItem.datasetIndex];
                        var total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
                            return previousValue + currentValue;
                        });
                        var currentValue = dataset.data[tooltipItem.index];
                        var precentage = Math.floor(((currentValue/total) * 100)+0.5);  
                        return data.labels[tooltipItem.index] + ': ' + precentage + '%';
                    }
                }
            }
        }

    }

   

    public randomizeType():void {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    }

    public chartClicked(e:any):void {
       // console.log(e);
    }

    public chartHovered(e:any):void {
       // console.log(e);
    }


}
