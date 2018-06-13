import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MyForm } from './validations.interface';
import { ValidationApiService } from './validation-api.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToastrService, GlobalConfig } from 'ngx-toastr';
declare var $: any;
@Component({
  selector: 'az-validations',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './validations.component.html',
  styleUrls: ['./validations.component.scss'],
  providers: [ValidationApiService]
})

export class ValidationsComponent {
  options: GlobalConfig;
  faqmsga = false;
  faqmsgq = false;
  editBtn = false;
  public CostDetail: any = [];
  public productForm: FormGroup;
  public accountForm: FormGroup;
  public SampleForm: FormGroup;
  public productspecForm: FormGroup;
  public productspecForms: FormGroup;
  public ProductKeywordsForm: FormGroup;
  public productfaqForm: FormGroup;
  public imageUploadForm: FormGroup;
  public tradeDetailForm: FormGroup;
  public videoUrlsForm: FormGroup;
  productlists: any = [];
  productdetails: any = [];
  productdetailbyids: any = [];
  public incoTerms: any;
  public file1: any;
  editing = {};

  rows = [];
  temp = [];
  enbleButton = false;
  selected: any = [];
  loadingIndicator: boolean = true;
  public confirmDetail: any = {};
  public productId: any = {};
  public paytype: any = '';
  public items: any = [];
  public specitems: any = [];
  public Faqs: any = [];
  public prdctFaqs: any = [];
  public newPrdctFaqs: any = [];
  public tag: any = "";
  public tags: any = [];
  public sectors: any = [];
  public industries: any = [];
  public ImageUrls: any = [];
  public VideoUrls: any = [];
  public UnitS: any = [];
  public file: any;
  public OneUnitName: any;
  public sectorforproduct: any;
  tagErr: any;
  public industryname: any;
  public i: number;
  public secrtorname: any;
  public imagename: any = "";
  public searchCategories: any = "";
  public searchIndustries: any = "";
  public types = ['success', 'error', 'info', 'warning'];
  public masterIncoTerms: any = ["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAT", "DAP", "DDP"];
  public tradeDetailOption: any = {
    "I4GProductCode": "",
    "IncoTerms": { "Selected": [] },
    "PaymentWays": { "Selected": [] },
    "PaymentTerms": { "Selected": [] }
  };
  public saveMediaUrl: any = {
    "I4GProductCode": "",
    "ProductMedia": {
      "ImageUrls": { "Image": [] },
      "VideoUrls": { "Video": [] }
    }
  };
  public PaymentWaysinfo: any = {
    "I4GProductCode": "",
    "PaymentWays": { "Selected": [] }
  };

  public PaymentexportTerms: any = {
    "I4GProductCode": "",
    "PaymentTerms": { "Selected": [] }
  };

  public fileChange(file) {
    this.file1 = file;

    //this.imageUploadForm.controls["Name"].setValue("");
    //this.imageUploadForm.controls["Image"].setValue(this.termsfile.name);
  }

  formErrors = {
    'Productname': '',
    'Productdescription': '',
    'Universalproductcode': '',
    'Europeanarticlenumber': '',
    'Productioncapacity': '',
    'Companyproductid': ''
  };
  validationMessages = {
    'Productname': {
      'required': 'ProductName is required.',
    },
    'Productdescription': {
      'required': 'ProductDescription is required.',
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
    'Samplecost': '',
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

  constructor(private formBuilder: FormBuilder, private validationApiService: ValidationApiService, public toastrService: ToastrService) {
    this.getMyProductsList();
    this.getUnits();
    this.options = this.toastrService.toastrConfig;
    //this.getSampleDetail();
    //this.getProductSpecs();
    //this.getProductFaqs();
    //this.getProductKeywords();
    //this.getSectorIndustryDetail();
    this.getSectorsAndIndustries();
    //this.getTradeDetails();
    //this.getPaymentWaysInfo();

    this.productForm = this.formBuilder.group({
      'I4GProductCode': ['', Validators.required],
      'SKUCode': ['SKU0010', Validators.required],
      'Productname': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      'Productdescription': ['', [Validators.required, Validators.minLength(20), Validators.maxLength(1000)]],
      'Universalproductcode': ['', [Validators.minLength(5), Validators.maxLength(50)]],
      'Companyproductid': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'Productioncapacity': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      'Europeanarticlenumber': ['', [Validators.minLength(5), Validators.maxLength(50)]],
    });
    //this.getProductDetail();

    this.accountForm = this.formBuilder.group({
      'I4GProductCode': '',
      'I4GCompanyCode': ['20171012124501084074', Validators.required],
      'IndustryCode': ['', Validators.required],
      'SectorCode': ['', Validators.required],
    });
    this.tradeDetailForm = this.formBuilder.group({
      'I4GProductCode': ['', Validators.required],
      'TermName': ['', Validators.required],
      'NegotiableQuantity': ['', [Validators.required, Validators.pattern('^[+]?[0-9]+')]],
      'NegotiableUnits': ['', Validators.required],
      'Terms': ['', Validators.required],
      'CostDetail': this.formBuilder.array([this.createCostDetails()]),
    });

    this.SampleForm = this.formBuilder.group({
      'I4GProductCode': ['', Validators.required],
      'Samplecost': ['', [Validators.required, Validators.pattern('^[+]?[0-9]*')]],
      'Samplequantity': ['', [Validators.required, Validators.pattern('^[+]?[0-9]*')]],
      'Sampleunit': ['', Validators.required],
      'Sampleincoterm': ['', Validators.required],
      'Samplenotes': ['', Validators.required],
      'SamplePaymentWaysJson': ['', Validators.required]
    });

    this.productspecForm = this.formBuilder.group({
      'I4GProductCode': ['', Validators.required],
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
      'I4GProductCode': ['', Validators.required],
      'Faqs': this.formBuilder.array([this.createItems()])
    });

    this.ProductKeywordsForm = this.formBuilder.group({
      'I4GProductCode': ['', Validators.required],
      'Word': ['', Validators.required]
    });
    this.productForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged();

    this.SampleForm.valueChanges
      .subscribe(data => this.onValueChanged2(data));
    this.onValueChanged2();

  }

  public addItemCostTrade(i): void {
    var flag = 0;
    for (let i = 0; i < this.tradeDetailForm.value.CostDetail.length; i++) {
      if (this.tradeDetailForm.value.CostDetail[i].Cost && this.tradeDetailForm.value.CostDetail[i].Quantity && this.tradeDetailForm.value.CostDetail[i].Unit) {
        flag++;
      }
    }
    if (this.tradeDetailForm.value.CostDetail.length == flag) {
      this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
      this.CostDetail.push(this.createCostDetails());
    }
  }
  onValueChanged(data?: any) {
    if (!this.productForm) { return; }
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

  public selectIncoTermInTrade(prm) {
    this.tradeDetailForm.controls['TermName'].setValue(prm);
  }
  public saveIncoTermCostDetailAdd() {
    this.tradeDetailForm.value['CostDetails'] = { 'CostDetail': this.tradeDetailForm.value.CostDetail };
    var obj = { 'ExportTerms': { 'ExportTerm': this.tradeDetailForm.value } };
    delete obj.ExportTerms.ExportTerm.CostDetail;
    if(this.editBtn) {
      /* this.validationApiService.updateIncoTermCostDetail(obj).subscribe((data) => {
        this.getIncoTermCostDetail();
        let index = this.tradeDetailOption.IncoTerms.Selected.indexOf(obj.ExportTerms.ExportTerm.TermName);
        if (index > -1) {
          this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
        } else {
          this.tradeDetailOption.IncoTerms.Selected.push(obj.ExportTerms.ExportTerm.TermName);
        }
        this.uploadTermsFile();
        this.tradeDetailForm.controls['I4GProductCode'].setValue(this.productId);
        $('#Incoterm').modal('hide');
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Incoterm Cost Detail Updated successfully', 'Incoterm Cost Detail', opt);
      }); */

      var obj2 = {
        "Product": {
          "I4GProductCode": this.productId,
          "IncoTerm": obj.ExportTerms.ExportTerm.TermName
        }
      }
      this.validationApiService.deleteTradeDetailForm(obj2).subscribe((data2) => {
        console.log(data2);
        if (data2.message === 'Success') {
          this.saveIncTrm(obj);
        }
      });
    } else {
      this.saveIncTrm(obj);
    }

    this.tradeDetailForm.reset();
  }

  public saveIncTrm(obj) {
    this.validationApiService.saveIncoTermCostDetail(obj).subscribe((data) => {
      this.getIncoTermCostDetail();
      let index = this.tradeDetailOption.IncoTerms.Selected.indexOf(obj.ExportTerms.ExportTerm.TermName);
      if (index > -1) {
        this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
      } else {
        this.tradeDetailOption.IncoTerms.Selected.push(obj.ExportTerms.ExportTerm.TermName);
      }
      this.uploadTermsFile();
      this.tradeDetailForm.controls['I4GProductCode'].setValue(this.productId);
      $('#Incoterm').modal('hide');
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Incoterm Cost Detail Added successfully', 'Incoterm Cost Detail', opt);
    });
  }


  public uploadTermsFile() {
    if (this.file1) {
      var termname = this.tradeDetailForm.value.TermName;
      let formData: FormData = new FormData();
      formData.append('file', this.file1, this.file1.name);
      formData.append("i4gProductCode", this.productId);
      formData.append("docType", 'doc');
      formData.append("incoTerm", this.tradeDetailForm.value.TermName);
      this.validationApiService.uploadTermsDocForIncoTerm(formData).subscribe((data) => {

        // this.saveIncoTermCostDetailAdd();
      },
        (error) => {
          console.log(error)
        });
    }
  }
  public getOneIncoterm(data) {
    const opt = JSON.parse(JSON.stringify(this.options));
    var obj = {
      "Product": {
        "I4GProductCode": this.productId,
        "IncoTerm": data
      }
    }
    this.validationApiService.getOneIncoterm(obj).subscribe((data2) => {
      this.tradeDetailForm.patchValue(data2.ExportTerms.ExportTerm);
      const costs = data2.ExportTerms.ExportTerm.CostDetails.CostDetail;

      for (let index = 0; index < costs.length; index++) {
        this.tradeDetailForm.controls['CostDetail']['controls'][index].patchValue(costs[index]);
        if(index < costs.length-1){
          this.tradeDetailForm.controls['CostDetail']['controls'].push(this.createCostDetails());
        }
      }
    });
  }
  public createCostDetails(): FormGroup {
    return this.formBuilder.group({
      "Cost": ['', [Validators.required, Validators.pattern('^[-+]?([0-9]*\.[0-9]+|[0-9]+)')]],
      "Quantity": ['', [Validators.required, Validators.pattern('^[+]?[0-9]+')]],
      "Unit": ['', Validators.required],
      "CostValidity": [null]
    });
  }
  public closeModel() {
    const id = this.tradeDetailForm.value['I4GProductCode'];
    this.tradeDetailForm.reset();
    this.tradeDetailForm.controls['I4GProductCode'].setValue(id);
  }
  public getIncoTermCostDetail() {
    const obj = {
      'Product': {
        'I4GProductCode': this.tradeDetailOption.I4GProductCode
      }
    };
    this.validationApiService.getIncoTermCostDetail(obj).subscribe((data) => {
      console.log()
      if (data.status == 500) {
        this.incoTerms = [];
      } else {
        this.incoTerms = data.ExportTerms.ExportTerm;
      }
    });
  }
  onValueChanged2(data?: any) {
    if (!this.SampleForm) { return; }
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


  toggledata() {
    $("#Changesector").draggable({
      handle: ".modal-header"
    });
  }


  getMyProductsList() {

    var obj = { "Company": { "CompanyCode": "20171012124501084074" } };
    this.validationApiService.getMyProductsList(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.selected = [data[2]];
          this.productlists = data.Products.Product;
          this.temp = [...data.Products.Product];
          this.rows = data.Products.Product;
          this.loadingIndicator = false;
        }
      },
      (err) => {
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
    const temp = this.temp.filter(function (d) {
      return Object.keys(d).some(function (k) {
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
    this.productForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.accountForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.SampleForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.productspecForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.productspecForms.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.ProductKeywordsForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.tradeDetailOption.I4GProductCode = selected[0].I4GProductCode;
    this.saveMediaUrl.I4GProductCode = selected[0].I4GProductCode;
    this.PaymentWaysinfo.I4GProductCode = selected[0].I4GProductCode;
    this.PaymentexportTerms.I4GProductCode = selected[0].I4GProductCode;
    this.tradeDetailForm.controls["I4GProductCode"].setValue(selected[0].I4GProductCode);
    this.productId = selected[0].I4GProductCode;
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }
  public deleteTradeDetailForm(data) {
    console.log(data);
    const opt = JSON.parse(JSON.stringify(this.options));
    var obj = {
      "Product": {
        "I4GProductCode": data.I4GProductCode,
        "IncoTerm": data.TermName
      }
    }
    this.validationApiService.deleteTradeDetailForm(obj).subscribe((data2) => {
      if (data2.message === 'Success') {
        this.getIncoTermCostDetail();
        this.toastrService[this.types[0]]('Incoterm Deleted successfully', 'Incoterm', opt);
        this.tradeDetailOption.IncoTerms.Selected.length = 0;
      }
    });
  }
  public updateTradeDetailForm(item) {
    $("#Incoterm").modal('show');
    this.editBtn = true;

    const formArray =  this.tradeDetailForm.get('CostDetail') as FormArray;
    while (formArray.length !== 1) {
      formArray.removeAt(0)
    }
    this.getOneIncoterm(item);
  }
  getProductDetailbyid(id) {

    //var units =[];
    /* this.getSectorIndustryDetailforprodct(id); */
    var obj = { "Product": { "I4GProductCode": id } };

    this.validationApiService.getSectorIndustryDetail(obj).subscribe((data2) => {
      if (!data2.error) {
        this.sectorforproduct = data2.Details;
        this.validationApiService.getProductDetail(obj).subscribe(
          (data) => {    
            if (!data.error) {
              this.productdetailbyids = data.Product;
              var uuname = this.UnitS.filter((item) => {
                if (item.UnitSid == data.Product.Sampleunit) {
                  return item.UnitName;
                }
              });
              this.industryname = this.sectorforproduct.Industries.Industry[0].Name;
              this.secrtorname = this.sectorforproduct.Sectors.Sector[0].Name;
              this.OneUnitName = uuname.UnitName
            }
          },
          (err) => {
            console.log('kfgbhj')
          }
        );
      }
    }, (err) => {
      console.log('kfgbhj')
    });
  }

  getProductDetail() {
    $('#editproduct').draggable({
    });
    var obj = { "Product": { "I4GProductCode": this.productForm.value.I4GProductCode } };
    this.validationApiService.getProductDetail(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.productForm.patchValue(data.Product);
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }

  saveProductProfile() {
    var obj = { "Product": { "I4GProductCode": this.productForm.value.I4GProductCode, "ProductName": this.productForm.value.Productname, "SKUCode": "SKU0010", "UniversalProductCode": this.productForm.value.Universalproductcode, "EuropeanArticelNumber": this.productForm.value.Europeanarticlenumber, "CompanyProductId": this.productForm.value.Companyproductid, "ProductDescription": this.productForm.value.Productdescription, "ProductionCapacity": this.productForm.value.Productioncapacity } };
    this.validationApiService.saveProductProfile(obj).subscribe((data) => {
      $("#editproduct").modal('hide');
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Product Profile updated successfully', 'Product Profile', opt);
      console.log("saveSampleDetail", data);
    })
  }


  public getSectorIndustryDetail() {
    this.searchCategories = '';
    this.searchIndustries = '';
    var obj = { "Product": { "I4GProductCode": this.accountForm.value.I4GProductCode } };
    this.validationApiService.getSectorIndustryDetail(obj).subscribe((data) => {
      if (!data.error) {
        var s_index = this.sectors.findIndex((item) => {
          return item.Code == data.Details.Sectors.Sector[0].Code
        })
        if (s_index > -1) {
          this.sectors[s_index].active = true;
          this.accountForm.controls["SectorCode"].setValue(this.sectors[s_index].Code);
          this.getIndustriesBySector(this.sectors[s_index].Code, data.Details.Industries.Industry[0].Code);
        }
      }
    }, (err) => {
      console.log('kfgbhj')
    });
  }

  public getSectorIndustryDetailforprodct(id) {
    var obj = { "Product": { "I4GProductCode": id } };
    this.validationApiService.getSectorIndustryDetail(obj).subscribe((data) => {

      console.log("data2");
      console.log(data);

      if (!data.error) {
        this.sectorforproduct = data.Details;
      }
    }, (err) => {
      console.log('kfgbhj')
    });
  }

  public getIndustriesBySector(code, selectedcode) {
    var obj = { "Sector": { "Code": code } };
    this.validationApiService.getIndustriesBySector(obj).subscribe((data) => {
      this.industries = data.Industries.Industry.map((obj) => { obj.active = false; return obj; });
      var s_index = this.industries.findIndex((item) => { return item.Code == selectedcode });
      if (s_index > -1) {
        this.industries[s_index].active = true;
        this.accountForm.controls["IndustryCode"].setValue(this.industries[s_index].Code);
      }
    });
  }

  public getSectorsAndIndustries() {
    this.validationApiService.getSectorsAndIndustries().subscribe((data) => {
      this.sectors = data.Details.Sectors.Sector.map((obj) => { obj.active = false; return obj; });
    }, (error) => {
      this.sectors = [];
    });
  }


  public selectSector(code) {
    var index = this.sectors.findIndex((item) => {
      return item.Code == code;
    });
    if (index > -1) {
      this.sectors = this.sectors.map((obj) => { obj.active = false; return obj; });
      this.sectors[index].active = true;
      this.accountForm.controls["SectorCode"].setValue(code);
      var obj = { "Sector": { "Code": this.sectors[index].Code } };
      this.validationApiService.getIndustriesBySector(obj).subscribe((data) => {
        this.industries = data.Industries.Industry.map((obj) => { obj.active = false; return obj; });
        if (this.industries.length > 0) {
          this.industries[0].active = true;
          this.accountForm.controls["IndustryCode"].setValue(this.industries[0].Code);
        }
      }, (error) => {
        this.industries = [];
        this.accountForm.controls["IndustryCode"].setValue("");
      });
    }
  }

  public selectIndustry(code) {
    var index = this.industries.findIndex((item) => {
      return item.Code == code;
    });
    if (index > -1) {
      this.industries = this.industries.map((obj) => { obj.active = false; return obj; });
      this.industries[index].active = true;
      this.accountForm.controls["IndustryCode"].setValue(code);
    }
  }

  public saveSectorIndustryDetail() {
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
            if (this.searchIndustries != '') {
              if (this.searchIndustries == this.industries[index2].Name) {
                this.sectors.map((item) => { if (item.Code == this.accountForm.value.SectorCode) { this.confirmDetail["SectorName"] = item.Name } });
                this.industries.map((item) => { if (item.Code == this.accountForm.value.IndustryCode) { this.confirmDetail["IndustryName"] = item.Name } });
                var obj = { "Product": this.accountForm.value };
                this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                  const opt = JSON.parse(JSON.stringify(this.options));
                  this.toastrService[this.types[0]]('Sector & Insdustry updated successfully', 'Sector & Insdustry', opt);
                  $("#Changesector").modal('hide');
                }, (error) => {
                  console.log("error", error);
                });
              }
            } else {
              this.sectors.map((item) => { if (item.Code == this.accountForm.value.SectorCode) { this.confirmDetail["SectorName"] = item.Name } });
              this.industries.map((item) => { if (item.Code == this.accountForm.value.IndustryCode) { this.confirmDetail["IndustryName"] = item.Name } });
              var obj = { "Product": this.accountForm.value };
              this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                $("#Changesector").modal('hide');
              }, (error) => {
                console.log("error", error);
              });
            }
          }
        }
      } else {
        var index2 = this.industries.findIndex((item) => {
          return item.Code == this.accountForm.value.IndustryCode;
        });
        if (index2 > -1) {
          if (this.searchIndustries != '') {
            if (this.searchIndustries == this.industries[index2].Name) {
              this.sectors.map((item) => { if (item.Code == this.accountForm.value.SectorCode) { this.confirmDetail["SectorName"] = item.Name } });
              this.industries.map((item) => { if (item.Code == this.accountForm.value.IndustryCode) { this.confirmDetail["IndustryName"] = item.Name } });
              var obj = { "Product": this.accountForm.value };
              this.validationApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
                $("#Changesector").modal('hide');
              }, (error) => {
                console.log("error", error);
              });
            }
          } else {
            this.sectors.map((item) => { if (item.Code == this.accountForm.value.SectorCode) { this.confirmDetail["SectorName"] = item.Name } });
            this.industries.map((item) => { if (item.Code == this.accountForm.value.IndustryCode) { this.confirmDetail["IndustryName"] = item.Name } });
            var obj = { "Product": this.accountForm.value };
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


  getSampleDetail() {
    var obj = { "Product": { "I4GProductCode": this.SampleForm.value.I4GProductCode } };
    this.validationApiService.getSampleDetail(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.SampleForm.patchValue(data.Product);
          this.paytype = data.Product.SamplePaymentWaysJson;
          console.log(this.paytype);
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }

  public getUnits() {
    this.validationApiService.getUnits().subscribe((data) => {
      this.UnitS = data.UnitS;
    }, (error) => {
      console.log(error);
      this.UnitS = [];
    });
  }

  public paymentType(parm) {
    this.paytype = parm;
    this.SampleForm.controls["SamplePaymentWaysJson"].setValue(this.paytype);
  }

  saveSampleDetail() {
    var obj = { "Product": { "I4GProductCode": this.SampleForm.value.I4GProductCode, "SampleCost": this.SampleForm.value.Samplecost, "SampleQuantity": this.SampleForm.value.Samplequantity, "SampleUnit": this.SampleForm.value.Sampleunit, "SampleIncoTerm": this.SampleForm.value.Sampleincoterm, "SampleNotes": this.SampleForm.value.Samplenotes, "SamplePaymentWaysJson": this.SampleForm.value.SamplePaymentWaysJson } };
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
      if (this.productspecForm.value.items[i].Name && this.productspecForm.value.items[i].Value) {
        flag++;
      }
    }
    if (this.productspecForm.value.items.length == flag) {
      this.items = this.productspecForm.get('items') as FormArray;
      this.items.push(this.createItem());
    }
  }

  public removeItem(i): void {
    this.items = this.productspecForm.get('items') as FormArray;
    this.items.removeAt(i)
  }

  public getProductSpecs() {
    var obj = { "Product": { "I4GProductCode": this.productspecForm.value.I4GProductCode } };
    console.log(obj);
    this.validationApiService.getProductSpecs(obj).subscribe(
      (data) => {
        if (!data.error) {
          console.log(data);
          this.specitems = data.ProductSpecs.Spec;
          // this.productspecForm.patchValue(data.ProductSpecs.Spec);
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }

  saveProductspecProfileAdd() {
    this.specitems = this.specitems.concat(this.productspecForm.value.items);
  }


  saveProductspecProfile() {
    var obj = { "I4GProductCode": this.productspecForm.value.I4GProductCode, "ProductSpecs": { "Spec": this.specitems } };
    this.validationApiService.saveProductSpecs(obj).subscribe((data) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Specifications Details updated successfully', 'Specifications Details', opt);
      // this.productspecForm.controls["items"].setValue([{"Name" : "", "Value": ""}]);
      console.log("saveSampleDetail", data);
    });
  }

  getProductMedia() {
    const im = $('.delete-img');
    if(im.length > 0) {
      im[0].click();
    }

    const obj = { "Product": { "I4GProductCode": this.saveMediaUrl.I4GProductCode } };
    delete this.imagename;
    this.validationApiService.getProductMedia(obj).subscribe(
      (data) => {
        if (!data.error) {
          delete this.file;
          this.imageUploadForm.controls["Name"].setValue(null);
          this.imageUploadForm.controls["Image"].setValue(null);
          this.imageUploadForm.reset();
          this.videoUrlsForm.reset();
          console.log("data");
          console.log(data);
          this.saveMediaUrl.ProductMedia.ImageUrls.Image = data['ProductMedia']['ImageUrls']['Image'];
          this.saveMediaUrl.ProductMedia.VideoUrls.Video = data['ProductMedia']['VideoUrls']['Video'];
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
      (err) => {
        console.log('err');
        console.log(err);
      }
    );
  }

  public removeImageUrlToList(i) {
    this.saveMediaUrl.ProductMedia.ImageUrls.Image.splice(i, 1);
  }

  public removeVideoUrlToList(i) {
    this.saveMediaUrl.ProductMedia.VideoUrls.Video.splice(i, 1);
  }

  public removeSpecItemsToList(i) {
    this.specitems.splice(i, 1);
  }

  public removeProdctFaqsToList(item, id, i) {
    this.prdctFaqs.splice(i, 1);
    if (id == undefined) {
      let data2 = this.newPrdctFaqs.filter((data) => {
        return data.Answer == item.Answer && data.Question == item.Question;
      });
      this.newPrdctFaqs.splice(this.newPrdctFaqs.indexOf(data2[0]), 1);
    } else {
      let obj = {
        'I4gProductCode': this.productspecForms.value.I4GProductCode,
        'FaqId': id
      }
      this.validationApiService.deleletProductFq(obj).subscribe((data) => {
        console.log(data);
        this.getProductFaqs();
      });
    }


  }

  public imageChange(file) {
    console.log("file event", file);
    this.file = file;
    this.imageUploadForm.controls["Name"].setValue("");
    this.imageUploadForm.controls["Image"].setValue(this.file.name);
  }

  public createVideoUrl(): FormGroup {
    return this.formBuilder.group({
      'Name': ['', Validators.required],
      'Url': ['', Validators.required]
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

  public updateMediaUrls() {
    this.saveMediaUrl.ProductMedia.VideoUrls.Video = this.saveMediaUrl.ProductMedia.VideoUrls.Video.concat(this.videoUrlsForm.value.VideoUrls);
    this.videoUrlsForm.reset();
  }

  public uploadProductImage() {
    if (this.file) {
      let formData: FormData = new FormData();
      formData.append('file', this.file, this.file.name);
      formData.append("i4gProductCode", this.saveMediaUrl.I4GProductCode);
      this.validationApiService.uploadProductImage(formData).subscribe(
        (data) => {
          this.saveMediaUrl.ProductMedia.ImageUrls.Image.push({ Name: this.imageUploadForm.value.Name, Url: data.message });
          console.log("this.saveMediaUrl", this.saveMediaUrl);
          this.imageUploadForm.reset();
          this.imagename = '.';
          setTimeout(() => {
            this.imagename = 'assets/img/app/no-image.png';
          }, 500);
        },
        (error) => { console.log(error) });
    }
  }

  public saveProductMedia() {
    if (this.saveMediaUrl.ProductMedia.ImageUrls.Image.length > 0) {
      this.validationApiService.saveProductMedia(this.saveMediaUrl).subscribe((data) => {
        console.log("data", data);
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Product Media updated successfully', 'Product Media', opt);
        $("#Changemedia1").modal('hide');
      }, (error) => {
        console.log("error", error);
      });
    }
  }
  public selectedIncoterm() {
    const id = this.tradeDetailForm.value['I4GProductCode'];
    this.tradeDetailForm.reset();
    this.tradeDetailForm.controls['I4GProductCode'].setValue(id);
    this.editBtn = false;
    const formArray =  this.tradeDetailForm.get('CostDetail') as FormArray;
    while (formArray.length !== 1) {
      formArray.removeAt(0)
    }
    this.selectIncoTermInTrade(this.masterIncoTerms[0]);

  }
  getTradeDetails() {
    this.getIncoTermCostDetail();
    var obj = { "Product": { "I4GProductCode": this.tradeDetailOption.I4GProductCode } };
    this.validationApiService.getTradeDetails(obj).subscribe(
      (data) => {

        console.log("data");
        console.log(data);
        
        if (!data.error) {
          if (data) {
            if (data.TradeDetails.IncoTerms.Selected === null) {
              this.tradeDetailOption.IncoTerms = [];
            } else {
              this.tradeDetailOption.IncoTerms = data.TradeDetails.IncoTerms;
            }
            this.tradeDetailOption.PaymentTerms = data.TradeDetails.PaymentTerms;
            this.tradeDetailOption.PaymentWays = data.TradeDetails.PaymentWays;
          }
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }


  public selectPaymentTerms(value) {
    var index = this.tradeDetailOption.PaymentTerms.Selected.indexOf(value);
    if (index > -1) {
      this.tradeDetailOption.PaymentTerms.Selected.splice(index, 1);
    } else {
      this.tradeDetailOption.PaymentTerms.Selected.push(value);
    }
  }

  public selectIncoTerms(value) {
    var index = this.tradeDetailOption.IncoTerms.Selected.indexOf(value);
    if (index > -1) {
      this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
    } else {
      this.tradeDetailOption.IncoTerms.Selected.push(value);
    }
  }

  public selectedPaymentWays(value) {
    var index = this.tradeDetailOption.PaymentWays.Selected.indexOf(value);
    if (index > -1) {
      this.tradeDetailOption.PaymentWays.Selected.splice(index, 1);
    } else {
      this.tradeDetailOption.PaymentWays.Selected.push(value);
    }
  }

  public saveTradeDetails() {
    for (var item in this.tradeDetailOption) { this.confirmDetail[item] = this.tradeDetailOption[item] };
    this.validationApiService.saveTradeDetails(this.tradeDetailOption).subscribe((data) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Trade Details updated successfully', 'Trade Details', opt);
    })
  }

  getPaymentWaysInfo() {
    var obj = { "Product": { "I4GProductCode": this.PaymentWaysinfo.I4GProductCode } };
    this.validationApiService.getPaymentWaysInfo(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.PaymentWaysinfo.PaymentWays.Selected = data.PaymentWays.PaymentWays;
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }
  public selectedPaymentWaysinfo(value) {
    var index = this.PaymentWaysinfo.PaymentWays.Selected.indexOf(value);
    if (index > -1) {
      this.PaymentWaysinfo.PaymentWays.Selected.splice(index, 1);
    } else {
      this.PaymentWaysinfo.PaymentWays.Selected.push(value);
    }
  }

  public savePaymentWaysInfo() {
    for (var item in this.tradeDetailOption) { this.confirmDetail[item] = this.tradeDetailOption[item] };
    this.validationApiService.savePaymentWaysInfo(this.PaymentWaysinfo).subscribe((data) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Payment Ways Info updated successfully', 'Payment Ways Info', opt);
      console.log(data);
    })
  }

  public selectPaymentexportTerms(value) {
    var index = this.PaymentexportTerms.PaymentTerms.Selected.indexOf(value);
    if (index > -1) {
      this.PaymentexportTerms.PaymentTerms.Selected.splice(index, 1);
    } else {
      this.PaymentexportTerms.PaymentTerms.Selected.push(value);
    }
  }

  getPaymentTermsInfo() {
    var obj = { "Product": { "I4GProductCode": this.PaymentexportTerms.I4GProductCode } };
    this.validationApiService.getPaymentTermsInfo(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.PaymentexportTerms.PaymentTerms.Selected = data.PaymentTerms.PaymentTerms;
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }

  public savePaymentTermsInfo() {
    for (var item in this.tradeDetailOption) { this.confirmDetail[item] = this.tradeDetailOption[item] };
    this.validationApiService.savePaymentTermsInfo(this.PaymentexportTerms).subscribe((data) => {
      $("#Changeexporttrm").modal('hide');
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Payment Terms Info updated successfully', 'Payment Terms Info', opt);
    })
  }

  public addTag() {
    var value = this.tag.trim();
    if (value.length > 0) {
      this.tags.push(JSON.parse(JSON.stringify(this.tag)));
      // this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      if (this.tags.length > 0) {
        this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      } else {
        this.ProductKeywordsForm.controls["Word"].setValue("");
      }
      this.tagErr = false;
      this.tag = "";
    } else {
      this.tagErr = true;
    }
  }

  public removeTag(index) {
    this.tags.splice(index, 1);
    if (this.tags.length > 0) {
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
    } else {
      this.ProductKeywordsForm.controls["Word"].setValue("");
    }
  }


  getProductKeywords() {
    var obj = { "Product": { "I4GProductCode": this.ProductKeywordsForm.value.I4GProductCode } };
    this.validationApiService.getProductKeywords(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.tags = data.ProductKeywords.Word;
        }
      },
      (err) => {
        console.log('kfgbhj')
      }
    );
  }
  public closemodal() {
    delete this.tag;
    const id = this.tradeDetailForm.value['I4GProductCode'];
    this.tradeDetailForm.reset();
    this.tradeDetailForm.controls['I4GProductCode'].setValue(id);
  }

  public saveProductKeywords() {
    if (this.tags.length > 0) {
      var obj = { "ProductKeywords": { "I4GProductCode": this.ProductKeywordsForm.value.I4GProductCode, "Words": { "Word": this.ProductKeywordsForm.value.Word } } };
      delete this.tag;
      this.validationApiService.saveProductKeywords(obj).subscribe((data) => {
        const opt = JSON.parse(JSON.stringify(this.options));
        this.toastrService[this.types[0]]('Product Keywords Info updated successfully', 'Product Keywords', opt);
        console.log("words", data);

        $('#Changekeyword').modal('hide');
      });
    } else {
      this.toastrService[this.types[1]]('Product Keywords require alteast 1 value', 'Product Keywords');
    }
  }


  public createItems(): FormGroup {
    return this.formBuilder.group({
      "Question": ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      "Answer": ['', [Validators.required, Validators.minLength(5), Validators.maxLength(2000)]]
    });
  }

  public addItems(): void {
    var flag = 0;
    for (let i = 0; i < this.productspecForms.value.Faqs.length; i++) {
      if (this.productspecForms.value.Faqs[i].Question && this.productspecForms.value.Faqs[i].Answer) {
        flag++;
      }
    }
    if (this.productspecForms.value.Faqs.length == flag) {
      this.Faqs = this.productspecForms.get('Faqs') as FormArray;
      this.Faqs.push(this.createItems());
    }
  }

  public removeItems(i): void {
    this.Faqs = this.productspecForms.get('Faqs') as FormArray;
    this.Faqs.removeAt(i)
  }
  public removeItemCostTrade(i): void {
    this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
    this.CostDetail.removeAt(i)
  }

  getProductFaqs() {
    this.newPrdctFaqs = [];
    var obj = { "Product": { "I4GProductCode": this.productspecForms.value.I4GProductCode } };
    this.validationApiService.getProductFaqs(obj).subscribe(
      (data) => {
        if (!data.error) {
          this.prdctFaqs = data.ProductFaqs.Faq;
          // this.productspecForm.patchValue(data.ProductSpecs.Spec);
        }
      },
      (err) => {
        this.prdctFaqs = [];
        console.log('kfgbhj')
      }
    );
  }

  onQusetionChange(searchValue: string) {
    if (searchValue.length < 5) {
      this.faqmsgq = true;
    } else {
      this.faqmsgq = false;
    }
  }

  onAnswerChange(searchValue: string) {
    if (searchValue.length < 5) {
      this.faqmsga = true;
    } else {
      this.faqmsga = false;
    }
  }

  saveProductFaqsAdd() {
    this.newPrdctFaqs = this.newPrdctFaqs.concat(this.productspecForms.value.Faqs);
    this.prdctFaqs = this.prdctFaqs.concat(this.productspecForms.value.Faqs);
    this.productspecForms.controls["Faqs"].setValue([{ "Question": "", "Answer": "" }]);

  }

  saveProductFaqs() {
    let obj = { 'ProductFaqs': { 'I4GProductCode': this.ProductKeywordsForm.value.I4GProductCode, 'Faq': this.newPrdctFaqs } };
    this.validationApiService.saveProductFaqs(obj).subscribe((data) => {
      const opt = JSON.parse(JSON.stringify(this.options));
      this.toastrService[this.types[0]]('Product FAQs Info updated successfully', 'Product FAQs', opt);
      this.productspecForms.controls['Faqs'].setValue([{ 'Question': '', 'Answer': '' }]);

    });
  }

}


