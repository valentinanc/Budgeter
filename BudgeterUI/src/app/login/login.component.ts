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

  userForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private http: HttpClient,private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
  		first_name: ['', [Validators.required, Validators.maxLength(50)]],
  		last_name: ['', [Validators.required, Validators.maxLength(50)]],
  		email: ['', [Validators.required, Validators.email, Validators.maxLength(75)]],
  		password: ['', [Validators.required, Validators.minLength(5)]]
  	});
  }

  login(){
    let data: 123
    let path = '/user/' + data;
    this.router.navigate([path]);
  }

}
