import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SharedService } from '../services/service.component';
@Component({
  selector: 'about-you',
  templateUrl: './about-you.component.html',
  styleUrls: ['./about-you.component.css']  
})

export class AboutYouComponent implements OnInit {
  isLinear = false;
  userForm: FormGroup;
  checked1 = false;
  checked2 = false;
  categories = [
    {name: 'Housing', completed: false},
    {name: 'Transportation', completed: false},
    {name: 'Food', completed: false},
    {name: 'Savings', completed: false}
  ]
  goals = [
    {name: 'Pay off loans', completed: false},
    {name: 'Buy Property', completed: false},
    {name: 'Travel', completed: false},
    {name: 'Start a business', completed: false},
    {name: 'Buy a car', completed: false}
  ]
  constructor(public dialogRef: MatDialogRef<AboutYouComponent>, private http: HttpClient, private formBuilder: FormBuilder, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
  		mbudget: ['', [Validators.required,Validators.min(1)]],
  		// mexpenses: ['', [Validators.required,Validators.min(1)]],
      // msavings: ['', [Validators.required,Validators.min(1)]],
      oCategory:  [''],
      ofGoal:  ['']
	  });
  }

  notcomplete(){
    if (this.userForm.status == "INVALID"){
        return true;
    }
    else{
      return false;
    }
  }
  submit(){
    if(this.userForm.status == "VALID")
  	{
      
      var categoriesSelected  = this.categories.filter(x=>x.completed)
      var goalsSelected = this.goals.filter(x=>x.completed)
      if (this.userForm.value["oCategory"] != ''){
        categoriesSelected.push({name: this.userForm.value["oCategory"], completed: true})
      }
      if (this.userForm.value["ofGoal"] != ''){
        goalsSelected.push({name: this.userForm.value["ofGoal"], completed: true})
      }

      let id = this.router.url.split("/")[2];
      // Add monthly budget/expense/savings

      // let budgetData: any = Object.assign({body: {mbudget: this.userForm.value["mbudget"], mexpenses: this.userForm.value["mexpenses"], msavings: this.userForm.value["msavings"]}, userId: id});
      let budgetData: any = Object.assign({body: {mbudget: this.userForm.value["mbudget"]}, userId: id});
      this.http.post('/api/budget/changeBudget', budgetData).subscribe((data:any) => {
          console.log("budget changed: ", data)
      });

      // Add Categories
      let data: any = Object.assign({body: categoriesSelected, userId: id});
      this.http.post('/api/budget/addCategories', data).subscribe((data:any) => {
          console.log("categories added: ", data)
      });
      // Add Financial Goals
      let upId = -1
      this.http.get('/api/user-profile/' + id).subscribe((data:any) => {
        upId = data.userProfileId;
        for (var goal of goalsSelected){
          let fdata: any = Object.assign({name: goal.name}, {isCompleted: false}, {userProfileId: upId});
          this.http.post('/api/financial-goals/', fdata).subscribe((res:any) => {
            console.log("financial goal added");
          });
        }
      });
      this.sharedService.sendClickEvent();
    }
  }
}
