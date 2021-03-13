import { Component, OnInit } from "@angular/core";
import { UploaderService } from "../services/uploader.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"]
})
export class UserComponent implements OnInit {
  progress: number;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;
  responseData : {}

  imageUrl: string | ArrayBuffer =
    "https://bulma.io/images/placeholders/480x480.png";
  fileName: string = "No file selected";

  constructor(private uploader: UploaderService) {}

  ngOnInit() {
    this.uploader.progressSource.subscribe(progress => {
      this.progress = progress;
    });
  }

  onChange(file: File) {
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
      };
    }
  }

  onUpload() {
    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;

    this.uploader.upload(this.file).subscribe(message => {
      this.isUploading = false;
      this.infoMessage = message;
	  console.log('result:',message)
		const result = {};
		 console.log('rrrrr:',message[0].detections,message[0].detections.length)
		  for(let i = 0; i < message[0].detections.length; i++){
			   console.log(message[0].detections[i].class)
			 if(result.hasOwnProperty(message[0].detections[i].class)) {
				 //console.log('value:'+i+ "=" +message[0].detections[i].class)
				 result[message[0].detections[i].class] = Number(result[message[0].detections[i].class]) + 1;
			 } else {
				result[message[0].detections[i].class] = 1 ;
			 }
		  }
		  this.responseData = result;
		 //console.log('final result:',result)  
    });
  }
}
