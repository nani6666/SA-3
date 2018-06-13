import { Component, Input, ViewEncapsulation, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'az-image-uploader',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {

    @Input() image: any;
    @Output() valueChange = new EventEmitter();
  
    fileChange(input){
        const reader = new FileReader();
        if (input.files.length) {
            const file = input.files[0];
            reader.onload = () => {
                this.image = reader.result;
                this.valueChange.emit(file);
            }
            reader.readAsDataURL(file);           
        }else{
          this.image = "";
          this.valueChange.emit(this.image);
        }

    }

    removeImage():void{
        this.image = '';
        this.valueChange.emit(this.image);
    }

}

