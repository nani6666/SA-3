import { Injectable } from '@angular/core';
import {Http, Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as globalVariable from "../../../global";

@Injectable()
export class ValidationApiService {

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
   
    getMyServicesList(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getMyServicesList', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getServiceDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getServiceDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getSectorIndustryDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getServiceSectorIndustryDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getSectorsAndIndustries(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getSectorsAndIndustries', {headers: this.headerDetail})
    .map(res => res.json());
    }

    getIndustriesBySector(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'rfqs/buyer/getIndustriesBySector', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getSampleDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getFeatureDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getProductSpecs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getProductSpecs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getServiceMedia(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getServiceMedia', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getTradeDetails(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getTradeDetails', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getPaymentWaysInfo(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getPaymentWaysInfo', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getPaymentTermsInfo(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getPaymentTermsInfo', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getServiceKeywords(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getProductKeywords', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getServiceFaqs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/getServiceFaqs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    getUnits(){
    this.loadToken();
    return this.http.get(globalVariable.url+'listing/getUnits',{headers: this.headerDetail})
    .map(res => res.json());
    }
    
    saveServiceProfile(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/updateServiceProfile', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveSectorIndustryDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveSectorIndustryDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveSampleDetail(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveSampleDetail', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveProductSpecs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductSpecs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveTradeDetails(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveTradeDetails', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    savePaymentTermsInfo(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/savePaymentTerms', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    savePaymentWaysInfo(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/savePaymentWays', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveServiceKeywords(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveServiceKeywords', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    saveServiceFaqs(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveServiceFaqs', data, {headers: this.headerDetail})
    .map(res => res.json());
    }

    uploadProductImage(formData){
    this.imgloadToken();
    let options = new RequestOptions({ headers: this.headerDetail });
    return this.http.post(globalVariable.url+'listing/uploadProductImage', formData, options)
    .map(res => res.json());
    }


    saveProductMedia(data){
    this.loadToken();
    return this.http.post(globalVariable.url+'listing/saveProductMedia', data, {headers: this.headerDetail})
    .map(res => res.json());
    }


}