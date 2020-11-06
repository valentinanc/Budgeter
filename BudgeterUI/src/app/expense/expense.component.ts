import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { ChartsModule, Label } from 'ng2-charts';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})


export class ExpenseComponent implements OnInit {

  // expense table
  editField = ""
  personList: Array<any> = [
    { id: 1, date: 'Aurelia Vega', name: 30, price: 'Deepends'},
    { id: 2, date: 'Guerra Cortez', name: 45, price: 'Insectus'},
    { id: 3, date: 'Guadalupe House', name: 26, price: 'Isotronic'},
    { id: 4, date: 'Aurelia Vega', name: 30, price: 'Deepends'},
    { id: 5, date: 'Elisa Gallagher', name: 31, price: 'Portica'},
  ];
  // end expense table

  // expense overview
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: 'My Second dataset',
            backgroundColor: '#9CCC65',
            borderColor: '#7CB342',
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
  }
  options = {
    responsive: true,
    maintainAspectRatio: true
  };
  // end expense overview

  
  // expense breakdown
  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];
  public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  // end expense breakdown

  constructor() {}

  ngOnInit(): void {
  }

  updateList(id: number, property: string, event: any) {
    const editField = event.target.textContent;
    this.personList[id][property] = editField;
  }

  remove(id: any) {
    this.personList.splice(id, 1);
  }

  add() {
      const person = { id: 6, date: 'Elisa Gallagher', name: 31, price: 'Portica'}
      this.personList.push(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
