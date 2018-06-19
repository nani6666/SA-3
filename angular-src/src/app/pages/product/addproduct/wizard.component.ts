import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { WizardValidationService } from './wizard-validation.service';
import {Http, Headers, RequestOptions} from '@angular/http';
import { WizardApiService } from './wizard-api.service';
import { Router } from '@angular/router';
import { PipesModule } from './../../../theme/pipes/pipes.module';
import * as globalVariable from "../../../global";
import { ToastrService, GlobalConfig } from 'ngx-toastr';
declare var $ :any;

@Component({
  selector: 'az-wizard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [ WizardValidationService, WizardApiService ] 
})
export class WizardComponent {
    options: GlobalConfig;
    penelError1 = false;
    penelError2 = false;
    penelError3 = false;
    public steps:any[];
    public accountForm:FormGroup;
    public productForm:FormGroup;
    public paymentForm:FormGroup;
    public imageUploadForm:FormGroup;
    public videoUrlsForm:FormGroup;
    public sampleDetail:FormGroup;
    public ProductKeywordsForm:FormGroup;
    public tradeDetailForm:FormGroup;
    public faqform:FormGroup;
    public specialpromotions: FormGroup;
    public productId:any;
    public details:any = {};
    public showConfirm:boolean;
    public sectors: any = [];
    public industries: any = [];
    public searchCategories:any = '';
    public searchIndustries:any = '';
    public items: any = [];
    public CostDetail: any = [];
    public ImageUrls: any = [];
    public VideoUrls: any = [];
    public UnitS:any = [];
    public paytype:any = '';
    public incoTerm:any;
    public tag:any = "";
    public tags:any = [];
    public file:any;
    public i:number;
    public imagename:any = "";
    public confirmDetail:any = {};
    public types = ['success', 'error', 'info', 'warning'];
    public masterIncoTerms: any = ["EXW","FCA","FAS","FOB","CFR","CIF","CPT","CIP","DAT","DAP","DDP"];
    public tradeDetailOption: any = {"I4GProductCode": "",   
                                     "IncoTerms": { "Selected": [] },
                                     "PaymentWays": {"Selected": []},
                                     "PaymentTerms": { "Selected": []}
                                    };
    public saveMediaUrl :any =  { "I4GProductCode":"",
                                  "ProductMedia":{ 
                                  "ImageUrls": { "Image": [] },
                                  "VideoUrls": { "Video": [] }
                                  }
                                };
    public file1 : any;
    
    formErrors = {
      'ProductName': '' ,
      'serviceDescription': '' ,
      'UniversalProductCode': '', 
      'costInformation': '' ,
      'currency': ''
    };
    validationMessages = {
        'serviceName': {
            'required': 'Service Name is required.',
        }, 
        'serviceDescription': {
            'required': 'service Description is required.',
        },
        'UniversalProductCode': {
            'required': 'UniversalProductCode is required.',
        },
        'costInformation': {
            'required': 'Cost Information is required.',
        },
        'currency': {
            'required': 'ProductionCapacity is required.',
        }
    };

    constructor(private http: Http, private formBuilder: FormBuilder, private wizardApiService: WizardApiService, 
                             private router : Router,public toastrService: ToastrService) {
        this.options = this.toastrService.toastrConfig;
        this.steps = [
          {name: 'Sectors & Industries', icon: 'fa-industry', active: true, valid: false, hasError:false },
          {name: 'Service Details', icon: 'fa-cube', active: false, valid: false, hasError:false },
          {name: 'FAQs', icon: 'fa-question', active: false, valid: false, hasError:false },
          {name: 'Specials and Promotions', icon: 'fa-bullhorn', active: false, valid: false, hasError:false },
          {name: 'Media', icon: 'fa-image', active: false, valid: false, hasError:false },
          // {name: 'Sample Detail', icon: 'fa-info-circle', active: false, valid: false, hasError:false },
          {name: 'Social Network Info', icon: 'fa-globe', active: false, valid: false, hasError:false },
          {name: 'For Buyers', icon: 'fa-search', active: false, valid: false, hasError:false },
          {name: 'Confirm', icon: 'fa-check-square-o', active: false, valid: false, hasError:false }
        ];
         
         this.accountForm = this.formBuilder.group({
            'I4GProductCode': '',
            'I4GCompanyCode': ['20171012124501084074', Validators.required],
            'IndustryCode': ['', Validators.required],
            'SectorCode': ['', Validators.required],
          });

        this.productForm = this.formBuilder.group({
            'I4GServiceCode': [''],
            'SKUCode': ['SKU0010', Validators.required],
            'serviceName': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
            'serviceDescription': ['', [Validators.required,Validators.minLength(20),Validators.maxLength(1000)]],
            'UniversalProductCode': ['', [Validators.minLength(5),Validators.maxLength(50)]],
            'costInformation': ['', [Validators.required ,Validators.minLength(5),Validators.maxLength(500)]],
            'currency': ['', [Validators.required]],
            'items': this.formBuilder.array([this.createItem()])
        });
        this.faqform = this.formBuilder.group({
          'faqname': [''],
          'faqDesc' : [''],
        });
        this.specialpromotions = this.formBuilder.group({
          'specialInformation': [''],
          'promotionInformation' : [''],
        });
        this.imageUploadForm = this.formBuilder.group({
           'Name': ['', Validators.required],
           'Image': ['', Validators.required]
        });

        this.sampleDetail = this.formBuilder.group({
           'I4GProductCode': ['', Validators.required],
           'SampleCostStatus': ['1234', Validators.required],
           'SampleCost': ['', [Validators.required,Validators.pattern('^[+]?[0-9]+')]],
           'SampleQuantity': ['', [Validators.required,Validators.pattern('^[+]?[0-9]+')]],
           'SampleUnit': ['', Validators.required],
           'SampleIncoTerm': ['', Validators.required],
           'SampleCostValidity': '',
           'SampleNotes': ['', Validators.required],
           'SamplePaymentWaysJson': ['', Validators.required]
        });
        
        this.ProductKeywordsForm = this.formBuilder.group({
           'I4GProductCode': ['', Validators.required],
           'Word': ['', Validators.required]
        });

        this.videoUrlsForm = this.formBuilder.group({
           'VideoUrls': this.formBuilder.array([this.createVideoUrl()])
        });     
        
        this.tradeDetailForm = this.formBuilder.group({
          'I4GProductCode': ['', Validators.required],
          'TermName': ['', Validators.required],
          'NegotiableQuantity': ['', [Validators.required,Validators.pattern('^[+]?[0-9]+')]],
          'NegotiableUnits': ['', Validators.required],
          'Terms': ['', Validators.required],
          'CostDetail': this.formBuilder.array([this.createCostDetails()]),
        });
        this.productForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
       this.getSectorsAndIndustries();
       this.getUnits();

    }
   
     onValueChanged(data?: any) {
        if (!this.productForm) {return;  }
        const form = this.productForm;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';          
                }
            }
        }
    }
    public selectedIncoterm(){
      this.selectIncoTermInTrade(this.masterIncoTerms[0]);
    }

    public fileChange(file){
        console.log("file", file);
        this.file1 = file;

        //this.imageUploadForm.controls["Name"].setValue("");
        //this.imageUploadForm.controls["Image"].setValue(this.termsfile.name);
        }

    public updateTradeDetailForm(){
      $("#Incoterm").modal('show');
      }

    public addTag(){
      var value = this.tag.trim();
      if(value.length > 0){
      this.tags.push(JSON.parse(JSON.stringify(this.tag)));
      // this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      if(this.tags.length > 0){
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      }else{
      this.ProductKeywordsForm.controls["Word"].setValue("");
      }
      this.tag = "";
      }
    }
    
    public removeTag(index){
      this.tags.splice(index, 1);
      if(this.tags.length > 0){
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      }else{
      this.ProductKeywordsForm.controls["Word"].setValue("");
      }
    }
       
    public updateMediaUrls(){
      this.saveMediaUrl.ProductMedia.VideoUrls.Video = this.saveMediaUrl.ProductMedia.VideoUrls.Video.concat(this.videoUrlsForm.value.VideoUrls);
      console.log(this.saveMediaUrl);
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Product Url Added successfully', 'Product Url', opt);
      this.videoUrlsForm.reset();
    }

    public selectedPaymentWays(value){
     var index = this.tradeDetailOption.PaymentWays.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentWays.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentWays.Selected.push(value);  
     }
    }
    
    public selectPaymentTerms(value){
     var index = this.tradeDetailOption.PaymentTerms.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentTerms.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentTerms.Selected.push(value);  
     }
    }

    public selectIncoTermInTrade(prm){
       this.tradeDetailForm.controls["TermName"].setValue(prm);
    }
    
    public saveIncoTermCostDetail(){
           this.saveIncoTermCostDetailAdd();
        }

    public saveIncoTermCostDetailAdd(){
      this.tradeDetailForm.value["CostDetails"] = { "CostDetail": this.tradeDetailForm.value.CostDetail };
      var obj = {"ExportTerms" : {"ExportTerm" : this.tradeDetailForm.value}};
      delete obj.ExportTerms.ExportTerm.CostDetail;
        this.wizardApiService.saveIncoTermCostDetail(obj).subscribe((data) => {
           this.getIncoTermCostDetail(obj.ExportTerms.ExportTerm.TermName);
           var index = this.tradeDetailOption.IncoTerms.Selected.indexOf(obj.ExportTerms.ExportTerm.TermName);
           if(index > -1) {
           this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
           }else{
           this.tradeDetailOption.IncoTerms.Selected.push(obj.ExportTerms.ExportTerm.TermName);  
           }
           this.uploadTermsFile();
           // this.tradeDetailForm.reset();
           this.tradeDetailForm.controls["I4GProductCode"].setValue(this.productId); 
           $("#Incoterm").modal('hide');
           const opt = JSON.parse(JSON.stringify(this.options));
           this.toastrService[this.types[0]]('Incoterm Cost Detail Added successfully', 'Incoterm Cost Detail', opt);
        });
    }    

    public getIncoTermCostDetail(incoterm){
       var obj = {"Product":{"I4GProductCode": this.productId, "IncoTerm": incoterm}};
       this.wizardApiService.getIncoTermCostDetail(obj).subscribe((data) => {
            console.log("data", data);
            this.incoTerm = data.ExportTerms.ExportTerm;
       });
    }

    public saveSectorIndustryDetail(){       
         this.sectors.map((item) => { if(item.Code == this.accountForm.value.SectorCode){ this.confirmDetail["SectorCode"] = item.Code }});
         this.industries.map((item) => { if(item.Code == this.accountForm.value.IndustryCode){ this.confirmDetail["IndustryName"] = item.Code }});
         console.log("this.confirmDetail", this.confirmDetail);
         var obj = {"Service": this.accountForm.value};
         if(typeof this.productId == 'undefined'){
            this.wizardApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
               const opt = JSON.parse(JSON.stringify(this.options));
               this.toastrService[this.types[0]]('Sectors & industries Added successfully', 'Sectors & industries', opt); 
               this.productId = data.message;
               this.productForm.controls["I4GServiceCode"].setValue(this.productId);
               this.sampleDetail.controls["I4GServiceCode"].setValue(this.productId);
               this.tradeDetailForm.controls["I4GServiceCode"].setValue(this.productId);
               this.ProductKeywordsForm.controls["I4GServiceCode"].setValue(this.productId);
               this.tradeDetailOption.I4GServiceCode = this.productId;
               this.saveMediaUrl.I4GServiceCode = this.productId;
              },(error) => {
               console.log("error", error);
              }
            );         
         }else{
           var newobj = {"Service": {"I4GCompanyCode": this.accountForm.value.I4GCompanyCode,"SectorCode": this.accountForm.value.SectorCode,
                    "IndustryCode": this.accountForm.value.IndustryCode}}
            this.wizardApiService.saveSectorIndustryDetail(newobj).subscribe((data) => {
               const opt = JSON.parse(JSON.stringify(this.options));
               this.toastrService[this.types[0]]('Sectors & industries Updated successfully', 'Sectors & industries', opt);
               this.productId = data.message;
               this.productForm.controls["I4GServiceCode"].setValue(this.productId);
               this.sampleDetail.controls["I4GServiceCode"].setValue(this.productId);
               this.tradeDetailForm.controls["I4GServiceCode"].setValue(this.productId);
               this.ProductKeywordsForm.controls["I4GServiceCode"].setValue(this.productId);
               this.tradeDetailOption.I4GProductCode = this.productId;
               this.saveMediaUrl.I4GProductCode = this.productId;
            },(error) => {
             console.log("error", error);
            }
            );
         }

       }

    public createItem(): FormGroup {
            return this.formBuilder.group({
            "Name": ['', [Validators.required,Validators.pattern('^[+]?[0-9]*[a-z]*[A-Z]*')]],
            "Value": ['', [Validators.required,Validators.pattern('^[+]?[0-9]*')]]
            });
    }

     public createCostDetails(): FormGroup {
            return this.formBuilder.group({
            "Cost": ['', [Validators.required,Validators.pattern('^[+]?[0-9]+')]],
            "Quantity": ['', [Validators.required,Validators.pattern('^[+]?[0-9]+')]],
            "Unit": ['', Validators.required],
            "CostValidity": ['']
            });
       }

    public createVideoUrl(): FormGroup {
            return this.formBuilder.group({
             'Name': ['',Validators.required],
             'Url': ['',Validators.required]
            });
    }

    public addVideoUrl(): void {
            this.VideoUrls = this.videoUrlsForm.get('VideoUrls') as FormArray;
            this.VideoUrls.push(this.createVideoUrl());
    }

    public removeVideoUrl(i): void {
            this.VideoUrls = this.videoUrlsForm.get('VideoUrls') as FormArray;
            this.VideoUrls.removeAt(i)
    }
    
    public addItemCostTrade(i): void {
      var flag = 0;
      for (let i = 0; i < this.tradeDetailForm.value.CostDetail.length; i++) {
        if(this.tradeDetailForm.value.CostDetail[i].Cost && this.tradeDetailForm.value.CostDetail[i].Quantity && 
                                   this.tradeDetailForm.value.CostDetail[i].Unit ) {
          flag++;  
        }
      }
      if( this.tradeDetailForm.value.CostDetail.length == flag) {
        this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
          this.CostDetail.push(this.createCostDetails()); 
      }     
    }

    public removeItemCostTrade(i): void {
            this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
            this.CostDetail.removeAt(i)
    }
    

    public addItem(): void {
      var flag = 0;
      for (let i = 0; i < this.productForm.value.items.length; i++) {
        if(this.productForm.value.items[i].Name && this.productForm.value.items[i].Value){
          flag++;  
        }
      }
      if( this.productForm.value.items.length == flag) {
          this.items = this.productForm.get('items') as FormArray;
          this.items.push(this.createItem());
      }
    }

    public removeItem(i): void {
        this.items = this.productForm.get('items') as FormArray;
        this.items.removeAt(i)
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Product Specification Deleted successfully', 'Product Specification', opt);
    }


    // public updateSampleAvailability(){
    //        if(this.productForm.value.SampleAvailability == 'N'){
    //           this.productForm.controls["SampleAvailability"].setValue('Y');  
    //        }else{
    //          this.productForm.controls["SampleAvailability"].setValue('N');    
    //        }
    //        console.log("avail", this.productForm.value.SampleAvailability);
    // }

    // public updateSampleFree(){
    //        if(this.productForm.value.SampleFree == 'N'){
    //          this.productForm.controls["SampleFree"].setValue('Y');  
    //        }else{
    //          this.productForm.controls["SampleFree"].setValue('N');  
    //        }
    //        console.log("avail", this.productForm.value.SampleFree);

    //      }

    public getSectorsAndIndustries(){
           this.wizardApiService.getSectorsAndIndustries().subscribe((data) => {
             console.log(data);
           this.sectors = data.ServiceDetails.Sectors.Sector.map((obj) => { obj.active = false; return obj; });
       }, (error)=> {
           this.sectors = [];
           });
          }
    
    


    public getUnits(){
           this.wizardApiService.getUnits().subscribe((data) => {
           this.UnitS = data.UnitS;
       }, (error)=> {
           console.log(error);
           this.UnitS = [];
           });
    }

    /*getClass(data){
      let atr = data.getAttribute('aria-expanded');
      let cls : any;
      if (atr === 'true') {
        cls = 'fa fa-caret-up';
      }

      if (atr === 'false') {
        cls = 'fa fa-caret-down';
      }

      return cls;
    }*/


    public selectSector(code) {
      console.log(code);
      this.searchIndustries = '';
      var index = this.sectors.findIndex((item) => {
      return item.Code == code;
      });
       if(index > -1) {
           this.sectors = this.sectors.map((obj) => { obj.active = false; return obj; });
           this.sectors[index].active = true;
           this.accountForm.controls["SectorCode"].setValue(this.sectors[index].Code);
           var obj = {"Sector": {"SectorCode": this.sectors[index].Code}};
           this.wizardApiService.getIndustriesBySector(obj).subscribe((data) =>{
             console.log(data);
           this.industries = data.Details.Industries.Industry.map((obj) => { obj.active = false; return obj; });
           
           if(this.industries.length > 0){
               this.industries[0].active = true;    
               this.accountForm.controls["IndustryCode"].setValue(this.industries[0].Code);
              }
           }, (error)=> {
               this.industries = [];
               this.accountForm.controls["IndustryCode"].setValue("");
           });
        }
    }


    public selectIndustry(code){
           var index = this.industries.findIndex((item) => {
            return item.Code == code;
           });
           if(index > -1){
           this.industries = this.industries.map((obj) => { obj.active = false; return obj; });
           this.industries[index].active = true;
           this.accountForm.controls["IndustryCode"].setValue(this.industries[index].Code);
           //this.searchIndustries = this.industries[index].Name;
           }
    }

   public createServiceProfile(){
       var objspec = {"ProductSpecs" : {"Spec" : this.productForm.value.items}};
       this.productForm.value["ProductSpecs"] = objspec.ProductSpecs;
       var productFormData = {"Product" : JSON.parse(JSON.stringify(this.productForm.value))};
       delete productFormData.Product.items;
       for(var item in productFormData.Product){this.confirmDetail[item] = productFormData.Product[item]}
       delete productFormData.Product.SampleFree;
       this.wizardApiService.createServiceProfile(productFormData).subscribe((data) => {
         const opt = JSON.parse(JSON.stringify(this.options));
         this.toastrService[this.types[0]]('Service Details Added successfully', 'Product Details', opt);
        console.log("Status data", data)
        // this.saveProductProfile();
       },(error)=> {
        console.log("Status error", error)
       });
     }

  /* public saveProductProfile(){
    var obj = {"Product": this.productForm.value};
    this.wizardApiService.saveProductProfile(obj).subscribe((data) => {
         console.log("saveProductProfile", data);
         // this.saveProductSpecs();
    }, (error) => {
         console.log("saveProductProfile error", error);
    });
   } 

   public saveProductSpecs(){
    this.wizardApiService.saveProductSpecs(this.productForm.value).subscribe((data) => {
         console.log("saveProductSpecs", data);
    }, (error) => {
        console.log("saveProductSpecs error", error);
    });
 
   } */

   public imageChange(file){
        console.log("file event", file);
        this.file = file;
        this.imageUploadForm.controls["Name"].setValue("");
        this.imageUploadForm.controls["Image"].setValue(this.file.name);
        }
   

   public paymentType(parm){
          this.paytype = parm;
          this.sampleDetail.controls["SamplePaymentWaysJson"].setValue(this.paytype);
          }


   public saveSampleDetail(){
     for(var item in this.sampleDetail.value){this.confirmDetail[item] = this.sampleDetail.value[item]};
     this.UnitS.map((map) => {if(map.UnitSid == this.sampleDetail.value.SampleUnit){this.confirmDetail["SampleUnit"] = map.UnitName}});
     console.log("this.confirmDetail", this.confirmDetail);
     var obj = {"Product": this.sampleDetail.value};
     console.log(obj);
     this.wizardApiService.saveSampleDetail(obj).subscribe((data) => {
     console.log("saveSampleDetail", data);
     var getSampleDetailParam = {"Product" : {"I4GProductCode": this.productId}};
     this.wizardApiService.getSampleDetail(getSampleDetailParam).subscribe((respData) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Sample Details Added successfully', 'Sample Details', opt);
     console.log("getSampleDetail", respData);
     this.confirmDetail["SampleCostValidity"] = respData.Product.Lastmodified;
     });
     });
   }       
    
    public saveTradeDetails(){
      if(this.tradeDetailOption.IncoTerms.Selected.length === 0){
       this.penelError1 = true;
      } else{
        this.penelError1 = false;
      }
      if(this.tradeDetailOption.PaymentWays.Selected.length === 0){
        this.penelError2 = true;
      } else{
        this.penelError2 = false;
      }
      if(this.tradeDetailOption.PaymentTerms.Selected.length === 0){
        this.penelError3 = true;
      }else{
        this.penelError3 = false;
      }
      if (this.tradeDetailOption.IncoTerms.Selected.length > 0 && this.tradeDetailOption.PaymentWays.Selected.length > 0 && this.tradeDetailOption.PaymentTerms.Selected.length > 0) {
         for(var item in this.tradeDetailOption){this.confirmDetail[item] = this.tradeDetailOption[item]};
         this.wizardApiService.saveTradeDetails(this.tradeDetailOption).subscribe((data) => {
          const opt = JSON.parse(JSON.stringify(this.options));
          this.toastrService[this.types[0]]('Sample Trade Details Added successfully', 'Sample Trade Details', opt);
         });
      }
   } 

   public saveProductKeywords(){
     this.ProductKeywordsForm.value["Words"] = {"Word": this.ProductKeywordsForm.value.Word};
     var obj = {ProductKeywords : this.ProductKeywordsForm.value};
     delete obj.ProductKeywords.Word;
     for(var item in this.ProductKeywordsForm.value){this.confirmDetail[item] = this.ProductKeywordsForm.value[item]};
     console.log("jkjk", this.confirmDetail);
     this.wizardApiService.saveProductKeywords(obj).subscribe((data) => {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Sample Product Keywords Added successfully', 'Sample Product Keywords', opt);
      console.log("words", data);
      })
   }    
   
    public uploadProductImage(){
      if(this.file){
        let formData:FormData = new FormData();
        formData.append('file', this.file, this.file.name);
        formData.append("i4gProductCode", this.productId);
            this.wizardApiService.uploadProductImage(formData).subscribe(
            (data) => {
              const opt = JSON.parse(JSON.stringify(this.options));
              this.toastrService[this.types[0]]('Product Image Uploaded successfully', 'Product Image', opt);
            console.log('success', data)  
            this.saveMediaUrl.ProductMedia.ImageUrls.Image.push({Name: this.imageUploadForm.value.Name, Url: data.message});
            console.log("s", this.saveMediaUrl);
            this.imageUploadForm.reset();
            this.imagename = '.';
            setTimeout(() => {
            this.imagename = 'assets/img/app/no-image.png';
            }, 500);
            },
            (error) => {console.log(error)});   
      }     
    }

      public uploadTermsFile(){
         if(this.file1){
            console.log(this.productId, this.tradeDetailForm.value.TermName)
            var termname = this.tradeDetailForm.value.TermName;
            let formData:FormData = new FormData();
            formData.append('file', this.file1, this.file1.name);
            formData.append("i4gProductCode", this.productId);
            formData.append("docType", 'doc');
            formData.append("incoTerm", this.tradeDetailForm.value.TermName);
            this.wizardApiService.uploadTermsDocForIncoTerm(formData).subscribe((data) => {
              console.log('Document File Uploaded', data)  
              //this.saveIncoTermCostDetailAdd();
              },
              (error) => {console.log(error)
            });   
          } 
      }
     

      public saveServiceMedia(){
       this.wizardApiService.saveServiceMedia(this.saveMediaUrl).subscribe((data) => {
         const opt = JSON.parse(JSON.stringify(this.options));
         this.toastrService[this.types[0]]('Media Added successfully', 'Media', opt);
         console.log("data", data);
         },(error) => {
         console.log("error", error);  
         });
      }
     

    public removeImageUrlToList(i){
      this.saveMediaUrl.ProductMedia.ImageUrls.Image.splice(i, 1);
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Product Image Deleted successfully', 'Product Image', opt);
    }

    public removeVideoUrlToList(i){
      this.saveMediaUrl.ProductMedia.VideoUrls.Video.splice(i, 1);
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Product Url Deleted successfully', 'Product Url', opt);
    }

    public next() {
        let accountForm = this.accountForm;
        let productForm = this.productForm;
        let sampleDetail = this.sampleDetail;
        let faqform = this.faqform;
        let specialspromotions = this.specialpromotions;
        let ProductKeywordsForm = this.ProductKeywordsForm;
        let tradeDetailForm = this.tradeDetailForm;
        let tradeDetailOption = this.tradeDetailOption;
        let saveMediaUrl = this.saveMediaUrl;

        if(this.steps[this.steps.length-1].active)
        return false;
        this.steps.some((step, index, steps) =>{
            if(index < steps.length-1){
                if(step.active){
                    if(step.name=='Sectors & Industries') {
                        if (accountForm.valid) {
                            var index1 = this.sectors.findIndex((item) => {
                              return item.Code == this.accountForm.value.SectorCode;
                            });
                            if (index1 > -1) {
                              if (this.searchCategories.trim() != '') {
                                if (this.searchCategories == this.sectors[index1].Name) {
                                    var index2 = this.industries.findIndex((item) => {
                                    return item.Code == this.accountForm.value.IndustryCode;
                                    });
                                    if (index2 > -1) {
                                      if (this.searchIndustries !='') {
                                        if (this.searchIndustries == this.industries[index2].Name) {
                                          step.active = false;
                                          step.valid = true;
                                          steps[index+1].active=true;
                                          this.saveSectorIndustryDetail();     
                                        } else{
                                          steps[0].active=true;
                                        }
                                      } else {
                                        step.active = false;
                                        step.valid = true;
                                        steps[index+1].active=true;
                                        this.saveSectorIndustryDetail();
                                      } 
                                    }
                                } else {
                                  steps[0].active=true;
                                }
                              } else {
                                var index2 = this.industries.findIndex((item) => {
                                return item.Code == this.accountForm.value.IndustryCode;
                                });
                                if (index2 > -1) {
                                  if (this.searchIndustries !='') {
                                    if (this.searchIndustries == this.industries[index2].Name) {
                                      step.active = false;
                                      step.valid = true;
                                      steps[index+1].active=true;
                                      this.saveSectorIndustryDetail();
                                    } else {
                                      steps[0].active=true;
                                    }
                                  } else {
                                    step.active = false;
                                    step.valid = true;
                                    steps[index+1].active=true;
                                    this.saveSectorIndustryDetail();
                                  }  
                                }
                              }
                            }   
                            return true;
                        } else {
                          step.hasError = true;
                        }  
                    }
                    if(step.name=='Service Details') {
                      console.log(index);
                      console.log(productForm);
                        if (productForm.valid) {
                          step.active = false;
                          step.valid = true;
                          steps[index+1].active=true;
                          this.createServiceProfile();
                          return true;
                        } else {
                          step.hasError = true;
                        }
                    } 
                    if(step.name=='FAQs') {
                      console.log(index);
                      if (faqform.valid) {
                        step.active = false;
                        step.valid = true;
                        steps[index+1].active=true;
                        // this.createServiceProfile();
                        return true;
                    } else {
                        step.hasError = true;
                    }
                    }
                    if(step.name=='Specials and Promotions') {
                      console.log(index);
                      if (specialspromotions.valid) {
                        step.active = false;
                        step.valid = true;
                        steps[index+1].active=true;
                        // this.createServiceProfile();
                        return true;
                    } else {
                        step.hasError = true;
                    }
                    }
                    if(step.name=='Media') {
                        if (saveMediaUrl.ProductMedia.ImageUrls.Image.length > 0 && saveMediaUrl.ProductMedia.VideoUrls.Video.length > 0) {
                          if ((this.videoUrlsForm.value.VideoUrls[0].Name === "" && this.videoUrlsForm.value.VideoUrls[0].Url === "") || (this.videoUrlsForm.value.VideoUrls[0].Name != "" && this.videoUrlsForm.value.VideoUrls[0].Url != "")) {
                            step.active = false;
                            step.valid = true;
                            this.saveServiceMedia();
                            // if(this.productForm.value.SampleAvailability == 'Y' && this.productForm.value.SampleFree == 'N'){
                            steps[index+1].active=true;
                            // }else{
                            // steps[index+2].active=true;
                            // }
                            return true;
                          }
                        }
                        /*else{
                            step.hasError = true;
                        }*/
                    }

                    if(step.name=='Sample Detail'){
                        if (sampleDetail.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            this.saveSampleDetail();
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }

                    if(step.name=='Social Network Info') {
                        this.saveTradeDetails();
                        //console.log("Trade Detail", tradeDetailOption.IncoTerms.Selected.length ,  tradeDetailOption.PaymentWays.Selected.length , tradeDetailOption.PaymentTerms.Selected.length);
                        if (tradeDetailOption.IncoTerms.Selected.length > 0 && tradeDetailOption.PaymentWays.Selected.length > 0 && tradeDetailOption.PaymentTerms.Selected.length > 0) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;    
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }

                    if(step.name=='For Buyers'){
                        if (ProductKeywordsForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            this.saveProductKeywords();
                            return true;
                            }
                        else{
                            step.hasError = true;
                        }                      
                    }

                    if(step.name=='Confirm'){
                        if (this.confirmDetail) {                          
                            return true;
                            }
                        else{
                            step.hasError = true;
                        }                      
                    }
                }
            }   
        });

        /*this.details.username = this.accountForm.value.username;*/
        /*this.details.fullname = this.productForm.value.firstname + " " + this.productForm.value.lastname;
        this.details.gender = this.productForm.value.gender;
        this.details.email = this.productForm.value.email;
        this.details.phone = this.productForm.value.phone;
        this.details.country = this.productForm.value.country;
        this.details.zipcode = this.productForm.value.zipcode;
        this.details.address = this.productForm.value.address;
        this.details.cardtype = this.paymentForm.value.cardtype;
        this.details.cardnumber = this.paymentForm.value.cardnumber; */ 
    }

    public prev(){
      let productForm = this.productForm;
        if(this.steps[0].active)
            return false;
        this.steps.some( (step, index, steps) => {
            if(index != 0){
                if(step.active){
                  if(step.name=='Sectors & Industries'){
                      step.active = false;
                      steps[index-1].active=true;
                      return true;
                  }
                  if(step.name=='Service Details'){
                      step.active = false;
                      steps[index-1].active=true;
                      return true;                   
                  }
                  if(step.name=='FAQs'){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                  }
                  if(step.name=='Specials and Promotions'){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
                  if(step.name=='Media'){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                  }
                  // if(step.name=='Sample Detail'){
                  //     step.active = false;
                  //     steps[index-1].active=true;
                  //     return true;                             
                  // }

                  if(step.name=='Social Network Info'){
                     step.active = false;
                     if(this.productForm.value.SampleAvailability == 'Y' && this.productForm.value.SampleFree == 'N'){
                        steps[index-1].active=true;
                      }else{
                        steps[index-2].active=true;
                      }
                      return true;                    
                  }

                  if(step.name=='For Buyers'){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;                 
                  }
                  if(step.name=='Confirm'){  
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                  }                   
                }
            }             
        });
    }

    public confirm(){
        this.router.navigate(['/pages/product']);
        this.steps.forEach(step => step.valid = true);
    }

   
}


