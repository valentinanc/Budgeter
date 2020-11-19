import { Component, OnInit, ViewChild } from '@angular/core';
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
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';

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
  todos:  ToDo[] = [{id:1,workTodo: "Pay off loans", isCompleted: false},{id:2,workTodo: "Buy a car", isCompleted: false},{id:3,workTodo: "Buy a PC", isCompleted: false}];
  inEditMode: boolean = false;
  currentTodoId: number;
  currentTodoStateWorkTodo: string;
  currentTodoStateisCompleted : boolean;
  uid: string;
	serviceErrors:any = {};

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.uid = this.route.url["value"][1]["path"];
    console.log(this.uid);
  }

  ngOnInit(): void {
    this.workTodo = '';
  }

  addRowData(row_obj){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
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
    let data: any = Object.assign({name:payload.workTodo}, {isCompleted: false});
    console.log(data);
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
        workTodo: this.workTodo,
        isCompleted: this.currentTodoStateisCompleted,
    };

    this.cancelEdit();
    
  }

}

// Edit A ToDo

editTodo(todo: any) {

  console.log(todo);

  this.inEditMode = true;
  this.currentTodoId = todo.id;
  this.currentTodoStateWorkTodo = todo.workTodo;
  this.currentTodoStateisCompleted = todo.isCompleted;
  
  this.workTodo = todo.workTodo;
  document.getElementById('workTodo').focus();
  this.todos[todo.id].workTodo = todo.workTodo;
}

// Delete A ToDo

deleteTodo(todo:any, index): void {
   console.log(todo);
   console.log(index);
  
  this.todos.splice(index,1)
  // this._todoService.deleteTodo(todo, index);
}

// Mark A Todo As Completed

markAsCompleted(todo: any, e): void {
  // console.log(todo.id +" " + todo.isCompleted);
  if(todo != null)
  {
    // this._todoService.markAsCompleted(todo, e.target.checked);
  }
}

}
