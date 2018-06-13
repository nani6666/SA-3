import { Component, Input, Output, ViewEncapsulation, EventEmitter } from '@angular/core';


@Component({
  selector: 'az-file-uploader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {
    // public file:any;
    
   /* @Input() file: any;
    @Output() valueChange = new EventEmitter();
  
    public fileChange(input){
        const reader = new FileReader();
        if (input.files.length){       
            this.file = input.files[0].name;            
            }
        }

    public removeFile():void{
        this.file = '';
    }*/


    @Input() file: any;
    @Output() valueChange = new EventEmitter();
  
    fileChange(input){

        const reader = new FileReader();
        if (input.files.length) {
            const file = input.files[0];
            reader.onload = () => {
                console.log(reader);
                this.file = reader.result;
                }
            this.valueChange.emit(file);
            //reader.readAsDataURL(file);           
        }else{
          this.file = "";
          this.valueChange.emit(this.file);
        }

    }

    removeFile():void{
        this.file = "";
        this.valueChange.emit(this.file);
    }

}
