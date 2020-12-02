import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/service.component';

@Component({
  selector: 'user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {
  registered = false;
  submitted = false;
  passchange = false;
  userForm: FormGroup;
  passForm: FormGroup;
  aboutForm: FormGroup;
	guid: string;
  serviceErrors:any = {};
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  newPP= false;
  checked1 = false;
  checked2 = false;
  public imagePath;
  imgURL: any;
  public message: string;
  uid: string;
  aychange = false;
 

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private sharedService:SharedService)
  {
    this.uid = this.route.url["value"][1]["path"];
    console.log(this.uid);
  }

  invalidPassword()
  {
  	return (this.submitted && (this.serviceErrors.password != null || this.userForm.controls.password.errors != null));
  }

  invalidConfirmPassword()
  {
  	return (this.submitted && (this.serviceErrors.password_confirm != null || this.userForm.controls.password_confirm.errors != null));
  }
  passwordCheck()
  {
	return (this.userForm.value.password_confirm == this.userForm.value.password)
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
      localStorage.setItem(this.uid, this.imgURL) 
    }  
    this.newPP = true;
    this.sharedService.sendClickEvent();
    
  }
  ngOnInit()
  {
    this.userForm = this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password_confirm: ['', [Validators.required, Validators.minLength(5)]]   
    });

    this.aboutForm = this.formBuilder.group({
      budget: [''],
      id: [this.uid]
    });

    this.http.get('/api/customer/' + this.uid).subscribe((data:any) => {
      this.userForm = this.formBuilder.group({
        'first_name': [data.customer.FName==undefined?'': data.customer.FName],
        'last_name': [data.customer.LName==undefined?'': data.customer.LName],
        'email': [data.customer.Email==undefined?'': data.customer.Email],
        'password': [''],
        'password_confirm': ['']
      });
    });

    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      this.aboutForm = this.formBuilder.group({
        'budget': [data.userProfile.MBudget==undefined?'': data.userProfile.MBudget.toFixed(2)],
        'id': [this.uid]
      });
    });
    if (localStorage.getItem(this.uid) == null){
      this.imgURL = "https://community.intersystems.com/sites/default/files/pictures/picture-default.jpg";
    } else{
      this.imgURL = localStorage.getItem(this.uid);
    }
  }


  updatePassword(){
    if(this.userForm.value.password != '' || this.userForm.value.password_confirm != ''){
      this.submitted = true;
      if(this.userForm.status == "VALID" && this.passwordCheck())
  	  {
        let data: any = Object.assign({guid: this.guid}, this.userForm.value);

        this.http.post('/api/customer/settings/', data).subscribe((data:any) => {
          
          if (data.customer == null){
            alert("Something went wrong.")
          } else{
            this.passchange = true;
          }
        });
      }
    }
    
  }

  updateAboutYou(){
    
      let data: any = Object.assign({guid: this.guid}, this.aboutForm.value);

      this.http.post('/api/user-profile/total-budget/', data).subscribe((data:any) => {
          
        if (data.userProfile == null){
          alert("Something went wrong.")
        } else{
          this.aychange = true;
        }
      });

  }

  onSubmit()
  {
	console.log("Testing");
  	this.submitted = true;
		  console.log('working')
  		let data: any = Object.assign({guid: this.guid}, this.userForm.value);

  		// this.http.post('/api/customer', data).subscribe((data:any) => {
	      
	    //   let path = '/user/' + data.customer.uid;

	    //   this.router.navigate([path]);
	    // }, error =>
	    // {
	    // 	this.serviceErrors = error.error.error;
      //   });

      this.registered = true;

  	// }
  }

}
