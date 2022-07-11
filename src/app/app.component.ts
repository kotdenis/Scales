import { Component } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'scales';

  imgChangeEvt: any = '';
  cropImgPreview: any = '';

onFileChange(event: any): void {
    this.imgChangeEvt = event;
}
cropImg(e: ImageCroppedEvent) {
    this.cropImgPreview = e.base64;
}
imgLoad() {
    // display cropper tool
}
initCropper() {
    // init cropper
}

imgFailed() {
    // error msg
}
}
