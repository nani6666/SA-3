import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { DataMapService } from './datamap.service';

@Component({
  selector: 'az-datamap',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './datamap.component.html',
  styleUrls: ['./datamap.component.scss'],
  providers: [ DataMapService ] 
})
export class DatamapComponent {
  
    public config:any;
    public configFn:any;
    public data:any;
    public bubbles:any;

    constructor(private _dataMapService:DataMapService, private _appConfig:AppConfig){
        this.config = this._appConfig.config;
        this.configFn = this._appConfig; 
        this.data = _dataMapService.getData();
        this.bubbles = _dataMapService.getBubbles();      
    }

     public  ngAfterViewInit(): void {

        var map = new Datamap({
            element: document.getElementById('datamap'),
            scope: 'world',
            responsive: true,
            fills: {
                defaultFill: this.configFn.rgba(this.config.colors.main, 0.8),
                primary: this.config.colors.primary,
                success:this.config.colors.success,
                info: this.config.colors.info,
                danger: this.config.colors.danger,
                warning: this.config.colors.warning
            },
            data: this.data["2016"],
            geographyConfig: {
                borderWidth: 0.7,
                borderColor: this.config.colors.default,
                popupTemplate: function(geo, data) {
                    return ['<div class="hoverinfo"><strong>',
                            'In ' + geo.properties.name +
                            ' users count is ' + data.users +
                            '.</strong></div>'].join('');
                },
                highlightFillColor: this.config.colors.sidebarBgColor,
                highlightBorderColor: this.configFn.rgba(this.config.colors.default, 0.8),
                highlightBorderWidth: 1
            },
            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    alert(geography.properties.name);
                });
            }
        });


        map.bubbles(this.bubbles["2016"], {
            popupTemplate: function(geo, data) {
                return "<div class='hoverinfo'><u>" + data.name + "</u><br/> users count: <i>" + data.users +"</i>";
            },
            fillOpacity: 0.7,
            highlightFillColor: this.config.colors.main,
            highlightBorderColor: this.configFn.rgba(this.config.colors.default, 0.7),
            highlightFillOpacity: 0.8,
        });


        let data = this.data;
        let bubbles = this.bubbles;
        let config = this.config;
        let configFn = this.configFn;
        (<any>jQuery(".dial").val(2016)).knob({           
            min: 2010,
            max: 2016,
            lineCap: 'round',//'butt',
            displayPrevious:true,
            bgColor: this.configFn.rgba(this.config.colors.default, 0.9),
            fgColor: this.config.colors.sidebarBgColor,
            inputColor: this.config.colors.main,
            width: '62',
            height: '62',
            thickness: .2,
            release : function (year) {
                map.updateChoropleth(data[year]);
                map.bubbles(bubbles[year],{
                    popupTemplate: function(geo, data) {
                        return "<div class='hoverinfo'><u>" + data.name + "</u><br/>users count: <i>" + data.users +"</i>";
                    },
                    fillOpacity: 0.7,
                    highlightFillColor: config.colors.main,
                    highlightBorderColor: configFn.rgba(config.colors.default, 0.7),
                    highlightFillOpacity: 0.8,
                });                
            }        
        });


        d3.select(window).on('resize', function() {
            map.resize();
        });

     }
}
