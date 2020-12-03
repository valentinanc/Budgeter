import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SharedService } from '../services/service.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.css']
})

export class AddItemsComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  categories: Category[] = [];
  uid: any;
  checked1 = false;
  expenseSelected=true;
  clickEventsubscription: Subscription;
  constructor(public dialogRef: MatDialogRef<AddItemsComponent>, private _formBuilder: FormBuilder, private sharedService:SharedService, private http: HttpClient, private router: Router) {
    this.uid = this.router.url.split("/")[2];
    this.categories = []
    this.http.get('/api/budget/getCategories/' + this.uid).subscribe((data:any) => {
      let map = new Map();
      let count = 0;
      for(var i = 0; i < data.length; i++) {
        var obj = data[i];
        if (!map.has(obj.Name)){
            map.set(obj.Name, 1);
            this.categories.push({value: count.toString(), viewValue: obj.Name})
            count++;
        }
      }
      this.categories.push({value: count.toString(), viewValue: 'Other'})
    }, error => {
        console.log("There was an error displaying the financial goals", error);
    });
   }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({
      name: ["", Validators.required],
      category: ["", Validators.required],
      oCategory: [""],
      price: ["", Validators.required]
    });
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }

  submit(){
    if(this.firstFormGroup.status == "VALID")
  	{
      var selectedCategory = this.categories[this.firstFormGroup.value["category"]].viewValue
      if (selectedCategory == 'Other'){
          selectedCategory = this.firstFormGroup.value["oCategory"]
      }
      var data = {Name: this.firstFormGroup.value["name"], Expense:this.expenseSelected, Category:selectedCategory, Price: this.firstFormGroup.value["price"]}
      let id = this.router.url.split("/")[2];
      // Get profile Id
      this.http.get('/api/user-profile/' + id).subscribe((res1:any) => {
        let upId = res1.userProfileId;
        // Get budget id
        this.http.get('/api/budget/getBudgetId/' + upId).subscribe((res2:any) => {
          if (this.expenseSelected) {
            // Add the expense first
            let budgetId = res2
            var expD = {name:this.firstFormGroup.value["name"], price:this.firstFormGroup.value["price"], budgetId: budgetId};
            this.http.post('/api/expense/', expD).subscribe((res3:any) => {
                console.log("exppense added: ", res3)
                var expenseId = res3.expense.id
                // Add the category for that expense
                var ed = {Name: selectedCategory, ExpenseId: expenseId}
                let catD: any = Object.assign({body: ed, budgetId: budgetId});
                this.http.post('/api/budget/addCategoryExpense', catD).subscribe((res4:any) => {
                    console.log("categorie expense added: ", res4)
                });
            });
          } else {
            let budgetId = res2
            var savD = {name:this.firstFormGroup.value["name"], price:this.firstFormGroup.value["price"], budgetId: budgetId};
            this.http.post('/api/saving/', savD).subscribe((res3:any) => {
                console.log("exppense added: ", res3)
                var savingsId = res3.savings.id
                // Add the category for that savings
                var sd = {Name: selectedCategory, SavingsId: savingsId}
                let catD: any = Object.assign({body: sd, budgetId: budgetId});
                this.http.post('/api/budget/addCategorySavings', catD).subscribe((res4:any) => {
                    console.log("categorie savings added: ", res4)
                });
            });
          }
          this.sharedService.sendClickEvent();
        });
      });
    }
  }
}
