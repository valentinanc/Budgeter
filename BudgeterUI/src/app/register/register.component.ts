import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
	registered = false;
	submitted = false;
	userForm: FormGroup;
	guid: string;
	serviceErrors:any = {};

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router)
  {
  	// this.http.get('/api/generate_uid').subscribe((data:any) => {
    //   this.guid = data.guid;
    // }, error => {
    //     console.log("There was an error generating the proper GUID on the server", error);
    // });
  }

  invalidFirstName()
  {
  	return (this.submitted && (this.serviceErrors.first_name != null || this.userForm.controls.first_name.errors != null));
  }

  invalidLastName()
  {
  	return (this.submitted && (this.serviceErrors.last_name != null || this.userForm.controls.last_name.errors != null));
  }

  invalidEmail()
  {
  	return (this.submitted && (this.serviceErrors.email != null || this.userForm.controls.email.errors != null));
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
  ngOnInit()
  {
  	this.userForm = this.formBuilder.group({
  		firstName: ['', [Validators.required, Validators.maxLength(50)]],
  		lastName: ['', [Validators.required, Validators.maxLength(50)]],
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
		password: ['', [Validators.required, Validators.minLength(5)]],
		password_confirm: ['', [Validators.required, Validators.minLength(5)]]
	  });
  }

  onSubmit()
  {
	this.registered = true;
  	this.submitted = true;
	  
	if(this.userForm.status == "VALID" && this.passwordCheck())
  	{
		let data: any = Object.assign({guid: this.guid}, this.userForm.value);
		this.http.post('/api/customer/register', data).subscribe((data:any) => {
		if (data != null){
			let path = '/user/' + data.customer.uid;	
			this.router.navigate([path]);
		}	
	  	}, error =>
		{
			this.serviceErrors = error.error.error;
		});
		this.registered = true; 
  	}		
  }

  signIn(){
	let path = '';

	this.router.navigate([path]);
  }

};