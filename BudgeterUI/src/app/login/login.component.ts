import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  guid: string;
  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) {
    this.http.get('/api/v1/generate_uid').subscribe((data:any) => {
      this.guid = data.guid;
    }, error => {
        console.log("There was an error generating the proper GUID on the server", error);
    });

   }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
  		first_name: ['', [Validators.required, Validators.maxLength(50)]],
  		last_name: ['', [Validators.required, Validators.maxLength(50)]],
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		password: ['', [Validators.required, Validators.minLength(5)]]
  	});
  }

  login(){
    let data: any = Object.assign({guid: this.guid}, this.userForm.value);

    this.http.post('/api/v1/customer', data).subscribe((data:any) => {
	      
      let path = '/user/' + data.customer.uid;

      this.router.navigate([path]);
    });
  }

}
