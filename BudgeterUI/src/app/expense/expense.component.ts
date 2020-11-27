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
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})


export class ExpenseComponent implements OnInit {

  // expense table
  editField = ""
  personList: Array<any> = [
    { id: 1, date: '11/01/2020', name: "Rent", price: '1500'},
    { id: 2, date: '11/03/2020', name: 'Grocery', price: '125'},
    { id: 3, date: '11/03/2020', name: 'Tim Hortons Party', price: '25'},
    { id: 5, date: '11/05/2020', name: "TTC (Take The Car)", price: '50'},
  ];
  // end expense table

  // expense overview
  data = {
    labels: [],
    datasets: [
        {
            label: '',
            backgroundColor: '',
            borderColor: '',
            data: []
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
          max: 3500
        }
      }]
    }
  };
  // end expense overview

  
  // expense breakdown
  public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [1500, 125, 25, 50], label: 'My First dataset' }
  ];

  public chartLabels: Array<any> = ['Rent', 'Grocery', 'Tim Hortons Party', 'TTC (Take The Car)'];
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true,
    cutoutPercentage: 75
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  // end expense breakdown
  uid: string;
  notiMessage: string;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.uid = this.route.url["value"][1]["path"];
  }

  ngOnInit(): void {
    this.http.get('/api/user-profile/' + this.uid +'/info').subscribe((data:any) => {
      console.log("datset value: "+this.data.datasets[-1])

      this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Total Monthly Expenses',
                backgroundColor: '#F53B28',
                borderColor: '#D53B28',
                data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, data.userProfile.MExpenses]
            }
        ]
      }
      this.notiMessage ="On average, you spend $"+data.userProfile.MExpenses+" per month.";
    });
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
      this.personList.unshift(person);
  }

  changeValue(id: number, property: string, event: any) {
    this.editField = event.target.textContent;
  }

  dostuff(){
    
  }

}
