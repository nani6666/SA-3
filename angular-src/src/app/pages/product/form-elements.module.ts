import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { InputsComponent } from './inputs/inputs.component';
import { FileUploaderComponent } from './inputs/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './inputs/image-uploader/image-uploader.component';
import { MultipleImageUploaderComponent } from './inputs/multiple-image-uploader/multiple-image-uploader.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ValidationsComponent } from './productlisting/validations.component';
import { WizardComponent } from './addproduct/wizard.component';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

export const routes = [
  { path: '', redirectTo: 'inputs', pathMatch: 'full'},
  /*{ path: 'inputs', component: InputsComponent, data: { breadcrumb: 'Inputs' } },
  { path: 'layouts', component: LayoutsComponent, data: { breadcrumb: 'Layouts' } },*/
  { path: '', component: ValidationsComponent, data: { breadcrumb: 'Products' } },
  { path: 'addproduct', component: WizardComponent, data: { breadcrumb: 'Add Product' } }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MultiselectDropdownModule,
    DirectivesModule, 
    NgxDatatableModule,   
    RouterModule.forChild(routes),
    PipesModule
  ],
  declarations: [
    InputsComponent,
    FileUploaderComponent,
    ImageUploaderComponent,
    MultipleImageUploaderComponent,
    LayoutsComponent,
    ValidationsComponent,
    WizardComponent,
  ]
})
export class FormElementsModule { }
