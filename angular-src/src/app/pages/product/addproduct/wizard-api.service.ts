import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as globalVariable from "../../../global";

@Injectable()
export class WizardApiService {

  headerDetail: any;
  constructor(private http:Http) { }
  
  loadToken(){
    const token = 'Basic cmFqdTpyYWp1';
    let header = new Headers();
    header.append('Authorization', token);
    header.append('Content-Type','application/json');
    this.headerDetail = header;
    }

    imgloadToken(){
    const token = 'Basic cmFqdTpyYWp1';
    let header = new Headers();
    header.append('Authorization', token);
    this.headerDetail = header;
    }
 

    getSectorsAndIndustries(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getServiceSectors',{headers: this.headerDetail})
    .map(res => res.json());
    }

    getUnits(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getUnits',{headers: this.headerDetail})
    .map(res => res.json());
    }

    getSampleDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getSampleDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveSectorIndustryDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveIndustryPerSectorCode', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductProfile(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductProfile', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductSpecs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductSpecs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getIndustriesBySector(data){
    this.loadToken();
    return this.http.post(globalVariable.url+ 'listing/getIndustriesBySectorCode', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    createServiceProfile(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/createServiceProfile', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    savespecialPromotions(data){
      this.loadToken();
      return this.http.post(globalVariable.url+'listing/saveSpecialsAndPromotions', data, {headers: this.headerDetail})
      .map(res => res.json());
      }

    saveSampleDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveSampleDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveIncoTermCostDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveIncoTermCostDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getIncoTermCostDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getIncoTermCostDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }
  
    saveTradeDetails(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveTradeDetails', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductKeywords(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductKeywords', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    uploadServiceImage(formData){
    this.imgloadToken();
    let options = new RequestOptions({ headers: this.headerDetail });
    return this.http.post(globalVariable.url+'listing/uploadServiceImage', formData, options)
    .map(res => res.json());
    }

    uploadTermsDocForIncoTerm(formData){
    this.imgloadToken();
    let options = new RequestOptions({ headers: this.headerDetail });
    return this.http.post(globalVariable.url+'listing/uploadTermsDocForIncoTerm', formData, options)
    .map(res => res.json());
    }

    saveServiceMedia(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveServiceMedia', data, {headers: this.headerDetail})
    .map(res => res.json());
    }
}