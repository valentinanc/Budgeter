import { Component, IterableDiffers, KeyValueDiffers, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/service.component';

export interface UsersData {
  name: string;
  id: number;
}

export class ToDo{
  id:number;
  workTodo:string = '';
  isCompleted: boolean = false;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];
@Component({
  selector: 'financial-goals',
  templateUrl: './financial-goals.component.html',
  styleUrls: ['./financial-goals.component.css']
})
export class FinancialGoalsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;
  @ViewChild(MatTable) table: MatTable<any>;

  items : [];
  workTodo: string;
  todos: ToDo[] = [];
  inEditMode: boolean = false;
  currentTodoId: number;
  currentTodoStateWorkTodo: string;
  currentTodoStateisCompleted : boolean = false;
  uid: string;
  userProfileId: string;
  serviceErrors:any = {};
  iterableDiffer: any;
  differ: any;
  clickEventsubscription:Subscription;
  previouslySet = false;
  constructor(private http: HttpClient, private route: ActivatedRoute, private iterableDiffers: IterableDiffers, private differs: KeyValueDiffers, private sharedService:SharedService) {
    this.iterableDiffer = iterableDiffers.find([]).create(null);
    this.uid = this.route.url["value"][1]["path"];
    this.clickEventsubscription = this.sharedService.getClickEvent().subscribe(()=>{
      this.todos = []
      this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
        this.userProfileId = data.userProfileId;
        this.http.get('/api/financial-goals/' + this.userProfileId).subscribe((data:any) => {
          for(var i = 0; i < data.length; i++) {
            var obj = data[i];
            this.todos.push({id: obj.id, workTodo: obj.Name, isCompleted: obj.IsCompleted});
        }
        }, error => {
            console.log("There was an error displaying the financial goals", error);
        });
      }, error => {
          console.log("There was an error retrieving the user profile id", error);
      });
      this.previouslySet = true;
    })
  }
  
  ngOnInit(): void {
    this.workTodo = '';
    if (!this.previouslySet) {
      this.http.get('/api/user-profile/' + this.uid).subscribe((data:any) => {
          this.userProfileId = data.userProfileId;
          this.http.get('/api/financial-goals/' + this.userProfileId).subscribe((data:any) => {
            for(var i = 0; i < data.length; i++) {
              var obj = data[i];
              this.todos.push({id: obj.id, workTodo: obj.Name, isCompleted: obj.IsCompleted});
          }
          }, error => {
              console.log("There was an error displaying the financial goals", error);
          });
        }, error => {
            console.log("There was an error retrieving the user profile id", error);
        });
    }
  }

  updateRowData(row_obj){
    this.todos = this.todos.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.workTodo = row_obj.workTodo;
      }
      return true;
    });
  }
 // Cancel Edit Mode
 cancelEdit() {
  if(this.inEditMode)
  {
    this.inEditMode = false;
    this.workTodo = '';
  }
}

  ngDoCheck() {
    // DO NOT RUN THE FOLLOWING CODE; YOU MIGHT BREAK YOUR BROWSER
    // this.differ = this.differs.find(this.todos).create();
    // const customerChanges = this.differ.diff(this.todos);
 
    // let changes = this.iterableDiffer.diff(this.todos);
    // if (changes) {
    //   var newlist = []
    //   this.http.get('/api/financial-goals/' + this.userProfileId).subscribe((data:any) => {
    //     for(var i = 0; i < data.length; i++) {
    //       var obj = data[i];
    //       newlist.push({id: obj.id, workTodo: obj.Name, isCompleted: obj.IsCompleted});
    //     }
    //     this.todos = newlist;
    //   });
    // }
  }
  
// Add A ToDo

addEditTodo(): void {
  
  if(this.workTodo.trim() === "") {  
    document.getElementById('workTodo').focus();
    return;
  }

  if(this.workTodo !== "" && this.inEditMode !== true)
  { 
    const payload = {
      id: 1,
      workTodo: this.workTodo,
      isCompleted: this.currentTodoStateisCompleted
    };
    this.todos.push(payload);

    let data: any = Object.assign({name:payload.workTodo}, {isCompleted: this.currentTodoStateisCompleted}, {userProfileId: this.userProfileId});
		this.http.post('/api/financial-goals/', data).subscribe((data:any) => {
      console.log("good fin goal");
	  	}, error =>
		{
			this.serviceErrors = error.error.error;
		});
    this.workTodo = '';
  
  }

  if(this.workTodo !== "" && this.inEditMode === true && this.currentTodoStateWorkTodo !== this.workTodo)
  {
    const payload = {
        id: this.currentTodoId,
        workTodo: this.workTodo,
        isCompleted: this.currentTodoStateisCompleted,
    };
    this.updateRowData(payload);

    let data: any = Object.assign({name:payload.workTodo}, {isCompleted:payload.isCompleted}, {id: payload.id});
    this.http.put('/api/financial-goals/', data).subscribe((data:any) => {
      console.log("good edit fin goal");
      }, error =>
    {
      this.serviceErrors = error.error.error;
    });

    this.cancelEdit();
  }
}

// Edit A ToDo

editTodo(todo: any) {
  this.inEditMode = true;
  this.currentTodoId = todo.id;
  this.currentTodoStateWorkTodo = todo.workTodo;
  this.currentTodoStateisCompleted = todo.isCompleted;
  
  this.workTodo = todo.workTodo;
  this.todos.filter(function(element){
    if (element.id == todo.id){
      element.workTodo = todo.workTodo;
    }});
  document.getElementById('workTodo').focus();
  // this.todos[id].workTodo = todo.workTodo;
}

// Delete A ToDo

deleteTodo(todo:any, index): void {
   console.log(todo);
   console.log(index);
  
  this.todos.splice(index,1)
  let data: any = Object.assign({id:todo.id});
  console.log("good fin goal id: " + data.id);
  this.http.delete('/api/financial-goals/' + data.id).subscribe((data:any) => {
    }, error =>
  {
    this.serviceErrors = error.error.error;
  });
  // this._todoService.deleteTodo(todo, index);
  
}

// Mark A Todo As Completed

markAsCompleted(todo: any, e): void {
  console.log("helo");
  // console.log(todo.id +" " + todo.isCompleted);
  let data: any = Object.assign({name:todo.workTodo}, {isCompleted:todo.isCompleted}, {id: todo.id});
  this.http.put('/api/financial-goals/', data).subscribe((data:any) => {
    console.log("good isCompleted fin goal");
    }, error =>
  {
    this.serviceErrors = error.error.error;
  });
}

}
