import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../services/service.component';

interface Category {
  id:number;
  categoryName: string;
  isCompleted: boolean;
}

@Component({
  selector: 'edit-budget',
  templateUrl: './edit-budget.component.html',
  styleUrls: ['./edit-budget.component.css']
})

export class EditBudgetComponent implements OnInit {
  isLinear = false;
  inEditMode: boolean = false;
  categoryName: string;
  userProfileId: string;
  serviceErrors:any = {};
  uid: string;
  currentTodoId: number;
  currentTodoStateWorkTodo: string;
  currentTodoStateisCompleted : boolean = false;
  categories: Category[] = [];
  constructor(public dialogRef: MatDialogRef<EditBudgetComponent>, private _formBuilder: FormBuilder, private http: HttpClient, private router: Router, private sharedService: SharedService) {
    this.uid = this.router.url.split("/")[2];
  }

  ngOnInit(): void {
    this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
      this.userProfileId = data.userProfileId;
      this.http.get('/api/budget/getCategories/' + this.uid).subscribe((data:any) => {
        let map = new Map();
        let count = 0;
        for(var i = 0; i < data.length; i++) {
          var obj = data[i];
          if (!map.has(obj.Name)){
              map.set(obj.Name, 1);
              this.categories.push({id: obj.id, categoryName: obj.Name, isCompleted: obj.IsCompleted})
              count++;
          }
        }
      }, error => {
          console.log("There was an error displaying the categories", error);
      });
    }, error => {
        console.log("There was an error retrieving the user profile id", error);
    });
  }

  close() {
    this.dialogRef.close("Thanks for using me!");
  }

  addEditCategory(): void {
  
    if(this.categoryName.trim() === "") {  
      document.getElementById('workTodo').focus();
      return;
    }
  
    if(this.categoryName !== "" && this.inEditMode !== true)
    { 
      const payload = {
        id: 1,
        categoryName: this.categoryName,
        isCompleted: this.currentTodoStateisCompleted
      };
      this.categories.push(payload);
  
      // adding new category
      var categoriesSelected= {name: payload.categoryName, completed: this.currentTodoStateisCompleted}
      let dataSend: any = Object.assign({body: [categoriesSelected], userId: this.uid});
      this.http.post('/api/budget/addCategories', dataSend).subscribe((data:any) => {
          console.log("categories added: ", data)
      });
      this.categoryName = '';
    
    }
  
    if(this.categoryName !== "" && this.inEditMode === true && this.currentTodoStateWorkTodo !== this.categoryName)
    {
      const payload = {
          id: this.currentTodoId,
          categoryName: this.categoryName,
          oldCategoryName: this.currentTodoStateWorkTodo,
          isCompleted: this.currentTodoStateisCompleted,
      };
      this.updateRowData(payload);
  
      let data: any = Object.assign(payload);
      // updating existing category
      this.http.put('/api/budget/editCategory', data).subscribe((data:any) => {
      });
  
      this.cancelEdit();
    }
  }
  
  updateRowData(row_obj){
    this.categories = this.categories.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.categoryName = row_obj.categoryName;
      }
      return true;
    });
    this.sharedService.sendClickEvent();
  }
 
  // Cancel Edit Mode
 cancelEdit() {
    if(this.inEditMode)
    {
      this.inEditMode = false;
      this.categoryName = '';
    }
  }

  // Edit A ToDo
  editCategory(category: any) {
    this.inEditMode = true;
    this.currentTodoId = category.id;
    this.currentTodoStateWorkTodo = category.categoryName;
    this.currentTodoStateisCompleted = category.isCompleted;
    
    this.categoryName = category.categoryName;
    this.categories.filter(function(element){
      if (element.id == category.id){
        element.categoryName = category.categoryName;
      }});
    document.getElementById('categoryName').focus();
  }
  
  // Delete A ToDo
  deleteCategory(category:any, index): void {
     console.log(category);
     console.log(index);
    
    this.categories.splice(index,1)
    let data: any = Object.assign({name:category.categoryName});
    this.http.delete('/api/budget/deleteCategory/'+ data.name).subscribe((data:any) => {
        this.sharedService.sendClickEvent();
      }, error =>
    {
      this.serviceErrors = error.error.error;
    });
  }
}
