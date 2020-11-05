import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  registered = false;
	submitted = false;
	userForm: FormGroup;
	guid: string;
  serviceErrors:any = {};
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  checked1 = false;
  checked2 = false;
  public imagePath;
  imgURL: any;
  public message: string;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
  }

  invalidFirstName()
  {
  	return (this.submitted && (this.serviceErrors.first_name != null || this.userForm.controls.first_name.errors != null));
  }

  invalidLastName()
  {
  	return (this.submitted && (this.serviceErrors.last_name != null || this.userForm.controls.last_name.errors != null));
  }

  invalidPassword()
  {
  	return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }
  optionSelected(num)
  {
    //need to change method here (hardcoded)
    if(num == 1){
      if(this.checked1){
        this.checked1=false;
      }
      else{
        this.checked1=true;
      }
    } else{
      if(this.checked2){
        this.checked2=false;
      }
      else{
        this.checked2=true;
      }
    }
  }

  //used from https://www.talkingdotnet.com/show-image-preview-before-uploading-using-angular-7/
  preview(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }
  ngOnInit()
  {
  	this.userForm = this.formBuilder.group({
  		first_name: ['', [Validators.required, Validators.maxLength(50)]],
  		last_name: ['', [Validators.required, Validators.maxLength(50)]],
  		password: ['', [Validators.required, Validators.minLength(5)]]
    });

    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  onSubmit()
  {
	console.log("Testing");
  	this.submitted = true;
		  console.log('working')
  		let data: any = Object.assign({guid: this.guid}, this.userForm.value);

  		this.http.post('/api/v1/customer', data).subscribe((data:any) => {
	      
	      let path = '/user/' + data.customer.uid;

	      this.router.navigate([path]);
	    }, error =>
	    {
	    	this.serviceErrors = error.error.error;
        });

  		this.registered = true;

  	// }
  }

}
