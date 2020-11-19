import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  guid: string;
  submitted = false;
  usernotRegistered = false;
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) {
    // this.http.get('/api/generate_uid').subscribe((data:any) => {
    //   this.guid = data.guid;
    // }, error => {
    //     console.log("There was an error generating the proper GUID on the server", error);
    // });

   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		password: ['', [Validators.required, Validators.minLength(5)]]
  	});
  }
  incorrect(){
    return this.submitted && this.usernotRegistered
  }

  login(){
    this.submitted = true
    
    let data: any = Object.assign({guid: this.guid}, this.userForm.value);

    this.http.post('/api/customer/login/', data).subscribe((data:any) => {
        
      if (data.customer == null){
        this.usernotRegistered = true
        this.incorrect()
      }
      else{
        let path = '/user/' + data.customer.id;
        this.router.navigate([path]);
      }
      
    });
  }

};

