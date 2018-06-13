import { Component, ViewEncapsulation } from '@angular/core';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'az-inputs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './inputs.component.html'
})
export class InputsComponent {
    public firstControlModel: number[];
    public firstControlOptions: IMultiSelectOption[] = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
    ];

    public secondControlModel: number[];
    public secondControlSettings: IMultiSelectSettings = {
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true
    };
    public secondControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        defaultTitle: 'Select countries',
        allSelected: 'All selected',
    };
    public secondControlOptions: IMultiSelectOption[] = [
        { id: 1, name: 'Sweden'},
        { id: 2, name: 'Norway' },
        { id: 3, name: 'Canada' },
        { id: 4, name: 'USA' }
    ];


    public thirdControlModel: number[];
    public thirdControlSettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true
    };
    public thirdControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find...',
        defaultTitle: 'Select countries',
        allSelected: 'All selected',
    };
    public thirdControlOptions: IMultiSelectOption[] = [
        { id: 1, name: 'Sweden'},
        { id: 2, name: 'Norway' },
        { id: 3, name: 'Canada' },
        { id: 4, name: 'USA' }
    ];
  

    public onChange() {
        console.log(this.firstControlModel);
    }
}
