import { Injectable } from '@angular/core';
import { AppConfig } from "../../../app.config";

@Injectable()
export class DataMapService {
    constructor(public _appConfig:AppConfig){
        this._appConfig = _appConfig;   
    }

    data = {
        "2010":{
            USA:{ users: 1200, fillKey:'defaultFill' },
            RUS:{ users: 402, fillKey:'defaultFill' }
        },
        "2011":{
            USA:{ users: 820, fillKey:'defaultFill' },
            RUS:{ users: 225, fillKey:'defaultFill' }
        },
        "2012":{
            USA:{ users: 22000, fillKey:'defaultFill' },
            RUS:{ users: 6020, fillKey:'defaultFill' }
        },
        "2013":{
            USA:{ users: 98200, fillKey:'defaultFill' },
            RUS:{ users: 82250, fillKey:'defaultFill' }
        },
        "2014":{
            USA:{ users: 902000, fillKey:'defaultFill' },
            RUS:{ users: 806020, fillKey:'defaultFill' }
        },
        "2015":{
            USA:{ users: 1238500, fillKey:'defaultFill' },
            RUS:{ users: 2532700, fillKey:'defaultFill' }
        },
        "2016":{
            USA:{ users: 5902000, fillKey:'defaultFill' },
            RUS:{ users: 3806020, fillKey:'defaultFill' }
        }
    };


    bubbles = {
        "2010":[
            {name: 'United States of America', users: '1200', latitude: 37.09, longitude: -95.71, radius: 11, fillKey: 'success'},
            {name: 'Russia', users: '402', latitude: 61.52, longitude: 105.32, radius: 8, fillKey: 'info'},
            {name: 'China', users: '882', latitude: 35.86, longitude: 104.19, radius: 7, fillKey: 'danger'},
            {name: 'Australia', users: '980', latitude: -25.27, longitude: 133.77, radius: 9, fillKey: 'primary'},
            {name: 'Germany', users: '120', latitude: 51.16, longitude: 10.45, radius: 5, fillKey: 'warning'}
        ],
        "2011":[
            {name: 'United States of America', users: '820', latitude: 37.09, longitude: -95.71, radius: 7, fillKey: 'danger'},
            {name: 'Russia', users: '225', latitude: 61.52, longitude: 105.32, radius: 5, fillKey: 'warning'},
            {name: 'China', users: '1340', latitude: 35.86, longitude: 104.19, radius: 11, fillKey: 'success'},
            {name: 'Australia', users: '1201', latitude: -25.27, longitude: 133.77, radius: 9, fillKey: 'primary'},
            {name: 'Germany', users: '1105', latitude: 51.16, longitude: 10.45, radius: 8, fillKey: 'info'}
        ],
        "2012":[
            {name: 'United States of America', users: '22000', latitude: 37.09, longitude: -95.71, radius: 11, fillKey: 'success'},
            {name: 'Russia', users: '6020', latitude: 61.52, longitude: 105.32, radius: 8, fillKey: 'info'},
            {name: 'China', users: '7820', latitude: 35.86, longitude: 104.19, radius: 7, fillKey: 'danger'},
            {name: 'Australia', users: '1980', latitude: -25.27, longitude: 133.77, radius: 9, fillKey: 'primary'},
            {name: 'Germany', users: '2120', latitude: 51.16, longitude: 10.45, radius: 5, fillKey: 'warning'}
        ],
        "2013":[
            {name: 'United States of America', users: '98200', latitude: 37.09, longitude: -95.71, radius: 7, fillKey: 'danger'},
            {name: 'Russia', users: '82250', latitude: 61.52, longitude: 105.32, radius: 5, fillKey: 'warning'},
            {name: 'China', users: '41340', latitude: 35.86, longitude: 104.19, radius: 11, fillKey: 'success'},
            {name: 'Australia', users: '61201', latitude: -25.27, longitude: 133.77, radius: 9, fillKey: 'primary'},
            {name: 'Germany', users: '31105', latitude: 51.16, longitude: 10.45, radius: 8, fillKey: 'info'}
        ],
        "2014":[
            {name: 'United States of America', users: '902000', latitude: 37.09, longitude: -95.71, radius: 11, fillKey: 'success'},
            {name: 'Russia', users: '806020', latitude: 61.52, longitude: 105.32, radius: 8, fillKey: 'info'},
            {name: 'China', users: '247820', latitude: 35.86, longitude: 104.19, radius: 7, fillKey: 'danger'},
            {name: 'Australia', users: '121980', latitude: -25.27, longitude: 133.77, radius: 9, fillKey: 'primary'},
            {name: 'Germany', users: '32120', latitude: 51.16, longitude: 10.45, radius: 5, fillKey: 'warning'}
        ],
        "2015":[              
            {name: 'United States of America', users: '1238500', latitude: 37.09, longitude: -95.71, radius: 13, fillKey: 'primary'},
            {name: 'Russia', users: '2532700', latitude: 61.52, longitude: 105.32, radius: 11, fillKey: 'info'},
            {name: 'China', users: '2612000', latitude: 35.86, longitude: 104.19, radius: 8, fillKey: 'danger'},
            {name: 'Australia', users: '1242200', latitude: -25.27, longitude: 133.77, radius: 10, fillKey: 'success'},
            {name: 'Germany', users: '157000', latitude: 51.16, longitude: 10.45, radius: 5, fillKey: 'warning'}
        ],
        "2016":[
            {name: 'United States of America', users: '5902000', latitude: 37.09, longitude: -95.71, radius: 13, fillKey: 'success'},
            {name: 'Russia', users: '3806020', latitude: 61.52, longitude: 105.32, radius: 11, fillKey: 'info'},
            {name: 'China', users: '25247820', latitude: 35.86, longitude: 104.19, radius: 9, fillKey: 'danger'},
            {name: 'Australia', users: '15121980', latitude: -25.27, longitude: 133.77, radius: 10, fillKey: 'primary'},
            {name: 'Germany', users: '2532120', latitude: 51.16, longitude: 10.45, radius: 8, fillKey: 'warning'}
        ]
    };


    public getData():Object {
        return this.data;
    }

    public getBubbles():Object {
        return this.bubbles;
    }



}