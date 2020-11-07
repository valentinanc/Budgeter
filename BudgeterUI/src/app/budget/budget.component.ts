import { Component, OnInit } from '@angular/core';
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
  selector: 'budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  // budget table
  editField = ""
  personList: Array<any> = [
    { id: 1, date: '11/01/2020', name: "Rent", price: '1500'},
    { id: 2, date: '11/03/2020', name: 'Grocery', price: '125'},
    { id: 3, date: '11/03/2020', name: 'Tim Hortons Party', price: '25'},
    { id: 4, date: '11/04/2020', name: "Tesla Stonks", price: '500'},
    { id: 5, date: '11/05/2020', name: "TTC (Take The Car)", price: '50'},
  ];
  // end budget table

  // budget overview
  data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'],
    datasets: [
        {
            label: 'Total Monthly Budget',
            backgroundColor: '#42A5F5',
            borderColor: '#1E88E5',
            data: [4023, 4500, 4201, 4300, 5000, 4700, 4500, 5000, 4200, 4700, 5000]
        }
    ]
  }
  options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          max: 7000
        }
      }]
    }
  };
  // end budget overview

  
  // budget breakdown
  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [150, 1250, 50, 500, 3000], label: 'My First dataset' }
  ];
  public chartLabels: Array<any> = ['Food', 'Housing', 'Transportation', 'Savings', 'Remaining'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#4D5360', '#949FB1', '#ffc107'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#616774', '#A8B3C5', '#ffc107'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
    cutoutPercentage: 75
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  // end budget breakdown

  constructor() { }

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
      const person = { id: 6, date: '2020/11/09', name: '', price: ''}
      this.personList.push(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

}
