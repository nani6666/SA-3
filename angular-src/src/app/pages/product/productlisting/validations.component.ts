import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators ,FormArray} from '@angular/forms';
import { MyForm } from './validations.interface';
import { ValidationApiService } from './validation-api.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
declare var $ :any;
@Component({
  selector: 'az-validations',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss'],
  providers: [ ValidationApiService ] 
})

export class ValidationsComponent   {
    options: GlobalConfig;
    faqmsga = false; 
    faqmsgq = false; 
    public productForm:FormGroup;
    public accountForm:FormGroup;
    public SampleForm:FormGroup;
    public productspecForm:FormGroup;
    public productspecForms:FormGroup;
    public ProductKeywordsForm:FormGroup;
    public productfaqForm:FormGroup;
    public imageUploadForm:FormGroup;
    public videoUrlsForm:FormGroup;
    productlists: any=[];
    productdetails: any=[];
    productdetailbyids: any=[];
    editing = {};
    rows = [];    
    temp = [];
    enbleButton = false;
    selected : any = [];
    loadingIndicator: boolean = true;
    public confirmDetail:any = {};
    public productId:any = {};
    public paytype:any = '';
    public items: any = [];
    public specitems: any = [];
    public Faqs: any = [];
    public prdctFaqs: any = [];
    public tag:any = "";
    public tags:any = [];
    public sectors:any = [];
    public industries:any = [];
    public ImageUrls: any = [];
    public VideoUrls: any = [];
    public UnitS:any = [];
    public file:any;
    public OneUnitName:any;
    public sectorforproduct:any;
    public industryname:any;
    public secrtorname:any;
    public imagename:any = "";
    public searchCategories:any = "";
    public searchIndustries:any = "";
    public types = ['success', 'error', 'info', 'warning'];
    public masterIncoTerms: any = ["EXW","FCA","FAS","FOB","CFR","CIF","CPT","CIP","DAT","DAP","DDP"];
    public tradeDetailOption: any = {"I4GProductCode": "",   
                                     "IncoTerms": { "Selected": [] },
                                     "PaymentWays": {"Selected": []},
                                     "PaymentTerms": { "Selected": []}
                                    };
    public saveMediaUrl :any =  { "I4GServiceCode":"",
                                  "ServiceMedia":{ 
                                  "ImageUrls": { "Image": [] },
                                  "VideoUrls": { "Video": [] }
                                  }
                                 };   
     public PaymentWaysinfo: any = {"I4GServiceCode": "",   
                                     "PaymentWays": { "Selected": []}
                                    };     

     public PaymentexportTerms: any = {"I4GProductCode": "",   
                                     "PaymentTerms": { "Selected": []}
                                    };     

    formErrors = {
      'Productname': '' ,
      'Productdescription': '' ,
      'Universalproductcode': '', 
      'Europeanarticlenumber': '' ,
      'Productioncapacity': '', 
      'Companyproductid': '' 
    };
    validationMessages = {
        'Productname': {
            'required': 'ServiceName is required.',
        }, 
        'Productdescription': {
            'required': 'ServiceDescription is required.',
        },
        'Universalproductcode': {
            'required': 'UniversalProductCode is required.',
        },
        'Europeanarticlenumber': {
            'required': 'EuropeanArticelNumber is required.',
        },
        'Productioncapacity': {
            'required': 'ProductionCapacity is required.',
        },
        'Companyproductid': {
            'required': 'CompanyProductId is required.',
        },     
    };     

    formErrors2 = {
      'Samplecost': '' ,
      'Samplequantity': '' 
    };

    validationMessages2 = {
      'Samplecost': {
          'required': 'Samplecost is required.',
          'pattern': 'Samplecost can not be negative and alphabetic.',
      },
      'Samplequantity': {
          'required': 'Samplequantity is required.',
          'pattern': 'Samplequantity can not be negative and alphabetic.',
      },     
    };                                                                           
    /*columns = [
        { prop: 'I4GProductCode' },
        { name: 'Gender' },
        { name: 'Company' }
    ];*/
    @ViewChild(DatatableComponent) table: DatatableComponent;

    constructor(private formBuilder: FormBuilder,private validationApiService: ValidationApiService,public toastrService: ToastrService) {
      this.getMyServicesList();
      this.getUnits();
      this.options = this.toastrService.toastrConfig;
      // this.getSampleDetail();
      // this.getProductSpecs();
      // this.getProductFaqs();
      // this.getProductKeywords();
      // this.getSectorIndustryDetail();
      this.getSectorsAndIndustries();
      // this.getTradeDetails();
      // this.getPaymentWaysInfo();

    this.productForm = this.formBuilder.group({
      'I4GServiceCode': ['', Validators.required],
      'SKUCode': ['SKU0010', Validators.required],
      'ServiceName': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      'ServiceDescription': ['', [Validators.required,Validators.minLength(20),Validators.maxLength(1000)]],
      'UniversalServiceCode': ['', [Validators.minLength(5),Validators.maxLength(50)]],
      'Companyproductid': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      'Productioncapacity': ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
      'Europeanarticlenumber': ['', [Validators.minLength(5),Validators.maxLength(50)]],
    });
     // this.getProductDetail();

     this.accountForm = this.formBuilder.group({
            'I4GServiceCode': '',
            'I4GCompanyCode': ['20171012124501084074', Validators.required],
            'IndustryCode': ['', Validators.required],
            'SectorCode': ['', Validators.required],
            });


      this.SampleForm = this.formBuilder.group({
        'I4GServiceCode': ['', Validators.required],
        'Samplecost': ['', [Validators.required, Validators.pattern('^[+]?[0-9]*')]],
        'Samplequantity': ['', [Validators.required, Validators.pattern('^[+]?[0-9]*')]],
        'Sampleunit': ['', Validators.required],
        'Sampleincoterm': ['', Validators.required],
        'Samplenotes': ['', Validators.required],
        'SamplePaymentWaysJson': ['', Validators.required]
      });

      this.productspecForm = this.formBuilder.group({
          'I4GServiceCode': ['', Validators.required],
          'items': this.formBuilder.array([this.createItem()])
      });

      this.imageUploadForm = this.formBuilder.group({
         'Name': ['', Validators.required],
         'Image': ['', Validators.required]
      });

       this.videoUrlsForm = this.formBuilder.group({
          'VideoUrls': this.formBuilder.array([this.createVideoUrl()])
       });

      this.productspecForms = this.formBuilder.group({
          'I4GServiceCode': ['', Validators.required],
          'Faqs': this.formBuilder.array([this.createItems()])
      });

     this.ProductKeywordsForm = this.formBuilder.group({
           'I4GServiceCode': ['', Validators.required],
           'Word': ['', Validators.required]
            });
     this.productForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        this.onValueChanged();


        this.SampleForm.valueChanges
            .subscribe(data => this.onValueChanged2(data));
        this.onValueChanged2();

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

     onValueChanged2(data?: any) {
        if (!this.SampleForm) {return;  }
        const form = this.SampleForm;
        for (const field in this.formErrors2) {
            // clear previous error message (if any)
            this.formErrors2[field] = '';
            const control = form.get(field);      
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages2[field];
                for (const key in control.errors) {
                    this.formErrors2[field] += messages[key] + ' ';          
                }
            }
        }
    }


    toggledata(){
         $("#Changesector").draggable({
          handle: ".modal-header"
        });
    }


    getMyServicesList(){

        var obj = {"Company": {"CompanyCode": "1234"}};
        this.validationApiService.getMyServicesList(obj).subscribe(
            (data) => {
              console.log(data);
              if (!data.error) {
                this.selected = [data[2]];
                this.productlists = data.Services.Service;
                this.temp = [...data.Services.Service];
                this.rows = data.Services.Service;
                this.loadingIndicator = false;
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
  
    updateValue(event, cell, rowIndex) {
        console.log('inline editing rowIndex', rowIndex)
        this.editing[rowIndex + '-' + cell] = false;
        this.rows[rowIndex][cell] = event.target.value;
        this.rows = [...this.rows];
        console.log('UPDATED!', this.rows[rowIndex][cell]);
    }

    updateFilter(event) {
        const val = event.target.value.toLowerCase();
        const temp = this.temp.filter(function(d) {
            return Object.keys(d).some(function(k) {
              if (d[k]) {
                return d[k].toString().toLowerCase().indexOf(val) != -1;
              }
            })
        });
        this.rows = temp;
        this.table.offset = 0;
    }
      
    onSelect({ selected }) {
        $('.viewBtn').removeClass('text-white');
        $('.statusView').removeClass('text-success'); 
        this.enbleButton = true;
        this.productForm.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.accountForm.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.SampleForm.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.productspecForm.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.productspecForms.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.ProductKeywordsForm.controls["I4GServiceCode"].setValue(selected[0].I4GServiceCode);
        this.tradeDetailOption.I4GServiceCode = selected[0].I4GServiceCode;
        this.saveMediaUrl.I4GServiceCode = selected[0].I4GServiceCode;
        this.PaymentWaysinfo.I4GServiceCode = selected[0].I4GServiceCode;
        this.PaymentexportTerms.I4GServiceCode = selected[0].I4GServiceCode;
    }

    onActivate(event) {
        // console.log('Activate Event', event);
    }

    getServiceDetailbyid(id){
      // var units =[];
      this.getSectorIndustryDetailforprodct(id);
      var obj = {"Service": {"I4GServiceCode": id}};
      this.validationApiService.getServiceDetail(obj).subscribe(
          (data) => {
            // console.log(data);
            if (!data.error) {
              this.productdetailbyids = data.Service;
              var uuname = this.UnitS.filter((item) => {
                if(item.UnitSid == data.Service.Sampleunit){
                  return item.UnitName;
                }
              });
              this.industryname = this.sectorforproduct.Industries.Industry[0].Name;
              this.secrtorname = this.sectorforproduct.Sectors.Sector[0].Name;
              this.OneUnitName = uuname.UnitName
            }
          },
          (err)=>{
              console.log('kfgbhj')
          }
      );
    }

    getServiceDetail() {
      // console.log(this.productForm.value.I4GServiceCode);
        $("#editproduct").draggable({
        });
        var obj = {"Service": {"I4GServiceCode": this.productForm.value.I4GServiceCode}};
        this.validationApiService.getServiceDetail(obj).subscribe(
            (data) => {
              // console.log(data);
              if (!data.error) {
                this.productForm.patchValue(data.Service);
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    saveServiceProfile(){
      var obj ={"Service": {"I4GServiceCode": this.productForm.value.I4GServiceCode,"ServiceName": this.productForm.value.Productname,"UniversalServiceCode": this.productForm.value.Universalproductcode,"Currency": this.productForm.value.Europeanarticlenumber,"CostDescription": this.productForm.value.Companyproductid,"ServiceDescription":this.productForm.value.Productdescription,"TermsFile":this.productForm.value.Productioncapacity}};
      this.validationApiService.saveServiceProfile(obj).subscribe((data) => {
        $("#editproduct").modal('hide');      
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Product Profile updated successfully', 'Product Profile', opt); 
        console.log("saveSampleDetail", data);
      })
    }


    public getSectorIndustryDetail(){
        this.searchCategories = '';
        this.searchIndustries = '';
        var obj = {"Service": {"I4GServiceCode": this.accountForm.value.I4GServiceCode}};
        this.validationApiService.getSectorIndustryDetail(obj).subscribe((data) => {
          if (!data.error) {
             var s_index = this.sectors.findIndex((item) => {
               return item.Code == data.Details.Sectors.Sector[0].Code
             })
             if(s_index > -1){
                this.sectors[s_index].active = true;
                this.accountForm.controls["SectorCode"].setValue(this.sectors[s_index].Code);
                this.getIndustriesBySector(this.sectors[s_index].Code, data.Details.Industries.Industry[0].Code);
             }
          }
        },(err)=>{
          console.log('kfgbhj')
        });
    }

    public getSectorIndustryDetailforprodct(id){
        var obj = {"Service": {"I4GServiceCode": id}};
        this.validationApiService.getSectorIndustryDetail(obj).subscribe((data) => {
              if (!data.error) {
                this.sectorforproduct= data.Details;
                }             
        },(err)=>{
          console.log('kfgbhj')
         });
    }

    public getIndustriesBySector(code, selectedcode){
      var obj = {"Sector": {"Code": code}};
      this.validationApiService.getIndustriesBySector(obj).subscribe((data) =>{
        this.industries = data.Industries.Industry.map((obj) => { obj.active = false; return obj; });
             var s_index = this.industries.findIndex((item) => { return item.Code == selectedcode });
             if(s_index > -1){
                this.industries[s_index].active = true;
                this.accountForm.controls["IndustryCode"].setValue(this.industries[s_index].Code);
             }
         });
       }

    public getSectorsAndIndustries(){
        this.validationApiService.getSectorsAndIndustries().subscribe((data) => {
          this.sectors = data.Details.Sectors.Sector.map((obj) => { obj.active = false; return obj; });
          }, (error)=> {
              this.sectors = [];
          });
        }


    public selectSector(code){
        var index = this.sectors.findIndex((item) => {
        return item.Code == code;
        });
        if(index > -1){
          this.sectors = this.sectors.map((obj) => { obj.active = false; return obj; });
          this.sectors[index].active = true;
          this.accountForm.controls["SectorCode"].setValue(code);
          var obj = {"Sector": {"Code": this.sectors[index].Code}};
          this.validationApiService.getIndustriesBySector(obj).subscribe((data) =>{
             this.industries = data.Industries.Industry.map((obj) => { obj.active = false; return obj; });
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
           this.accountForm.controls["IndustryCode"].setValue(code);
           }
    }

    public saveSectorIndustryDetail(){   
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
                     this.sectors.map((item) => { if(item.Code == this.accountForm.value.SectorCode){ this.confirmDetail["SectorName"] = item.Name }});
                     this.industries.map((item) => { if(item.Code == this.accountForm.value.IndustryCode){ this.confirmDetail["IndustryName"] = item.Name }});
                     var obj = {"Product": this.accountForm.value};
                     this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                        const opt = JSON.parse(JSON.stringify(this.options));
                        this.toastrService[this.types[0]]('Sector & Insdustry updated successfully', 'Sector & Insdustry', opt); 
                         $("#Changesector").modal('hide');
                       }, (error) => {
                       console.log("error", error);
                     });    
                  }
                }else{
                   this.sectors.map((item) => { if(item.Code == this.accountForm.value.SectorCode){ this.confirmDetail["SectorName"] = item.Name }});
                   this.industries.map((item) => { if(item.Code == this.accountForm.value.IndustryCode){ this.confirmDetail["IndustryName"] = item.Name }});
                   var obj = {"Product": this.accountForm.value};
                   this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                       $("#Changesector").modal('hide');
                     }, (error) => {
                     console.log("error", error);
                   });
                } 
              }
          }
        }else{
          var index2 = this.industries.findIndex((item) => {
          return item.Code == this.accountForm.value.IndustryCode;
          });
          if (index2 > -1) {
            if (this.searchIndustries !='') {
              if (this.searchIndustries == this.industries[index2].Name) {
                 this.sectors.map((item) => { if(item.Code == this.accountForm.value.SectorCode){ this.confirmDetail["SectorName"] = item.Name }});
                 this.industries.map((item) => { if(item.Code == this.accountForm.value.IndustryCode){ this.confirmDetail["IndustryName"] = item.Name }});
                 var obj = {"Product": this.accountForm.value};
                 this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                     $("#Changesector").modal('hide');
                   }, (error) => {
                   console.log("error", error);
                 });
              }
            }else{
               this.sectors.map((item) => { if(item.Code == this.accountForm.value.SectorCode){ this.confirmDetail["SectorName"] = item.Name }});
               this.industries.map((item) => { if(item.Code == this.accountForm.value.IndustryCode){ this.confirmDetail["IndustryName"] = item.Name }});
               var obj = {"Product": this.accountForm.value};
               this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                   $("#Changesector").modal('hide');
                 }, (error) => {
                 console.log("error", error);
               });
            }  
          }
        }
      }  
    }


    getSampleDetail(){
        var obj = {"Service": {"I4GServiceCode": this.SampleForm.value.I4GServiceCode}};
        this.validationApiService.getSampleDetail(obj).subscribe(
            (data) => {
              if (!data.error) {
                this.SampleForm.patchValue(data.Product);
                this.paytype = data.Product.SamplePaymentWaysJson;
                console.log(this.paytype);
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

     public getUnits(){
           this.validationApiService.getUnits().subscribe((data) => {
               this.UnitS = data.UnitS;          
             }, (error)=> {
                 console.log(error);
                 this.UnitS = [];
                 });
    }

    public paymentType(parm){
       this.paytype = parm;
       this.SampleForm.controls["SamplePaymentWaysJson"].setValue(this.paytype);
    }

    saveSampleDetail(){
     var obj ={"Service": {"I4GServiceCode" : this.SampleForm.value.I4GServiceCode,"SampleCost": this.SampleForm.value.Samplecost,"SampleQuantity": this.SampleForm.value.Samplequantity,"SampleUnit": this.SampleForm.value.Sampleunit,"SampleIncoTerm": this.SampleForm.value.Sampleincoterm,"SampleNotes": this.SampleForm.value.Samplenotes,"SamplePaymentWaysJson":this.SampleForm.value.SamplePaymentWaysJson}};
     this.validationApiService.saveSampleDetail(obj).subscribe((data) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Sample Details updated successfully', 'Sample Details', opt); 
       $("#Changesampledetail").modal('hide');
       console.log("saveSampleDetail", data);
     });
    }

    public createItem(): FormGroup {
            return this.formBuilder.group({
            "Name": ['', Validators.required],
            "Value": ['', Validators.required]
            });
    }

    public addItem(): void {
      var flag = 0;
      for (let i = 0; i < this.productspecForm.value.items.length; i++) {
        if(this.productspecForm.value.items[i].Name && this.productspecForm.value.items[i].Value){
          flag++;  
        }
      }
      if( this.productspecForm.value.items.length == flag) {
        this.items = this.productspecForm.get('items') as FormArray;
          this.items.push(this.createItem()); 
      }     
    }

    public removeItem(i): void {
            this.items = this.productspecForm.get('items') as FormArray;
            this.items.removeAt(i)
    }

    public getProductSpecs(){
        var obj = {"Product": {"I4GProductCode": this.productspecForm.value.I4GProductCode}};
        console.log(obj);
        this.validationApiService.getProductSpecs(obj).subscribe(
            (data) => {
              if (!data.error) {
                console.log(data);
                this.specitems = data.ProductSpecs.Spec;
                // this.productspecForm.patchValue(data.ProductSpecs.Spec);
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    saveProductspecProfileAdd(){
     this.specitems = this.specitems.concat(this.productspecForm.value.items);
    }


    saveProductspecProfile(){
     var obj ={"I4GProductCode": this.productspecForm.value.I4GProductCode,"ProductSpecs":{"Spec": this.specitems}};
     this.validationApiService.saveProductSpecs(obj).subscribe((data) => {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Specifications Details updated successfully', 'Specifications Details', opt); 
       // this.productspecForm.controls["items"].setValue([{"Name" : "", "Value": ""}]);
       console.log("saveSampleDetail", data);
     });
    }

    getServiceMedia(){
        var obj = {"Service": {"I4GServiceCode": this.saveMediaUrl.I4GServiceCode}};
        this.validationApiService.getServiceMedia(obj).subscribe(
            (data) => {
              if (!data.error) {
                console.log(data);
                this.saveMediaUrl.ServiceMedia.ImageUrls.Image = data.ServiceMedia.ImageUrls.Image;
                this.saveMediaUrl.ServiceMedia.VideoUrls.Video = data.ServiceMedia.VideoUrls.Video;
                /*let arr = [];
                for (var i = 0; i < data.ProductMedia.VideoUrls.Video.length; ++i) {
                  let imgDataObj = data.ProductMedia.VideoUrls.Video[i];
                  arr.push(imgDataObj);
                  if(data.ProductMedia.VideoUrls.Video.length == (i+1)) {
                    // this.videoUrlsForm.controls['VideoUrls'].setValue(arr);
                    //this.saveMediaUrl.ProductMedia.ImageUrls.Image = arr;                    
                    console.log("this.videoUrlsForm", this.saveMediaUrl.ProductMedia.ImageUrls.Image);
                  }
                }*/

              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }
  
    public removeImageUrlToList(i){
      this.saveMediaUrl.ProductMedia.ImageUrls.Image.splice(i, 1);
    }

    public removeVideoUrlToList(i){
      this.saveMediaUrl.ProductMedia.VideoUrls.Video.splice(i, 1);
    }

    public removeSpecItemsToList(i){
      this.specitems.splice(i, 1);
    }

   public removeProdctFaqsToList(i){
      this.prdctFaqs.splice(i, 1);
    }
   

    public imageChange(file){
        console.log("file event", file);
        this.file = file;
        this.imageUploadForm.controls["Name"].setValue("");
        this.imageUploadForm.controls["Image"].setValue(this.file.name);
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

    public updateMediaUrls(){
      this.saveMediaUrl.ProductMedia.VideoUrls.Video = this.saveMediaUrl.ServiceMedia.VideoUrls.Video.concat(this.videoUrlsForm.value.VideoUrls);
      this.videoUrlsForm.reset();
    }

    public uploadProductImage(){
        if(this.file){
          let formData:FormData = new FormData();
          formData.append('file', this.file, this.file.name);
          formData.append("i4gServiceCode", this.saveMediaUrl.i4gServiceCode);
              this.validationApiService.uploadProductImage(formData).subscribe(
              (data) => {
              this.saveMediaUrl.ProductMedia.ImageUrls.Image.push({Name: this.imageUploadForm.value.Name, Url: data.message});
              console.log("this.saveMediaUrl", this.saveMediaUrl);
              this.imageUploadForm.reset();
              this.imagename = '.';
              setTimeout(() => {
              this.imagename = 'assets/img/app/no-image.png';
              }, 500);
              },
              (error) => {console.log(error)});   
        }          
    }
    
     public saveProductMedia(){
        if(this.saveMediaUrl.ProductMedia.ImageUrls.Image.length > 0){
         this.validationApiService.saveProductMedia(this.saveMediaUrl).subscribe((data) => {
           console.log("data", data);
            const opt = JSON.parse(JSON.stringify(this.options));
            this.toastrService[this.types[0]]('Product Media updated successfully', 'Product Media', opt);
           $("#Changemedia1").modal('hide'); 
           },(error) => {
           console.log("error", error);  
           });
        }
     }

    getTradeDetails(){
        var obj = {"Product": {"I4GProductCode": this.tradeDetailOption.I4GProductCode}};
        this.validationApiService.getTradeDetails(obj).subscribe(
            (data) => {
              if (!data.error) {
                if(data){
                  if(data.TradeDetails.IncoTerms.Selected === null){
                    this.tradeDetailOption.IncoTerms = [];
                  }else{
                    this.tradeDetailOption.IncoTerms = data.TradeDetails.IncoTerms;                    
                  }
                  this.tradeDetailOption.PaymentTerms = data.TradeDetails.PaymentTerms;
                  this.tradeDetailOption.PaymentWays = data.TradeDetails.PaymentWays;                
                }
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }


    public selectPaymentTerms(value){
     var index = this.tradeDetailOption.PaymentTerms.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentTerms.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentTerms.Selected.push(value);  
     }
    } 

    public selectIncoTerms(value){
     var index = this.tradeDetailOption.IncoTerms.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.IncoTerms.Selected.push(value);  
     }
    }

    public selectedPaymentWays(value){
     var index = this.tradeDetailOption.PaymentWays.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentWays.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentWays.Selected.push(value);  
     }
    }

    public saveTradeDetails(){
      for(var item in this.tradeDetailOption){this.confirmDetail[item] = this.tradeDetailOption[item]};
        this.validationApiService.saveTradeDetails(this.tradeDetailOption).subscribe((data) => {
          const opt = JSON.parse(JSON.stringify(this.options));
          this.toastrService[this.types[0]]('Trade Details updated successfully', 'Trade Details', opt);
     })
    }

    getPaymentWaysInfo(){
        var obj = {"Product": {"I4GProductCode": this.PaymentWaysinfo.I4GProductCode}};
        this.validationApiService.getPaymentWaysInfo(obj).subscribe(
            (data) => {
              if (!data.error) {
                this.PaymentWaysinfo.PaymentWays.Selected = data.PaymentWays.PaymentWays;
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
     }
    public selectedPaymentWaysinfo(value){
     var index = this.PaymentWaysinfo.PaymentWays.Selected.indexOf(value);
     if(index > -1) {
       this.PaymentWaysinfo.PaymentWays.Selected.splice(index, 1);
     }else{
       this.PaymentWaysinfo.PaymentWays.Selected.push(value);  
     }
    }

    public savePaymentWaysInfo(){
      for(var item in this.tradeDetailOption){this.confirmDetail[item] = this.tradeDetailOption[item]};
        this.validationApiService.savePaymentWaysInfo(this.PaymentWaysinfo).subscribe((data) => {
          const opt = JSON.parse(JSON.stringify(this.options));
          this.toastrService[this.types[0]]('Payment Ways Info updated successfully', 'Payment Ways Info', opt);
          console.log(data);
     })
    }

    public selectPaymentexportTerms(value){
     var index = this.PaymentexportTerms.PaymentTerms.Selected.indexOf(value);
     if(index > -1) {
     this.PaymentexportTerms.PaymentTerms.Selected.splice(index, 1);
     }else{
     this.PaymentexportTerms.PaymentTerms.Selected.push(value);  
     }
    } 

    getPaymentTermsInfo(){
        var obj = {"Product": {"I4GProductCode": this.PaymentexportTerms.I4GProductCode}};
        this.validationApiService.getPaymentTermsInfo(obj).subscribe(
            (data) => {
              if (!data.error) {
                this.PaymentexportTerms.PaymentTerms.Selected = data.PaymentTerms.PaymentTerms;
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    public savePaymentTermsInfo(){
      for(var item in this.tradeDetailOption){this.confirmDetail[item] = this.tradeDetailOption[item]};
        this.validationApiService.savePaymentTermsInfo(this.PaymentexportTerms).subscribe((data) => {
          $("#Changeexporttrm").modal('hide'); 
          const opt = JSON.parse(JSON.stringify(this.options));
          this.toastrService[this.types[0]]('Payment Terms Info updated successfully', 'Payment Terms Info', opt);
     })
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


    getServiceKeywords(){
      var obj = {"Service": {"I4GServiceCode": this.ProductKeywordsForm.value.I4GServiceCode}};
      this.validationApiService.getServiceKeywords(obj).subscribe(
          (data) => {
            if (!data.error) {
              this.tags = data.ProductKeywords.Word;
            }
          },
          (err)=>{
              console.log('kfgbhj')
          }
      );
    }
    public closemodal(){
      delete this.tag;
    }
    public saveServiceKeywords(){
      var obj = {"ServiceKeywords":{"I4GServiceCode": this.ProductKeywordsForm.value.I4GServiceCode,"Words":{"Word": this.ProductKeywordsForm.value.Word}}};
      delete this.tag;  
     this.validationApiService.saveServiceKeywords(obj).subscribe((data) => {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Service Keywords Info updated successfully', 'Service Keywords', opt);
        console.log("words", data);
     })
   }


   public createItems(): FormGroup {
      return this.formBuilder.group({
        "Question": ['', [Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
        "Answer": ['',[Validators.required,Validators.minLength(5),Validators.maxLength(2000)]]
      });
    }

    public addItems(): void {
      var flag = 0;
      for (let i = 0; i < this.productspecForms.value.Faqs.length; i++) {
        if(this.productspecForms.value.Faqs[i].Question && this.productspecForms.value.Faqs[i].Answer){
          flag++;  
        }
      }
      if( this.productspecForms.value.Faqs.length == flag) {
        this.Faqs = this.productspecForms.get('Faqs') as FormArray;
        this.Faqs.push(this.createItems());
      } 
    }

    public removeItems(i): void {
      this.Faqs = this.productspecForms.get('Faqs') as FormArray;
      this.Faqs.removeAt(i)
    }

    getServiceFaqs(){
      var obj = {"Service": {"I4GServiceCode": this.productspecForms.value.I4GServiceCode}};
        this.validationApiService.getServiceFaqs(obj).subscribe(
            (data) => {
              if (!data.error) {
                this.prdctFaqs = data.ProductFaqs.Faq;
                // this.productspecForm.patchValue(data.ProductSpecs.Spec);
              }
            },
            (err)=>{
                console.log('kfgbhj')
            }
        );
    }

    onQusetionChange(searchValue : string ) {  
        if(searchValue.length < 6){
          this.faqmsgq = true;
        }else{
          this.faqmsgq = false;
        }
    }

    onAnswerChange(searchValue : string ) {
        if(searchValue.length < 6){
          this.faqmsga = true;
        }else{
          this.faqmsga = false;
        }
    }

    saveServiceFaqsAdd(){
     this.prdctFaqs = this.prdctFaqs.concat(this.productspecForms.value.Faqs); 
     this.productspecForms.controls["Faqs"].setValue([{"Question" : "", "Answer": ""}]);
     // this.productspecForms.reset();   
    }

    saveProductFaqs(){
      console.log(this.prdctFaqs);
      var obj ={"ServiceFaqs": {"I4GServiceCode": this.ProductKeywordsForm.value.I4GServiceCode,"Faq": this.prdctFaqs}};
      this.validationApiService.saveServiceFaqs(obj).subscribe((data) => {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Service FAQs Info updated successfully', 'Product FAQs', opt);
        this.productspecForms.controls["Faqs"].setValue([{"Question" : "", "Answer": ""}]);
         console.log("saveSampleDetail", data);
     });
    }

}


